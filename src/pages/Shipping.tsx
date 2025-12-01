export default function Shipping() {
    return (
        <>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 20px 40px', fontFamily: 'Space Grotesk, sans-serif' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '42px', marginBottom: '15px', fontWeight: 700 }}>Livraison & Retours</h1>
                    <p style={{ color: '#6b7280', fontSize: '18px' }}>
                        Rapide, fiable et transparente.
                    </p>
                </div>

                {/* Shipping Methods */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                    <div style={{ padding: '30px', border: '1px solid #e5e7eb', borderRadius: '20px', background: '#fff' }}>
                        <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#166534' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 18 1 18 1 3"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        </div>
                        <h3 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 600 }}>Colissimo Domicile</h3>
                        <p style={{ color: '#6b7280', marginBottom: '20px' }}>Livraison à votre domicile en 48h avec suivi.</p>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#166534' }}>4.99€</div>
                        <div style={{ fontSize: '14px', color: '#166534', marginTop: '5px' }}>Gratuit dès 50€ d'achat</div>
                    </div>

                    <div style={{ padding: '30px', border: '1px solid #e5e7eb', borderRadius: '20px', background: '#fff' }}>
                        <div style={{ width: '50px', height: '50px', background: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#0369a1' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <h3 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 600 }}>Mondial Relay</h3>
                        <p style={{ color: '#6b7280', marginBottom: '20px' }}>Livraison en point relais en 3-5 jours.</p>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369a1' }}>3.99€</div>
                        <div style={{ fontSize: '14px', color: '#0369a1', marginTop: '5px' }}>Le choix économique</div>
                    </div>
                </div>

                {/* Process Timeline */}
                <div style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '40px', textAlign: 'center' }}>Comment ça marche ?</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
                        {/* Line */}
                        <div style={{ position: 'absolute', top: '25px', left: '0', right: '0', height: '2px', background: '#e5e7eb', zIndex: 0 }}></div>

                        {/* Steps */}
                        {[
                            { icon: "🛍️", title: "Commande", desc: "Validation immédiate" },
                            { icon: "📦", title: "Préparation", desc: "Sous 24h" },
                            { icon: "🚚", title: "Expédition", desc: "Suivi par email" },
                            { icon: "🏠", title: "Livraison", desc: "Chez vous !" }
                        ].map((step, i) => (
                            <div key={i} style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '120px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: '#fff',
                                    border: '2px solid #166534',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    margin: '0 auto 15px auto'
                                }}>
                                    {step.icon}
                                </div>
                                <h4 style={{ fontWeight: 600, marginBottom: '5px' }}>{step.title}</h4>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Returns Section */}
                <div style={{
                    background: '#f9fafb',
                    borderRadius: '24px',
                    padding: '40px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Politique de Retour Simple</h2>
                    <p style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
                        Vous disposez de <strong>14 jours</strong> pour changer d'avis.
                        Si le produit ne vous convient pas, nous vous le remboursons intégralement.
                    </p>
                    <button style={{
                        padding: '12px 24px',
                        background: '#fff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: '#374151'
                    }}>
                        Voir les conditions complètes
                    </button>
                </div>
            </div>
        </>
    )
}
