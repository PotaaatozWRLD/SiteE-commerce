import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export default function AccountSettings() {
    const { user, profile } = useAuth()
    const [fullName, setFullName] = useState(profile?.full_name || '')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', user!.id)

            if (error) throw error
            setMessage('Profil mis à jour avec succès !')
        } catch (error) {
            console.error('Error updating profile:', error)
            setMessage('Erreur lors de la mise à jour.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="account-title">Paramètres</h1>

            <div style={{ maxWidth: '600px' }}>
                <form onSubmit={handleUpdateProfile}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            disabled
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                background: '#f3f4f6',
                                color: '#6b7280'
                            }}
                        />
                        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>L'adresse email ne peut pas être modifiée.</p>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nom complet</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                            }}
                        />
                    </div>

                    {message && (
                        <div style={{
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            background: message.includes('Erreur') ? '#fef2f2' : '#dcfce7',
                            color: message.includes('Erreur') ? '#ef4444' : '#166534'
                        }}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: '#166534',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                </form>
            </div>
        </div>
    )
}
