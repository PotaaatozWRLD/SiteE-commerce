import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css';
import ModernButton from './ModernButton';

const CTASection: React.FC = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-content">
                    <h2>Prêt à transformer votre quotidien ?</h2>
                    <p>
                        Découvrez notre sélection exclusive de produits conçus pour allier qualité,
                        éthique et modernité. Rejoignez nos clients satisfaits dès aujourd'hui.
                    </p>
                    <Link to="/products/1"> {/* Temporary link to a product or category */}
                        <ModernButton variant="primary">
                            Voir la boutique
                        </ModernButton>
                    </Link>
                </div>
                <div className="cta-visual">
                    {/* Abstract visual representation using SVG shapes */}
                    <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#B9FF66" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.8,58.6C22.5,65.8,9.8,71.7,-1.8,74.8C-13.4,77.9,-25.4,78.2,-36.4,73.1C-47.4,68,-57.4,57.5,-65.3,45.5C-73.2,33.5,-79,20,-80.6,5.9C-82.2,-8.2,-79.6,-22.9,-71.3,-34.7C-63,-46.5,-49,-55.4,-35.5,-63C-22,-70.6,-9,-76.9,4.9,-85.4L44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '4rem' }}>
                        ✨
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
