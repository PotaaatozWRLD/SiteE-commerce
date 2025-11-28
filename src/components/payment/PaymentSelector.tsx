import './Payment.css'

interface PaymentSelectorProps {
    selectedMethod: 'card' | 'paypal' | 'apple' | 'google'
    onSelect: (method: 'card' | 'paypal' | 'apple' | 'google') => void
}

export default function PaymentSelector({ selectedMethod, onSelect }: PaymentSelectorProps) {
    return (
        <div className="payment-methods-tabs" style={{ flexWrap: 'wrap' }}>
            <div
                className={`payment-tab ${selectedMethod === 'card' ? 'active' : ''}`}
                onClick={() => onSelect('card')}
            >
                <span>💳</span> Carte
            </div>
            <div
                className={`payment-tab ${selectedMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => onSelect('paypal')}
            >
                <span>🅿️</span> PayPal
            </div>
            <div
                className={`payment-tab ${selectedMethod === 'apple' ? 'active' : ''}`}
                onClick={() => onSelect('apple')}
            >
                <span>🍎</span> Apple Pay
            </div>
            <div
                className={`payment-tab ${selectedMethod === 'google' ? 'active' : ''}`}
                onClick={() => onSelect('google')}
            >
                <span>🤖</span> Google Pay
            </div>
        </div>
    )
}
