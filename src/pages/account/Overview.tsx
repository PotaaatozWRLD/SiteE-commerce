import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function AccountOverview() {
    const { profile } = useAuth()

    return (
        <div>
            <h1 className="account-title">Bonjour, {profile?.full_name?.split(' ')[0] || 'Utilisateur'} 👋</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Commandes récentes</div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>0</div>
                </div>
                <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Points fidélité</div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>0</div>
                </div>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Accès rapide</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <Link to="/account/orders" style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#166534'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                    <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </div>
                    <span style={{ fontWeight: '600' }}>Mes commandes</span>
                </Link>

                <Link to="/account/addresses" style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#166534'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                    <div style={{ width: '48px', height: '48px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <span style={{ fontWeight: '600' }}>Mes adresses</span>
                </Link>

                <Link to="/account/settings" style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#166534'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                    <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </div>
                    <span style={{ fontWeight: '600' }}>Paramètres</span>
                </Link>
            </div>
        </div>
    )
}
