import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './Cart.css'

export default function Cart() {
    const { items, updateQuantity, removeItem, total, itemCount } = useCart()

    if (itemCount === 0) {
        return (
            <>
                <Navigation />
                <div className="cart-page">
                    <div className="cart-container">
                        <div className="empty-cart">
                            <div className="empty-cart-icon">🛒</div>
                            <h1 className="empty-cart-title">Votre panier est vide</h1>
                            <p className="empty-cart-text">
                                Découvrez nos produits et ajoutez-les à votre panier !
                            </p>
                            <Link to="/" className="continue-shopping-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                Continuer mes achats
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navigation />
            <div className="cart-page">
                <div className="cart-container">
                    <div className="cart-header">
                        <h1 className="cart-title">Panier</h1>
                        <p className="cart-subtitle">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
                    </div>

                    <div className="cart-content">
                        {/* Cart Items */}
                        <div className="cart-items">
                            {items.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        {item.image_url}
                                    </div>

                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-price">{item.price.toFixed(2)} €</p>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                aria-label="Diminuer la quantité"
                                            >
                                                −
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Augmenter la quantité"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="cart-summary">
                            <h2 className="summary-title">Récapitulatif</h2>

                            <div className="summary-row">
                                <span className="summary-label">Sous-total</span>
                                <span className="summary-value">{total.toFixed(2)} €</span>
                            </div>

                            <div className="summary-row">
                                <span className="summary-label">Livraison</span>
                                <span className="summary-value">Gratuite</span>
                            </div>

                            <div className="summary-total">
                                <span className="total-label">Total</span>
                                <span className="total-value">{total.toFixed(2)} €</span>
                            </div>

                            <Link to="/checkout" className="checkout-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5z" />
                                    <path d="M6 9.01V9" />
                                </svg>
                                Passer la commande
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
