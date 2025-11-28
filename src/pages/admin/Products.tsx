import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { supabase } from '../../lib/supabase'
import './Dashboard.css' // Reuse dashboard styles for table

export default function Products() {
    const { products, loading, error, refetch } = useProducts()
    const navigate = useNavigate()
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

        try {
            setDeleteLoading(id)
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) throw error

            // Refresh list
            refetch()
        } catch (err: any) {
            alert('Erreur lors de la suppression: ' + err.message)
        } finally {
            setDeleteLoading(null)
        }
    }

    if (loading) return <div className="p-8">Chargement...</div>
    if (error) return <div className="p-8 text-red-500">Erreur: {error}</div>

    return (
        <div className="dashboard-container">
            <div className="section-header">
                <h2 className="section-title">Produits ({products.length})</h2>
                <Link to="/admin/products/new" className="view-all" style={{ background: '#191A23', color: '#fff' }}>
                    + Ajouter un produit
                </Link>
            </div>

            <div className="recent-orders">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Nom</th>
                                <th>Catégorie</th>
                                <th>Prix</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                                            {product.image_url && product.image_url.startsWith('http') ? (
                                                <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                            ) : (
                                                product.image_url || '📦'
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{product.name}</div>
                                        {product.badge && (
                                            <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#059669' }}>
                                                {product.badge}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '13px', color: '#666' }}>
                                            {product.category?.name || 'Sans catégorie'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>
                                        {product.price} €
                                        {product.original_price && (
                                            <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '6px' }}>
                                                {product.original_price} €
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '50px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            background: product.stock > 10 ? '#eff6ff' : product.stock > 0 ? '#fff7ed' : '#fef2f2',
                                            color: product.stock > 10 ? '#1d4ed8' : product.stock > 0 ? '#c2410c' : '#b91c1c'
                                        }}>
                                            {product.stock} en stock
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => navigate(`/admin/products/${product.id}`)}
                                                style={{ padding: '6px', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
                                                title="Modifier"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                disabled={deleteLoading === product.id}
                                                style={{ padding: '6px', border: '1px solid #fee2e2', borderRadius: '6px', cursor: 'pointer', background: '#fff5f5', color: '#ef4444' }}
                                                title="Supprimer"
                                            >
                                                {deleteLoading === product.id ? '...' : '🗑️'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
