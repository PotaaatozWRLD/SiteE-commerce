import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface Order {
    id: string
    user_id: string
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    total: number
    shipping_address: any
    created_at: string
    updated_at: string
    items?: OrderItem[]
    user?: {
        email: string
        full_name?: string
    }
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    quantity: number
    price: number
    product?: {
        name: string
        image_url: string
    }
}

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    async function fetchOrders() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    items:order_items(
                        *,
                        product:products(name, image_url)
                    )
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

            // Fetch user details manually since we can't always join auth.users directly easily
            // Or if we have a profiles table, we can join that.
            // Let's try to join profiles if possible, or just fetch them.
            // Schema has profiles table.

            const ordersWithProfiles = await Promise.all(data.map(async (order) => {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('email, full_name')
                    .eq('id', order.user_id)
                    .single()

                return {
                    ...order,
                    user: profile || { email: 'Unknown' }
                }
            }))

            setOrders(ordersWithProfiles)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { orders, loading, error, refetch: fetchOrders }
}
