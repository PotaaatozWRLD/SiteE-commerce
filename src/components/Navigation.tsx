import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { LoginButton } from './ModernButton'
import './Navigation.css'

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { itemCount } = useCart()
    const { user, profile, signOut } = useAuth()
    const userMenuRef = useRef<HTMLDivElement>(null)

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleSignOut = async () => {
        await signOut()
        setIsUserMenuOpen(false)
        navigate('/')
    }

    // Close user menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className="navigation">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    Islamic<span className="logo-accent">Shop</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links">
                    <Link to="/" className="nav-link">Accueil</Link>
                    <Link to="/products" className="nav-link">Produits</Link>
                    <Link to="/about" className="nav-link">À propos</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>

                {/* CTA + Cart */}
                <div className="nav-cta">
                    <Link to="/cart" className="cart-icon-link">
                        <svg className="cart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </Link>

                    {user ? (
                        <div className="user-menu-container" ref={userMenuRef}>
                            <button
                                className="user-menu-button"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <div className="user-avatar">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Avatar" className="user-avatar-img" />
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    )}
                                </div>
                                <span className="user-name">{profile?.full_name || 'Mon Compte'}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>

                            {isUserMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <p className="dropdown-name">{profile?.full_name || 'Utilisateur'}</p>
                                        <p className="dropdown-email">{user.email}</p>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/account" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                        Tableau de bord
                                    </Link>
                                    <Link to="/account/orders" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                        Mes commandes
                                    </Link>
                                    <Link to="/account/settings" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                        Paramètres
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item logout" onClick={handleSignOut}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <LoginButton onClick={handleLoginClick}>
                            Se connecter
                        </LoginButton>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Accueil
                    </Link>
                    <Link to="/products" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Produits
                    </Link>
                    <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                        À propos
                    </Link>
                    <Link to="/contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Contact
                    </Link>
                    <Link to="/cart" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Panier {itemCount > 0 && `(${itemCount})`}
                    </Link>

                    {user ? (
                        <>
                            <div className="mobile-divider"></div>
                            <Link to="/account" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                                Mon Compte
                            </Link>
                            <Link to="/account/orders" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                                Mes Commandes
                            </Link>
                            <button className="mobile-link logout" onClick={() => {
                                handleSignOut()
                                setIsMenuOpen(false)
                            }}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <div className="mobile-cta">
                            <LoginButton onClick={() => {
                                handleLoginClick()
                                setIsMenuOpen(false)
                            }}>
                                Se connecter
                            </LoginButton>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
