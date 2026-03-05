import React from 'react';
import StarRating from './StarRating';

const ProductDetails = ({ title, description, price, rating }) => {
    return (
        <div style={{ flex: 1, padding: '0 20px' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{title}</h2>
            <StarRating rating={rating} />
            <p style={{ color: '#555', lineHeight: '1.5' }}>{description}</p>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e44d26', marginTop: '15px' }}>
                {price} ₴
            </div>
        </div>
    );
};

export default ProductDetails;
