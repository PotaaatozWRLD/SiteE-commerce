import React, { useState } from 'react';
import './ProcessAccordion.css';
import { Plus, Minus } from 'lucide-react';

interface Step {
    id: number;
    number: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        id: 1,
        number: "01",
        title: "Commande",
        description: "Sélectionnez vos articles préférés et validez votre commande en quelques clics. Vous recevrez un email de confirmation instantané."
    },
    {
        id: 2,
        number: "02",
        title: "Préparation",
        description: "Notre équipe prépare votre colis avec soin. Chaque article est vérifié avant d'être emballé pour garantir une qualité irréprochable."
    },
    {
        id: 3,
        number: "03",
        title: "Expédition",
        description: "Votre colis est remis à notre transporteur partenaire. Vous recevez un numéro de suivi pour localiser votre commande en temps réel."
    },
    {
        id: 4,
        number: "04",
        title: "Livraison",
        description: "Recevez votre commande directement chez vous ou en point relais. Profitez de vos nouveaux produits !"
    }
];

const ProcessAccordion: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number | null>(1);

    const toggleStep = (id: number) => {
        setActiveStep(activeStep === id ? null : id);
    };

    return (
        <section className="process-section">
            <div className="process-header">
                <h2>Notre Processus</h2>
                <p>Une expérience d'achat simple et transparente, de la commande à la livraison.</p>
            </div>

            <div className="accordion-container">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`accordion-item ${activeStep === step.id ? 'active' : ''}`}
                        onClick={() => toggleStep(step.id)}
                    >
                        <div className="accordion-header">
                            <div className="accordion-title-wrapper">
                                <span className="step-number">{step.number}</span>
                                <span className="step-title">{step.title}</span>
                            </div>
                            <div className="accordion-icon">
                                {activeStep === step.id ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                        </div>
                        <div className="accordion-content">
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProcessAccordion;
