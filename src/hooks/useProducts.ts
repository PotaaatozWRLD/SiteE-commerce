import { useState, useEffect, useCallback } from 'react'
import { supabase, type Product } from '../lib/supabase'

export function useProducts(limit?: number) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('products')
                .select('*, category:categories(*)')
                .eq('is_active', true)
                .order('created_at', { ascending: false })

            if (limit) {
                query = query.limit(limit)
            }

            const { data, error: fetchError } = await query

            if (fetchError) throw fetchError

            setProducts(data || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }, [limit])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return { products, loading, error, refetch: fetchProducts }
}
