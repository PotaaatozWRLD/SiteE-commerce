import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Product {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    original_price: number | null
    category_id: string | null
    image_url: string | null
    images: string[] | null
    stock: number
    rating: number
    reviews_count: number
    badge: 'new' | 'sale' | 'popular' | null
    is_active: boolean
    created_at: string
    updated_at: string
    category?: Category
    supplier_url?: string | null
    cost_price?: number | null
}

export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    created_at: string
}

export interface Order {
    id: string
    user_id: string
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    total: number
    shipping_address: any
    created_at: string
    updated_at: string
}

export interface Profile {
    id: string
    email: string | null
    full_name: string | null
    role: 'customer' | 'admin'
    phone: string | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}
