import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './Dashboard.css'

interface Profile {
    id: string
    email: string
    full_name: string
    role: string
    created_at: string
    avatar_url: string | null
}

export default function Customers() {
    const [customers, setCustomers] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setCustomers(data || [])
        } catch (error) {
            console.error('Error fetching customers:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Clients 👥</h1>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>
            ) : (
                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Email</th>
                                <th>Rôle</th>
                                <th>Inscrit le</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: '#B9FF66',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '14px'
                                            }}>
                                                {customer.full_name ? customer.full_name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>
                                                {customer.full_name || 'Utilisateur sans nom'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            background: customer.role === 'admin' ? '#191A23' : '#f3f4f6',
                                            color: customer.role === 'admin' ? '#fff' : '#374151',
                                            fontSize: '12px',
                                            textTransform: 'capitalize'
                                        }}>
                                            {customer.role}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(customer.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                </tr>
                            ))}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>
                                        Aucun client inscrit pour le moment.
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
