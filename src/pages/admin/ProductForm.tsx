import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { createProduct, updateProduct, useProduct } from '../../hooks/useProducts'
import './Dashboard.css'

export default function ProductForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])

    // Use useProduct hook for editing
    const { product, loading: fetchLoading } = useProduct(id)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        original_price: '',
        stock: '',
        category_id: '',
        image_url: '', // For now simple text input for emoji or URL
        badge: ''
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    // Update form when product loads
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description || '',
                price: product.price.toString(),
                original_price: product.original_price?.toString() || '',
                stock: product.stock.toString(),
                category_id: product.category_id || '',
                image_url: product.image_url || '',
                badge: product.badge || ''
            })
        }
    }, [product])

    async function fetchCategories() {
        const { data } = await supabase.from('categories').select('*')
        if (data) setCategories(data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const productData: any = {
                name: formData.name,
                slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                description: formData.description,
                price: parseFloat(formData.price),
                original_price: formData.original_price ? parseFloat(formData.original_price) : null,
                stock: parseInt(formData.stock),
                category_id: formData.category_id,
                image_url: formData.image_url,
                badge: formData.badge || null,
                is_active: true
            }

            if (isEditMode && id) {
                const { error } = await updateProduct(id, productData)
                if (error) throw new Error(error)
            } else {
                const { error } = await createProduct(productData)
                if (error) throw new Error(error)
            }

            navigate('/admin/products')
        } catch (error: any) {
            console.error('Error saving product:', error)
            alert('Erreur lors de la sauvegarde: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (fetchLoading) return <div className="p-8">Chargement...</div>

    return (
        <div className="dashboard-container" style={{ maxWidth: '800px' }}>
            <div className="section-header">
                <h2 className="admin-section-title">{isEditMode ? 'Modifier le produit' : 'Nouveau produit'}</h2>
            </div>

            <div className="recent-orders" style={{ padding: '32px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nom du produit</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Prix (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Prix barré (optionnel)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="original_price"
                                value={formData.original_price}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Catégorie</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px', background: '#fff' }}
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Image (Emoji ou URL)</label>
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="ex: 🕌 ou https://..."
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Badge (optionnel)</label>
                        <select
                            name="badge"
                            value={formData.badge}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px', background: '#fff' }}
                        >
                            <option value="">Aucun</option>
                            <option value="new">Nouveau</option>
                            <option value="sale">Promo</option>
                            <option value="popular">Populaire</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#B9FF66', color: '#191A23', cursor: 'pointer', fontWeight: 700, flex: 1 }}
                        >
                            {loading ? 'Sauvegarde...' : 'Sauvegarder le produit'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
