import './ModernButton.css';

export function LoginButton({ children, onClick, withIcon = true }: { children: React.ReactNode; onClick?: () => void; withIcon?: boolean }) {
    return (
        <button className="login-button" onClick={onClick}>
            {children}
            {withIcon && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
            )}
        </button>
    );
}

export function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <button className="secondary-button" onClick={onClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            {children}
        </button>
    );
}

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

const ModernButton: React.FC<ModernButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
    const baseClass = variant === 'primary' ? 'login-button' : 'secondary-button';
    return (
        <button className={`${baseClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default ModernButton;
