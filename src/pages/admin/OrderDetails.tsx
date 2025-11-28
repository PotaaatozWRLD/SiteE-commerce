import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Order } from '../../hooks/useOrders'
import './Dashboard.css'

export default function OrderDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        fetchOrder()
    }, [id])

    async function fetchOrder() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    items:order_items(
                        *,
                        product:products(name, image_url)
                    )
                `)
                .eq('id', id)
                .single()

            if (error) throw error

            // Fetch user
            const { data: profile } = await supabase
                .from('profiles')
                .select('email, full_name, phone')
                .eq('id', data.user_id)
                .single()

            setOrder({
                ...data,
                user: profile || { email: 'Unknown' }
            })
        } catch (error) {
            console.error('Error fetching order:', error)
            alert('Erreur lors du chargement de la commande')
            navigate('/admin/orders')
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (newStatus: string) => {
        if (!order) return
        setUpdating(true)
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', order.id)

            if (error) throw error

            setOrder({ ...order, status: newStatus as any })
        } catch (error: any) {
            alert('Erreur lors de la mise à jour: ' + error.message)
        } finally {
            setUpdating(false)
        }
    }

    if (loading) return <div className="p-8">Chargement...</div>
    if (!order) return <div className="p-8">Commande introuvable</div>

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price)
    }

    return (
        <div className="dashboard-container">
            <div className="section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={() => navigate('/admin/orders')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                    >
                        ←
                    </button>
                    <h2 className="admin-section-title">Commande #{order.id.slice(0, 8)}</h2>
                    <span className={`status-badge ${order.status}`} style={{ fontSize: '14px', padding: '6px 12px' }}>
                        {order.status}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                        value={order.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        disabled={updating}
                        style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}
                    >
                        <option value="pending">En attente</option>
                        <option value="paid">Payée</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                        <option value="cancelled">Annulée</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Order Items */}
                <div className="recent-orders" style={{ height: 'fit-content' }}>
                    <div className="section-header">
                        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Articles</h3>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Prix</th>
                                    <th>Qté</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items?.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.product?.image_url?.startsWith('http') ? (
                                                        <img src={item.product.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                                                    ) : (
                                                        item.product?.image_url || '📦'
                                                    )}
                                                </div>
                                                <span>{item.product?.name || 'Produit supprimé'}</span>
                                            </div>
                                        </td>
                                        <td>{formatPrice(item.price)}</td>
                                        <td>x{item.quantity}</td>
                                        <td style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'right', padding: '16px', fontWeight: 600 }}>Total</td>
                                    <td style={{ padding: '16px', fontWeight: 700, fontSize: '18px' }}>{formatPrice(order.total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="recent-orders" style={{ height: 'fit-content' }}>
                    <div className="section-header">
                        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Client</h3>
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Nom complet</div>
                            <div style={{ fontWeight: 500 }}>{order.user?.full_name || 'N/A'}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Email</div>
                            <div style={{ fontWeight: 500 }}>{order.user?.email}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Adresse de livraison</div>
                            <div style={{ fontWeight: 500, lineHeight: '1.5' }}>
                                {order.shipping_address ? (
                                    <>
                                        {order.shipping_address.line1}<br />
                                        {order.shipping_address.city}, {order.shipping_address.postal_code}<br />
                                        {order.shipping_address.country}
                                    </>
                                ) : (
                                    'Non renseignée'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
