import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase, type Profile } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
    user: User | null
    profile: Profile | null
    isAdmin: boolean
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ data: Profile | null, error: Error | null }>
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Safety timeout to prevent infinite loading
        const timer = setTimeout(() => {
            setLoading(false)
        }, 3000)

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchProfile(session.user.id)
            } else {
                setLoading(false)
            }
        }).catch(err => {
            console.error('Auth session error:', err)
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchProfile(session.user.id)
            } else {
                setProfile(null)
                setLoading(false)
            }
        })

        return () => {
            subscription.unsubscribe()
            clearTimeout(timer)
        }
    }, [])

    async function fetchProfile(userId: string) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) throw error
            setProfile(data)
            return data
        } catch (error) {
            console.error('Error fetching profile:', error)
            return null
        } finally {
            setLoading(false)
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            let profileData = null
            // Fetch profile to check role
            if (data.user) {
                profileData = await fetchProfile(data.user.id)
            }

            return { data: profileData, error: null }
        } catch (error) {
            return { data: null, error: error as Error }
        }
    }

    async function signUp(email: string, password: string, fullName: string) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (error) throw error

            // If auto-confirm is enabled, user might be logged in immediately
            if (data.user) {
                await fetchProfile(data.user.id)
            }

            return { error: null }
        } catch (error) {
            return { error: error as Error }
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
    }

    const isAdmin = profile?.role === 'admin'

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                isAdmin,
                loading,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
