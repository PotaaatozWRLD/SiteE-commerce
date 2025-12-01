import { useState } from 'react'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "Quels sont les délais de livraison ?",
            answer: "Nous expédions généralement les commandes sous 24-48h. La livraison prend ensuite 2 à 5 jours ouvrés en France métropolitaine. Vous recevrez un numéro de suivi dès l'expédition."
        },
        {
            question: "Puis-je retourner un article ?",
            answer: "Oui, vous disposez de 14 jours après réception pour nous retourner un article s'il ne vous convient pas. L'article doit être dans son état d'origine. Les frais de retour sont à votre charge, sauf erreur de notre part."
        },
        {
            question: "Les paiements sont-ils sécurisés ?",
            answer: "Absolument. Nous utilisons Stripe et PayPal, deux leaders mondiaux du paiement en ligne. Vos données bancaires sont chiffrées (SSL) et ne sont jamais stockées sur nos serveurs."
        },
        {
            question: "Vendez-vous à l'international ?",
            answer: "Pour le moment, nous livrons principalement en France, Belgique et Suisse. Nous travaillons à l'ouverture de nouvelles destinations prochainement."
        },
        {
            question: "Comment contacter le service client ?",
            answer: "Vous pouvez nous contacter via le formulaire de la page Contact, ou directement par email à contact@islamicshop.com. Nous répondons généralement sous 24h."
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 40px', fontFamily: 'Space Grotesk, sans-serif' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ fontSize: '42px', marginBottom: '15px', background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Questions Fréquentes</h1>
                    <p style={{ color: '#6b7280', fontSize: '18px' }}>Tout ce que vous devez savoir sur nos services.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '16px',
                            background: '#fff',
                            overflow: 'hidden',
                            boxShadow: openIndex === index ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.3s ease'
                        }}>
                            <button
                                onClick={() => toggleFAQ(index)}
                                style={{
                                    width: '100%',
                                    padding: '24px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <span style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>{faq.question}</span>
                                <span style={{
                                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '24px',
                                    color: '#166534'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </button>
                            <div style={{
                                maxHeight: openIndex === index ? '200px' : '0',
                                opacity: openIndex === index ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ padding: '0 24px 24px 24px', color: '#4b5563', lineHeight: '1.6' }}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
