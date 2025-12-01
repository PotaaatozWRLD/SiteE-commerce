import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './Dashboard.css'

interface OrderItem {
    id: string
    quantity: number
    price_at_purchase: number
    product: {
        name: string
        image_url: string
        supplier_url?: string
    }
}

interface Order {
    id: string
    created_at: string
    total_amount: number
    status: string
    payment_method: string
    payment_id: string
    shipping_name: string
    shipping_address: string
    shipping_city: string
    shipping_zip: string
    items: OrderItem[]
}

export default function OrderDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (id) fetchOrderDetails()
    }, [id])

    const fetchOrderDetails = async () => {
        try {
            // Fetch order info
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single()

            if (orderError) throw orderError

            // Fetch order items with product details
            const { data: itemsData, error: itemsError } = await supabase
                .from('order_items')
                .select(`
                    *,
                    product:products(name, image_url, supplier_url)
                `)
                .eq('order_id', id)

            if (itemsError) throw itemsError

            setOrder({ ...orderData, items: itemsData })
        } catch (error) {
            console.error('Error fetching order details:', error)
            alert('Erreur chargement commande')
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (newStatus: string) => {
        if (!confirm(`Passer la commande en "${newStatus}" ?`)) return

        setUpdating(true)
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error

            // Refresh local state
            if (order) setOrder({ ...order, status: newStatus })

        } catch (error) {
            console.error('Error updating status:', error)
            alert('Erreur mise à jour statut')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) return <div className="admin-container">Chargement...</div>
    if (!order) return <div className="admin-container">Commande introuvable</div>

    return (
        <div className="admin-container">
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => navigate('/admin/orders')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    ← Retour aux commandes
                </button>
            </div>

            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Commande #{order.id.slice(0, 8)}</h1>
                    <p style={{ color: '#666' }}>
                        Passée le {new Date(order.created_at).toLocaleString('fr-FR')}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {order.status === 'paid' && (
                        <button
                            className="btn-primary"
                            onClick={() => updateStatus('shipped')}
                            disabled={updating}
                            style={{ background: '#00BFFF' }}
                        >
                            Marquer comme Expédié 🚚
                        </button>
                    )}
                    {order.status === 'shipped' && (
                        <button
                            className="btn-primary"
                            onClick={() => updateStatus('delivered')}
                            disabled={updating}
                            style={{ background: '#B9FF66', color: '#000' }}
                        >
                            Marquer comme Livré ✅
                        </button>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>

                {/* Left: Items */}
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                    <h3 className="admin-section-title">Articles ({order.items.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {order.items.map((item: any) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
                                <img
                                    src={item.product?.image_url || 'https://via.placeholder.com/50'}
                                    alt={item.product?.name}
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.product?.name || 'Produit supprimé'}</div>
                                    <div style={{ color: '#666' }}>Qté: {item.quantity} x {item.price_at_purchase} €</div>
                                    {item.product?.supplier_url && (
                                        <a
                                            href={item.product.supplier_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-block',
                                                marginTop: '4px',
                                                fontSize: '12px',
                                                color: '#2563EB',
                                                textDecoration: 'none',
                                                border: '1px solid #2563EB',
                                                padding: '2px 6px',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            ↗ Commander Fournisseur
                                        </a>
                                    )}
                                </div>
                                <div style={{ fontWeight: 'bold' }}>
                                    {(item.quantity * item.price_at_purchase).toFixed(2)} €
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '18px', fontWeight: 'bold' }}>
                        Total: {order.total_amount.toFixed(2)} €
                    </div>
                </div>

                {/* Right: Customer Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                        <h3 className="admin-section-title">Client</h3>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Nom:</strong> {order.shipping_name}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Adresse:</strong><br />
                            {order.shipping_address}<br />
                            {order.shipping_zip} {order.shipping_city}
                        </div>
                    </div>

                    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                        <h3 className="admin-section-title">Paiement</h3>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Méthode:</strong> <span style={{ textTransform: 'capitalize' }}>{order.payment_method}</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>ID Transaction:</strong><br />
                            <span style={{ fontFamily: 'monospace', fontSize: '12px', wordBreak: 'break-all' }}>
                                {order.payment_id}
                            </span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Statut:</strong> <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{order.status}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
