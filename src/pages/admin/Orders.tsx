import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './Dashboard.css' // Reusing dashboard styles

interface Order {
    id: string
    created_at: string
    total_amount: number
    status: string
    payment_method: string
    shipping_name: string
    shipping_city: string
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setOrders(data || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return '#B9FF66' // Green
            case 'pending': return '#FFD700' // Gold
            case 'shipped': return '#00BFFF' // Blue
            case 'cancelled': return '#FF6347' // Red
            default: return '#eee'
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Commandes 📦</h1>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>
            ) : (
                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Total</th>
                                <th>Paiement</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                                        {order.id.slice(0, 8)}...
                                    </td>
                                    <td>
                                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{order.shipping_name}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>{order.shipping_city}</div>
                                    </td>
                                    <td style={{ fontWeight: 'bold' }}>
                                        {order.total_amount.toFixed(2)} €
                                    </td>
                                    <td>
                                        <span style={{
                                            textTransform: 'capitalize',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            background: '#f3f4f6',
                                            fontSize: '12px'
                                        }}>
                                            {order.payment_method}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            background: getStatusColor(order.status),
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/admin/orders/${order.id}`}
                                            className="action-btn edit-btn"
                                            style={{ textDecoration: 'none', fontSize: '14px' }}
                                        >
                                            Voir
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>
                                        Aucune commande pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
