import { useState } from 'react'
import './Payment.css'

interface CreditCardFormProps {
    onSubmit: () => void
    loading: boolean
}

export default function CreditCardForm({ onSubmit, loading }: CreditCardFormProps) {
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target

        // Format Card Number
        if (name === 'number') {
            value = value.replace(/\D/g, '').slice(0, 16)
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
        }
        // Format Expiry
        if (name === 'expiry') {
            value = value.replace(/\D/g, '').slice(0, 4)
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2)
            }
        }
        // Format CVC
        if (name === 'cvc') {
            value = value.replace(/\D/g, '').slice(0, 3)
        }

        setCardData({ ...cardData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate validation
        if (cardData.number.length < 19 || cardData.cvc.length < 3) {
            alert('Veuillez vérifier les informations de votre carte')
            return
        }
        onSubmit()
    }

    return (
        <div className="credit-card-form">
            {/* Visual Preview */}
            <div className="card-preview">
                <div className="card-chip"></div>
                <div className="card-number-display">
                    {cardData.number || '•••• •••• •••• ••••'}
                </div>
                <div className="card-details-display">
                    <div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>Titulaire</div>
                        <div>{cardData.name || 'NOM PRÉNOM'}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>Expire</div>
                        <div>{cardData.expiry || 'MM/AA'}</div>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', fontStyle: 'italic', fontWeight: 'bold' }}>
                    VISA
                </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="card-input-group">
                <div>
                    <input
                        type="text"
                        name="number"
                        placeholder="Numéro de carte"
                        className="card-input"
                        value={cardData.number}
                        onChange={handleChange}
                        maxLength={19}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom sur la carte"
                        className="card-input"
                        value={cardData.name}
                        onChange={handleChange}
                        style={{ textTransform: 'uppercase' }}
                        required
                    />
                </div>
                <div className="card-row">
                    <input
                        type="text"
                        name="expiry"
                        placeholder="MM/AA"
                        className="card-input"
                        value={cardData.expiry}
                        onChange={handleChange}
                        maxLength={5}
                        required
                    />
                    <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        className="card-input"
                        value={cardData.cvc}
                        onChange={handleChange}
                        maxLength={3}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-checkout"
                    disabled={loading}
                    style={{ marginTop: '20px' }}
                >
                    {loading ? 'Traitement...' : 'Payer maintenant'}
                </button>
            </form>
        </div>
    )
}
