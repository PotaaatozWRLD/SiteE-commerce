import './Payment.css'

interface WalletButtonProps {
    type: 'apple' | 'google'
    onClick: () => void
}

export default function WalletButton({ type, onClick }: WalletButtonProps) {
    const isApple = type === 'apple'

    return (
        <div className="paypal-container">
            <p className="paypal-note">
                Payer rapidement avec {isApple ? 'Apple Pay' : 'Google Pay'}
            </p>
            <button
                onClick={onClick}
                style={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '4px',
                    border: 'none',
                    background: isApple ? '#000' : '#000', // Google Pay is also often black or white
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
            >
                {isApple ? (
                    <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M17.26 13.9c.04 2.48 2.18 3.31 2.2 3.32-.02.06-.34 1.17-1.12 2.31-.7.99-1.42 1.98-2.56 2-.98.02-1.44-.66-2.68-.66-1.26 0-1.66.64-2.68.68-1.08.04-1.92-1.08-2.62-2.1-1.42-2.06-2.52-5.84-1.06-8.38.72-1.26 2.02-2.06 3.42-2.08 1.08-.02 2.1.72 2.76.72.66 0 1.9-.9 3.2-.76.54.02 2.06.22 3.04 1.66-.08.04-1.82 1.06-1.9 3.29zm-2.6-6.1c.56-.68.94-1.62.84-2.56-.8.04-1.78.54-2.36 1.22-.52.6-.98 1.58-.86 2.52.9.06 1.82-.5 2.38-1.18z" />
                        </svg>
                        Pay
                    </>
                ) : (
                    <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.64 2 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c4.59 0 9.17-2.6 9.17-9.6 0-.48-.08-1.3-.17-1.3z" />
                        </svg>
                        Pay
                    </>
                )}
            </button>
        </div>
    )
}
