import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useOrders } from '../../hooks/useOrders'
import './Dashboard.css'

export default function Dashboard() {
    const { products } = useProducts()
    const { orders } = useOrders()

    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + (order.status === 'paid' || order.status === 'delivered' ? order.total : 0), 0)
    const totalOrders = orders.length
    const totalProducts = products.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Format currency
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price)
    }

    return (
        <div className="dashboard-container">
            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Revenu Total</span>
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                    </div>
                    <span className="stat-value">{formatPrice(totalRevenue)}</span>
                    <span className="stat-trend positive">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +12.5% ce mois
                    </span>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Commandes</span>
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </div>
                    </div>
                    <span className="stat-value">{totalOrders}</span>
                    <span className="stat-trend positive">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +5 nouvelles
                    </span>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Produits Actifs</span>
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                    </div>
                    <span className="stat-value">{totalProducts}</span>
                    <span className="stat-trend">
                        En stock
                    </span>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Panier Moyen</span>
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                    </div>
                    <span className="stat-value">{formatPrice(averageOrderValue)}</span>
                    <span className="stat-trend negative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                            <polyline points="17 18 23 18 23 12"></polyline>
                        </svg>
                        -2.3%
                    </span>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="recent-orders">
                <div className="section-header">
                    <h2 className="admin-section-title">Commandes Récentes</h2>
                    <Link to="/admin/orders" className="view-all">Voir tout</Link>
                </div>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID Commande</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Montant</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 5).map((order) => (
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
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                                        Aucune commande pour le moment
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
