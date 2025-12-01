import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.functions.invoke('send-contact-email', {
                body: formData
            })

            if (error) throw error

            console.log('Email sent successfully')
            setSubmitted(true)
            setFormData({ name: '', email: '', message: '' })
        } catch (err: any) {
            console.error('Error sending email:', err)
            setError("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '100px 20px 40px', fontFamily: 'Space Grotesk, sans-serif' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Contactez-nous</h1>
                <p style={{ color: '#6b7280', marginBottom: '40px' }}>
                    Une question ? Une suggestion ? N'hésitez pas à nous écrire.
                </p>

                {submitted ? (
                    <div style={{
                        padding: '20px',
                        background: '#dcfce7',
                        color: '#166534',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '10px' }}>Message envoyé ! ✅</h3>
                        <p>Nous vous répondrons dans les plus brefs délais.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            style={{
                                marginTop: '15px',
                                padding: '8px 16px',
                                background: '#166534',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Envoyer un autre message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {error && (
                            <div style={{ padding: '10px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
                                {error}
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nom</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '16px'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '16px'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Message</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '16px',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '14px',
                                background: loading ? '#9ca3af' : '#191A23',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'opacity 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            {loading ? (
                                <>
                                    <span style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid white',
                                        borderBottomColor: 'transparent',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        animation: 'spin 1s linear infinite'
                                    }}></span>
                                    Envoi en cours...
                                </>
                            ) : 'Envoyer le message'}
                        </button>
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </form>
                )}
            </div>
        </>
    )
}
