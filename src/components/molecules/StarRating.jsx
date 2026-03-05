import React from 'react';

const StarRating = ({ rating }) => {
    // Спрощена логіка для відображення зірочок
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} style={{ color: i <= rating ? '#ffc107' : '#e4e5e9', fontSize: '20px' }}>
                ★
            </span>
        );
    }

    return <div style={{ display: 'flex', gap: '2px', margin: '10px 0' }}>{stars}</div>;
};

export default StarRating;
