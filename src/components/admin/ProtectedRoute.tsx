import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute() {
    const { user, isAdmin, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: '#0f172a'
            }}>
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p style={{ marginTop: '20px', color: '#B9FF66' }}>Chargement...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />
    }

    if (!isAdmin) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: '#0f172a',
                color: 'white',
                textAlign: 'center'
            }}>
                <div>
                    <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</h1>
                    <h2>Accès refusé</h2>
                    <p style={{ color: '#94a3b8', marginTop: '10px' }}>
                        Vous n'avez pas les permissions nécessaires.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            marginTop: '30px',
                            padding: '12px 24px',
                            background: '#B9FF66',
                            color: '#191A23',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        )
    }

    return <Outlet />
}
