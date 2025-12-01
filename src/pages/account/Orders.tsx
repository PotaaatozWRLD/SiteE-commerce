import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Order {
    id: string
    created_at: string
    status: string
    total: number
}

export default function AccountOrders() {
    const { user } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user])

    async function fetchOrders() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user!.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setOrders(data || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Chargement...</div>
    }

    return (
        <div>
            <h1 className="account-title">Mes Commandes</h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Aucune commande</h3>
                    <p style={{ color: '#6b7280', marginBottom: '20px' }}>Vous n'avez pas encore passé de commande.</p>
                    <Link to="/products" style={{
                        display: 'inline-block',
                        background: '#166534',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}>
                        Découvrir nos produits
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order.id} style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}>
                            <div>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Commande #{order.id.slice(0, 8)}</div>
                                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                    {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    background: order.status === 'delivered' ? '#dcfce7' : '#f3f4f6',
                                    color: order.status === 'delivered' ? '#166534' : '#374151'
                                }}>
                                    {order.status === 'pending' ? 'En attente' :
                                        order.status === 'paid' ? 'Payée' :
                                            order.status === 'shipped' ? 'Expédiée' :
                                                order.status === 'delivered' ? 'Livrée' : order.status}
                                </span>
                                <div style={{ fontWeight: '700' }}>{order.total.toFixed(2)} €</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
