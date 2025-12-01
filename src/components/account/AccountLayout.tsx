import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './AccountLayout.css'

export default function AccountLayout() {
    const { user, profile, signOut, loading, isAdmin } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : ''
    }

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', paddingTop: '80px' }}>Chargement...</div>
    }

    if (!user) {
        navigate('/login')
        return null
    }

    // Redirect admins to admin dashboard
    if (isAdmin) {
        navigate('/admin')
        return null
    }

    return (
        <div className="account-layout">
            <div className="account-container">
                {/* Sidebar */}
                <aside className="account-sidebar">
                    <div className="user-profile-summary">
                        <div className="profile-avatar">
                            {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                        <div className="profile-info">
                            <h3 className="profile-name">{profile?.full_name || 'Utilisateur'}</h3>
                            <p className="profile-email">{user.email}</p>
                        </div>
                    </div>

                    <nav className="account-nav">
                        <Link to="/account" className={`account-nav-link ${isActive('/account')}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            Vue d'ensemble
                        </Link>
                        <Link to="/account/orders" className={`account-nav-link ${isActive('/account/orders')}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            Mes commandes
                        </Link>
                        <Link to="/account/addresses" className={`account-nav-link ${isActive('/account/addresses')}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            Adresses
                        </Link>
                        <Link to="/account/settings" className={`account-nav-link ${isActive('/account/settings')}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            Paramètres
                        </Link>
                        <button className="account-nav-link logout" onClick={handleSignOut}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Déconnexion
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="account-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
