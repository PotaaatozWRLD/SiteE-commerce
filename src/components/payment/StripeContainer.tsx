import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
    PaymentRequestButtonElement
} from '@stripe/react-stripe-js'
import './Payment.css'

// Public Test Key (Standard Stripe Demo Key)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

interface StripePaymentFormProps {
    total: number
    onSuccess: () => void
    showWalletOnly?: boolean
    showCardOnly?: boolean
    fallback?: React.ReactNode
}

const StripePaymentForm = ({ total, onSuccess, showWalletOnly, showCardOnly, fallback }: StripePaymentFormProps) => {
    const stripe = useStripe()
    const elements = useElements()
    const [paymentRequest, setPaymentRequest] = useState<any>(null)
    const [canMakePayment, setCanMakePayment] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!stripe) return

        const pr = stripe.paymentRequest({
            country: 'FR',
            currency: 'eur',
            total: {
                label: 'Total Commande',
                amount: Math.round(total * 100),
            },
            requestPayerName: true,
            requestPayerEmail: true,
        })

        pr.canMakePayment().then(result => {
            setCanMakePayment(!!result)
            if (result) {
                setPaymentRequest(pr)
            }
        })

        pr.on('paymentmethod', async (ev) => {
            ev.complete('success')
            onSuccess()
        })

    }, [stripe, total])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!stripe || !elements) return
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)
        onSuccess()
    }

    if (showWalletOnly) {
        if (paymentRequest) {
            return (
                <div style={{ marginBottom: '10px' }}>
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                </div>
            )
        }
        if (canMakePayment === false && fallback) {
            return <>{fallback}</>
        }
        return null
    }

    if (showCardOnly) {
        return (
            <form onSubmit={handleSubmit} className="credit-card-form">
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500 }}>
                        Ou payer par Carte Bancaire
                    </label>
                    <div style={{
                        padding: '15px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        background: '#fff'
                    }}>
                        <CardElement options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }} />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-checkout"
                    disabled={!stripe || loading}
                >
                    {loading ? 'Traitement...' : `Payer ${total.toFixed(2)} €`}
                </button>
            </form>
        )
    }

    return null
}

export default function StripeContainer(props: StripePaymentFormProps) {
    return (
        <Elements stripe={stripePromise}>
            <StripePaymentForm {...props} />
        </Elements>
    )
}
