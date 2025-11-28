import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import StripeContainer from '../components/payment/StripeContainer'
import PayPalPayment from '../components/payment/PayPalButton'
import AddressAutocomplete from '../components/AddressAutocomplete'
import './Checkout.css'

export default function Checkout() {
    const { items, total, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [step, setStep] = useState<'shipping' | 'payment'>('shipping')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    })

    if (items.length === 0) {
        return (
            <div className="checkout-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h2>Votre panier est vide 🛒</h2>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#B9FF66',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Retourner à la boutique
                </button>
            </div>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStep('payment')
    }

    const processOrder = async (paymentDetails: any = {}) => {
        try {
            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    user_id: user?.id || null,
                    total_amount: total,
                    status: 'paid',
                    payment_method: paymentDetails.type || 'stripe',
                    payment_id: paymentDetails.id || 'stripe_' + Date.now(),
                    shipping_name: `${formData.firstName} ${formData.lastName}`,
                    shipping_address: formData.address,
                    shipping_city: formData.city,
                    shipping_zip: formData.zipCode,
                    created_at: new Date().toISOString()
                }])
                .select()
                .single()

            if (orderError) throw orderError

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_purchase: item.price
            }))

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems)

            if (itemsError) throw itemsError

            // 3. Clear Cart and Redirect
            clearCart()
            navigate(`/order-confirmation/${order.id}`)

        } catch (error: any) {
            console.error('Error processing order:', error)
            alert('Erreur lors de la commande: ' + error.message)
        }
    }

    return (
        <div className="checkout-container">
            <div className="checkout-grid">

                {/* Left: Form or Payment */}
                <div className="checkout-form-section">
                    <h1 className="checkout-title">
                        {step === 'shipping' ? 'Livraison 🚚' : 'Paiement 💳'}
                    </h1>

                    {step === 'shipping' ? (
                        <form onSubmit={handleShippingSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <AddressAutocomplete
                                    value={formData.address}
                                    onChange={(val) => setFormData({ ...formData, address: val })}
                                    onSelect={(address, city, zipCode) => {
                                        setFormData({ ...formData, address, city, zipCode })
                                    }}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ville</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Code Postal</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Téléphone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-checkout">
                                Continuer vers le paiement
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div style={{ marginBottom: '20px' }}>
                                <button
                                    onClick={() => setStep('shipping')}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    ← Retour à la livraison
                                </button>
                            </div>

                            <div className="payment-methods-section">
                                <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>Moyen de Paiement</h3>

                                <div style={{ display: 'grid', gap: '20px' }}>
                                    {/* PayPal */}
                                    <div style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>PayPal</h4>
                                        <PayPalPayment
                                            amount={total}
                                            onSuccess={(details) => processOrder({ ...details, type: 'paypal' })}
                                        />
                                    </div>

                                    {/* Credit Card Form (Stripe) */}
                                    <div style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Carte Bancaire</h4>
                                        <StripeContainer
                                            total={total}
                                            onSuccess={() => processOrder({ type: 'stripe_card' })}
                                            showCardOnly={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Summary */}
                <div className="checkout-summary">
                    <h2 className="summary-title">Récapitulatif</h2>
                    <div className="summary-items">
                        {items.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.quantity}x {item.name}</span>
                                <span>{(item.price * item.quantity).toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                    {step === 'payment' && (
                        <div style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
                            Livraison à :<br />
                            <strong>{formData.firstName} {formData.lastName}</strong><br />
                            {formData.address}<br />
                            {formData.zipCode} {formData.city}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
