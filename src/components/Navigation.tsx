import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { LoginButton } from './ModernButton'
import './Navigation.css'

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { itemCount } = useCart()

    const handleLoginClick = () => {
        navigate('/login')
    }

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
                    <LoginButton onClick={handleLoginClick}>
                        Se connecter
                    </LoginButton>
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
                    <div className="mobile-cta">
                        <LoginButton onClick={() => {
                            handleLoginClick()
                            setIsMenuOpen(false)
                        }}>
                            Se connecter
                        </LoginButton>
                    </div>
                </div>
            </div>
        </nav>
    )
}
