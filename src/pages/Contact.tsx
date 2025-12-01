import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate form submission
        console.log('Contact form submitted:', formData)
        setSubmitted(true)
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
                            style={{
                                padding: '14px',
                                background: '#191A23',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            Envoyer le message
                        </button>
                    </form>
                )}
            </div>
        </>
    )
}
