import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import './Payment.css'

interface PayPalButtonProps {
    amount: number
    onSuccess: (details: any) => void
}

export default function PayPalPayment({ amount, onSuccess }: PayPalButtonProps) {
    return (
        <div className="paypal-container">
            <p className="paypal-note">Vous allez être redirigé vers PayPal pour sécuriser votre paiement.</p>

            <PayPalScriptProvider options={{
                clientId: "test", // Sandbox Client ID (Default 'test' works for simulation)
                currency: "EUR"
            }}>
                <PayPalButtons
                    style={{ layout: "vertical", shape: "rect", borderRadius: 10 }}
                    createOrder={(_data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount.toFixed(2),
                                        currency_code: "EUR"
                                    },
                                },
                            ],
                            intent: "CAPTURE"
                        })
                    }}
                    onApprove={async (_data, actions) => {
                        if (actions.order) {
                            const details = await actions.order.capture()
                            onSuccess(details)
                        }
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}
