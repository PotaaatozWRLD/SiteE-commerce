import React from 'react';
import './ServiceCards.css';
import { Truck, ShieldCheck, Headphones } from 'lucide-react';

interface Service {
    id: number;
    title: string;
    description: string;
    details: string[]; // Added details array
    icon: React.ReactNode;
    variant: 'white' | 'green' | 'dark';
}

const services: Service[] = [
    {
        id: 1,
        title: "Livraison Rapide & Suivie",
        description: "Recevez vos produits en 24/48h partout en France. Livraison gratuite dès 50€ d'achat.",
        details: [
            "Expédition prioritaire : Votre commande est traitée et expédiée sous 24h ouvrées.",
            "Livraison offerte : Profitez de la livraison gratuite en point relais dès 50€ d'achat.",
            "Suivi en temps réel : Un numéro de tracking vous est envoyé par email dès l'expédition.",
            "Partenaires de confiance : Nous travaillons avec Colissimo, Mondial Relay et Chronopost pour garantir les meilleurs délais.",
            "Emballage soigné : Vos produits sont protégés dans des emballages éco-responsables et robustes.",
            "Retour simplifié : Vous disposez de 14 jours pour changer d'avis. Retour facile via votre espace client."
        ],
        icon: <Truck size={24} />,
        variant: 'white'
    },
    {
        id: 2,
        title: "Paiement 100% Sécurisé",
        description: "Transactions cryptées et sécurisées via Stripe et PayPal. Vos données sont protégées.",
        details: [
            "Sécurité maximale : Toutes les transactions sont protégées par le protocole SSL (cadenas vert).",
            "Partenaires certifiés : Nous utilisons Stripe et PayPal, leaders mondiaux du paiement en ligne.",
            "3D Secure : Validation par SMS/Application bancaire pour éviter toute fraude.",
            "Confidentialité : Aucune donnée bancaire n'est stockée sur nos serveurs.",
            "Moyens de paiement : Carte Bancaire (Visa, Mastercard, Amex) et PayPal.",
            "Transparence : Aucun frais caché lors de la validation de votre commande."
        ],
        icon: <ShieldCheck size={24} />,
        variant: 'green'
    },
    {
        id: 3,
        title: "Support Client Premium 24/7",
        description: "Une équipe dédiée à votre écoute pour répondre à toutes vos questions.",
        details: [
            "Disponibilité totale : Notre équipe est joignable 7j/7 pour vous accompagner.",
            "Réponse rapide : Nous nous engageons à répondre à vos emails sous 2h en moyenne.",
            "Expertise : Des conseillers basés en France, experts de nos produits.",
            "Canaux multiples : Contactez-nous via le formulaire de contact ou par email direct.",
            "Suivi personnalisé : Chaque demande fait l'objet d'un ticket de suivi unique.",
            "Satisfaction garantie : Nous trouvons toujours une solution adaptée à vos besoins."
        ],
        icon: <Headphones size={24} />,
        variant: 'dark'
    }
];

const ServiceCards: React.FC = () => {
    const [selectedService, setSelectedService] = React.useState<Service | null>(null);

    const openModal = (service: Service) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <section className="service-cards-section">
                <div className="service-cards-grid">
                    {services.map((service) => (
                        <div key={service.id} className={`service-card card-${service.variant}`}>
                            <div className="card-header">
                                <h3>{service.title}</h3>
                                <div className="card-icon-wrapper">
                                    {service.icon}
                                </div>
                            </div>
                            <p>{service.description}</p>

                            <button
                                onClick={() => openModal(service)}
                                className="card-link"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
                            >
                                <div className="card-link-icon">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.16669 12.8333L12.8334 1.16666M12.8334 1.16666V11.6667M12.8334 1.16666H2.33335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span>En savoir plus</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {selectedService && (
                <div className="service-modal-overlay" onClick={closeModal}>
                    <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="service-modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className={`modal-icon-wrapper variant-${selectedService.variant}`}>
                            {selectedService.icon}
                        </div>
                        <h2>{selectedService.title}</h2>
                        <p className="modal-description">{selectedService.description}</p>

                        <div className="modal-details-list">
                            <h3>Ce que nous garantissons :</h3>
                            <ul>
                                {selectedService.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>

                        <p className="modal-extra-info">
                            Nous nous engageons à vous fournir le meilleur service possible.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServiceCards;
