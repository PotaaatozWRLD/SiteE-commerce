import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts, deleteProduct } from '../../hooks/useProducts'
import './Dashboard.css' // Reuse dashboard styles for table

export default function Products() {
    const { products, loading, error, refetch } = useProducts()
    const navigate = useNavigate()
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
    const [productToDelete, setProductToDelete] = useState<string | null>(null)

    const confirmDelete = async () => {
        if (!productToDelete) return

        const id = productToDelete
        console.log('✅ Delete confirmed via modal, deleting:', id)

        try {
            setDeleteLoading(id)
            const { error } = await deleteProduct(id)

            if (error) throw new Error(error)

            refetch()
            setProductToDelete(null)
        } catch (err: any) {
            console.error('❌ Error during deletion:', err)
            alert('Erreur lors de la suppression: ' + err.message)
        } finally {
            setDeleteLoading(null)
        }
    }

    if (loading) return <div className="p-8">Chargement...</div>
    if (error) return <div className="p-8 text-red-500">Erreur: {error}</div>

    return (
        <div className="dashboard-container">
            {productToDelete && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '16px',
                        border: '2px solid #191A23',
                        boxShadow: '8px 8px 0px #191A23',
                        maxWidth: '400px',
                        width: '90%'
                    }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Confirmer la suppression ?</h3>
                        <p style={{ marginBottom: '24px', color: '#666' }}>Cette action est irréversible. Voulez-vous vraiment supprimer ce produit ?</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setProductToDelete(null)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: '2px solid #e5e7eb',
                                    background: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: '2px solid #ef4444',
                                    background: '#ef4444',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '2px 2px 0px #191A23'
                                }}
                            >
                                {deleteLoading === productToDelete ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="section-header">
                <h2 className="admin-section-title">Produits ({products.length})</h2>
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
                                                onClick={() => setProductToDelete(product.id)}
                                                style={{ padding: '6px', border: '1px solid #fee2e2', borderRadius: '6px', cursor: 'pointer', background: '#fff5f5', color: '#ef4444' }}
                                                title="Supprimer"
                                            >
                                                🗑️
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
