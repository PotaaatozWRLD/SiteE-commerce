import { useState } from 'react'

export default function AccountAddresses() {
    // Placeholder for address management
    // In a real app, this would fetch from a 'addresses' table or a JSONB column in profiles
    const [addresses] = useState([
        { id: 1, type: 'Livraison', street: '123 Rue de la Paix', city: 'Paris', zip: '75000', country: 'France', default: true }
    ])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>Mes Adresses</h1>
                <button style={{
                    background: '#166534',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Ajouter une adresse
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {addresses.map(addr => (
                    <div key={addr.id} style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '16px',
                        padding: '24px',
                        position: 'relative'
                    }}>
                        {addr.default && (
                            <span style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: '#dcfce7',
                                color: '#166534',
                                fontSize: '12px',
                                fontWeight: '600',
                                padding: '4px 8px',
                                borderRadius: '12px'
                            }}>
                                Par défaut
                            </span>
                        )}
                        <div style={{ fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            {addr.type}
                        </div>
                        <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                            {addr.street}<br />
                            {addr.zip} {addr.city}<br />
                            {addr.country}
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                            <button style={{ background: 'none', border: 'none', color: '#166534', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Modifier</button>
                            <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Moyens de paiement</h3>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>Gérez vos cartes bancaires et méthodes de paiement enregistrées.</p>
                <button style={{
                    background: 'white',
                    border: '1px solid #d1d5db',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Gérer les paiements
                </button>
            </div>
        </div>
    )
}
