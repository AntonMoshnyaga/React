export default function Button({ children, type = "button", disabled, onClick }) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{
                padding: '10px 20px',
                background: disabled ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
            }}
        >
            {children}
        </button>
    );
}
