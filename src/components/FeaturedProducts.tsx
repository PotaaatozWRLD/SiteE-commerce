import './FeaturedProducts.css';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

import { useSearchParams } from 'react-router-dom';

export default function FeaturedProducts() {
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get('category') || undefined;
    const { products, loading, error } = useProducts(categorySlug ? undefined : 6, categorySlug); // No limit if filtering by category

    if (error) {
        return (
            <section className="featured-products">
                <div className="products-container">
                    <p style={{ textAlign: 'center', color: 'red' }}>
                        Erreur : {error}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="featured-products">
            <div className="products-container">
                {/* Section Header */}
                <div className="section-header">
                    <div className="section-badge">
                        <span className="badge-dot"></span>
                        <span>Nos Produits Phares</span>
                    </div>
                    <h2 className="section-title">
                        {categorySlug ? (
                            <>Produits : <span className="gradient-text">{categorySlug.replace(/-/g, ' ')}</span></>
                        ) : (
                            <>Articles les plus <span className="gradient-text">populaires</span></>
                        )}
                    </h2>
                    <p className="section-description">
                        Découvrez notre sélection de produits islamiques de qualité,
                        soigneusement choisis pour vous.
                    </p>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px' }}>
                        <p>Chargement des produits...</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                originalPrice={product.original_price || undefined}
                                image={product.image_url || '📦'}
                                category={product.category?.name || 'Produit'}
                                rating={product.rating}
                                reviews={product.reviews_count}
                                badge={product.badge || undefined}
                            />
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="view-all-wrapper">
                    <button className="btn-view-all">
                        <span>Voir tous les produits</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
