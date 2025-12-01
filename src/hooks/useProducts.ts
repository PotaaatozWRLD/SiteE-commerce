import { useState, useEffect, useCallback } from 'react'
import { supabase, type Product } from '../lib/supabase'

export function useProducts(limit?: number, categorySlug?: string) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('products')
                .select('*, category:categories!inner(*)') // !inner is important for filtering by joined table
                .eq('is_active', true)
                .order('created_at', { ascending: false })

            if (categorySlug) {
                // Filter by category slug
                query = query.eq('category.slug', categorySlug)
            }

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
    }, [limit, categorySlug])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return { products, loading, error, refetch: fetchProducts }
}

// Hook for single product (for edit form)
export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(!!id) // Only load if id exists
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setLoading(false)
            return
        }

        const fetchProduct = async () => {
            try {
                setLoading(true)
                const { data, error: fetchError } = await supabase
                    .from('products')
                    .select('*, category:categories(*)')
                    .eq('id', id)
                    .single()

                if (fetchError) throw fetchError
                setProduct(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur inconnue')
                console.error('Error fetching product:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    return { product, loading, error }
}

// Product CRUD operations
export async function createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([{
                ...productData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (err) {
        console.error('Error creating product:', JSON.stringify(err, null, 2))
        return { data: null, error: err instanceof Error ? err.message : 'Erreur création produit' }
    }
}

export async function updateProduct(id: string, productData: Partial<Product>) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                ...productData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (err) {
        console.error('Error updating product:', err)
        return { data: null, error: err instanceof Error ? err.message : 'Erreur mise à jour produit' }
    }
}

export async function deleteProduct(id: string) {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (error) throw error
        return { error: null }
    } catch (err) {
        console.error('Error deleting product:', err)
        return { error: err instanceof Error ? err.message : 'Erreur suppression produit' }
    }
}
