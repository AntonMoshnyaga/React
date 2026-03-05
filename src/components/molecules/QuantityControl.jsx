import React from 'react';

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>Кількість:</span>
            <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                    onClick={onDecrease}
                    disabled={quantity <= 1}
                    style={{ padding: '8px 12px', background: '#f8f9fa', border: 'none', borderRight: '1px solid #ddd', cursor: quantity <= 1 ? 'not-allowed' : 'pointer' }}
                >
                    -
                </button>
                <div style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '30px' }}>
                    {quantity}
                </div>
                <button
                    onClick={onIncrease}
                    style={{ padding: '8px 12px', background: '#f8f9fa', border: 'none', borderLeft: '1px solid #ddd', cursor: 'pointer' }}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantityControl;
