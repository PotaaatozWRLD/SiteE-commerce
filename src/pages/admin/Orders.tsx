import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import './Dashboard.css'

export default function Orders() {
    const { orders, loading, error } = useOrders()
    const navigate = useNavigate()

    if (loading) return <div className="p-8">Chargement...</div>
    if (error) return <div className="p-8 text-red-500">Erreur: {error}</div>

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price)
    }

    return (
        <div className="dashboard-container">
            <div className="section-header">
                <h2 className="section-title">Commandes ({orders.length})</h2>
            </div>

            <div className="recent-orders">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id.slice(0, 8)}</td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 500 }}>{order.user?.full_name || 'Client'}</span>
                                            <span style={{ fontSize: '12px', color: '#666' }}>{order.user?.email}</span>
                                        </div>
                                    </td>
                                    <td>{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                                    <td style={{ fontWeight: 600 }}>{formatPrice(order.total)}</td>
                                    <td>
                                        <span className={`status-badge ${order.status}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                                            style={{ padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', background: '#fff', fontSize: '13px', fontWeight: 500 }}
                                        >
                                            Voir détails
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px' }}>
                                        Aucune commande trouvée
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
