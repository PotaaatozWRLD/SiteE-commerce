import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ProductCard.css';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating?: number;
    reviews?: number;
    badge?: 'new' | 'sale' | 'popular';
}

export default function ProductCard({
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    rating = 4.8,
    reviews = 120,
    badge,
}: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Create a minimal product object for cart
        const productForCart = {
            id,
            name,
            price,
            original_price: originalPrice || null,
            image_url: image,
            slug: '',
            description: null,
            category_id: '',
            stock: 0,
            rating: 0,
            reviews_count: 0,
            badge: badge || null,
            is_active: true,
            created_at: '',
            updated_at: '',
            images: null,
            category: undefined
        };

        addItem(productForCart);
        alert(`${name} ajouté au panier !`);
    };

    return (
        <div className="product-card">
            <Link to={`/products/${id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {/* Image Container */}
                <div className="product-image-wrapper">
                    <div className="product-image" style={{ background: image }}>
                        {/* Emoji placeholder instead of real image */}
                        <div className="product-emoji">{image}</div>
                    </div>

                    {/* Badge */}
                    {badge && (
                        <div className={`product-badge badge-${badge}`}>
                            {badge === 'new' && '✨ Nouveau'}
                            {badge === 'sale' && `🔥 -${discount}%`}
                            {badge === 'popular' && '⭐ Populaire'}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <div className="product-category">{category}</div>
                    <h3 className="product-name">{name}</h3>

                    {/* Rating */}
                    <div className="product-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            ))}
                        </div>
                        <span className="reviews-count">({reviews})</span>
                    </div>

                    {/* Price Button (morphs to Add to Cart on hover) */}
                    <button className="price-button" onClick={handleAddToCart}>
                        <span className="price-content">
                            <span className="current-price">{price}€</span>
                            {originalPrice && (
                                <span className="original-price">{originalPrice}€</span>
                            )}
                        </span>
                        <span className="product-cart-content">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <span>Ajouter</span>
                        </span>
                    </button>
                </div>
            </Link>
        </div>
    );
}
