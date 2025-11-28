import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Checkout.css' // Reuse checkout styles

export default function OrderConfirmation() {
    const { id } = useParams()
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchOrder()
    }, [id])

    async function fetchOrder() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            setOrder(data)
        } catch (error) {
            console.error('Error fetching order:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="checkout-container" style={{ textAlign: 'center', padding: '100px' }}>Chargement...</div>

    if (!order) return (
        <div className="checkout-container" style={{ textAlign: 'center', padding: '100px' }}>
            <h2>Commande introuvable 😕</h2>
            <Link to="/" style={{ display: 'inline-block', marginTop: '20px', color: '#191A23', textDecoration: 'underline' }}>
                Retour à l'accueil
            </Link>
        </div>
    )

    return (
        <div className="checkout-container" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}>Merci pour votre commande !</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Votre commande <strong>#{order.id.slice(0, 8)}</strong> a bien été enregistrée.
            </p>

            <div style={{ background: '#f9fafb', padding: '30px', borderRadius: '16px', marginBottom: '40px', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Détails de livraison</h3>
                <p><strong>Nom :</strong> {order.shipping_name}</p>
                <p><strong>Adresse :</strong> {order.shipping_address}, {order.shipping_zip} {order.shipping_city}</p>
                <p style={{ marginTop: '15px' }}><strong>Total payé :</strong> {order.total_amount} €</p>
            </div>

            <Link to="/" className="btn-checkout" style={{ display: 'inline-block', textDecoration: 'none', width: 'auto', padding: '15px 40px' }}>
                Retourner à la boutique
            </Link>
        </div>
    )
}
