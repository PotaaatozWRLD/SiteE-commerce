import { useState, useEffect, useRef } from 'react'

interface AddressSuggestion {
    properties: {
        label: string
        name: string
        postcode: string
        city: string
    }
}

interface AddressAutocompleteProps {
    value: string
    onChange: (value: string) => void
    onSelect: (address: string, city: string, zipCode: string) => void
    required?: boolean
}

export default function AddressAutocomplete({ value, onChange, onSelect, required }: AddressAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Close suggestions when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        onChange(inputValue)

        if (inputValue.length > 3) {
            try {
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(inputValue)}&limit=5`)
                const data = await response.json()
                setSuggestions(data.features || [])
                setShowSuggestions(true)
            } catch (error) {
                console.error('Error fetching addresses:', error)
            }
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSelect = (suggestion: AddressSuggestion) => {
        const { name, postcode, city } = suggestion.properties
        onSelect(name, city, postcode)
        setSuggestions([])
        setShowSuggestions(false)
    }

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            <label>Adresse</label>
            <input
                type="text"
                value={value}
                onChange={handleInput}
                required={required}
                placeholder="Commencez à taper votre adresse..."
                autoComplete="off"
            />

            {showSuggestions && suggestions.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0 0 8px 8px',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            style={{
                                padding: '10px 15px',
                                cursor: 'pointer',
                                borderBottom: index < suggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                                fontSize: '14px',
                                color: '#374151'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            <strong>{suggestion.properties.name}</strong>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                {suggestion.properties.postcode} {suggestion.properties.city}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
