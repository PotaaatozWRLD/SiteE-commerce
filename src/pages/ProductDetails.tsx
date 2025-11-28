import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import './ProductDetails.css'

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>()
    const { products, loading } = useProducts()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)

    // Find product by ID (in a real app with many products, we would fetch by ID from DB)
    const product = products.find(p => p.id === id)

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (loading) {
        return (
            <div className="product-details-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div className="spinner-small" style={{ width: '40px', height: '40px' }}></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="product-details-container" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <h2>Produit introuvable</h2>
                    <Link to="/products" className="back-link" style={{ marginTop: '20px', display: 'inline-block' }}>
                        Retour aux produits
                    </Link>
                </div>
            </div>
        )
    }

    // Mock images for gallery (since we might only have one image in DB)
    const images = [
        product.image_url,
        // Add placeholders if needed for gallery demo
        // "https://placehold.co/600x600/F3F3F3/191A23?text=Vue+2",
        // "https://placehold.co/600x600/F3F3F3/191A23?text=Vue+3",
    ].filter(Boolean)

    const handleQuantityChange = (delta: number) => {
        const newQty = quantity + delta
        if (newQty >= 1 && newQty <= (product.stock || 10)) {
            setQuantity(newQty)
        }
    }

    const handleAddToCart = () => {
        console.log('Added to cart:', { ...product, quantity })
        // TODO: Implement cart context
        alert(`Ajouté au panier : ${quantity} x ${product.name}`)
    }

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/" className="breadcrumb-link">Accueil</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/products" className="breadcrumb-link">Produits</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </div>

                <div className="product-grid">
                    {/* Left: Gallery */}
                    <div className="product-gallery">
                        <div className="main-image-wrapper">
                            <img
                                src={images[selectedImage] || ''}
                                alt={product.name}
                                className="main-image"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="gallery-thumbs">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumb-button ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={img || ''} alt={`Vue ${index + 1}`} className="thumb-image" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-price-wrapper">
                            <span className="product-price">{product.price.toFixed(2)} €</span>
                        </div>

                        <p className="product-description">
                            {product.description || "Une description détaillée de ce magnifique produit islamique. Fabriqué avec soin et respectant les traditions, il saura vous accompagner au quotidien."}
                        </p>

                        <div className="product-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Qualité Premium garantie</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Livraison rapide 48h</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Satisfait ou remboursé</span>
                            </div>
                        </div>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <span className="qty-label">Quantité :</span>
                                <div className="qty-controls">
                                    <button className="qty-btn" onClick={() => handleQuantityChange(-1)}>−</button>
                                    <span className="qty-value">{quantity}</span>
                                    <button className="qty-btn" onClick={() => handleQuantityChange(1)}>+</button>
                                </div>
                            </div>

                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
