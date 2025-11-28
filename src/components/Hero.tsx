import './Hero.css'
import { LoginButton, SecondaryButton } from './ModernButton'

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-container">
                {/* Left Content */}
                <div className="hero-content">


                    <h1 className="hero-title">
                        L'Élégance Islamique <br />
                        <span className="gradient-text">Moderne & Éthique</span>
                    </h1>

                    <p className="hero-description">
                        Découvrez notre sélection exclusive de produits islamiques alliant tradition et design contemporain.
                        Qualité premium, livraison rapide et service client dévoué.
                    </p>

                    <div className="hero-buttons">
                        <LoginButton withIcon={false}>
                            Découvrir la collection
                        </LoginButton>
                        <SecondaryButton>
                            Voir la vidéo
                        </SecondaryButton>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Produits</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">10k+</div>
                            <div className="stat-label">Clients satisfaits</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">4.9/5</div>
                            <div className="stat-label">Note moyenne</div>
                        </div>
                    </div>
                </div>

                {/* Right Image/Illustration */}
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="floating-card card-1">
                            <div className="card-icon">📿</div>
                            <div className="card-text">Tapis de prière</div>
                        </div>
                        <div className="floating-card card-2">
                            <div className="card-icon">📖</div>
                            <div className="card-text">Coran & Livres</div>
                        </div>
                        <div className="floating-card card-3">
                            <div className="card-icon">🕌</div>
                            <div className="card-text">Décoration</div>
                        </div>

                        {/* Main visual placeholder */}
                        <div className="hero-main-visual">
                            <div className="visual-bg"></div>
                            <div className="visual-content">
                                <div style={{ fontSize: '120px', textAlign: 'center' }}>🕋</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="hero-decoration decoration-1"></div>
            <div className="hero-decoration decoration-2"></div>
        </section>
    )
}
