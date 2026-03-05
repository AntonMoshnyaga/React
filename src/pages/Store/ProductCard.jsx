import React, { useState } from 'react';
import ProductDetails from '../../components/molecules/ProductDetails';
import QuantityControl from '../../components/molecules/QuantityControl';
import Button from '../../components/atoms/Button';

// Smart Компонент: Контейнер Товару
const ProductCard = () => {
    // Стан "Кількості товару" знаходиться САМЕ ТУТ (в контейнері), 
    // оскільки він визначає логіку перед покупкою і йому потрібен доступ до даних товару.
    const [quantity, setQuantity] = useState(1);

    // Імітація даних з сервера
    const productData = {
        id: 101,
        title: "Бездротові навушники Sony WH-1000XM4",
        description: "Легендарні навушники з найкращим у своєму класі активним шумозаглушенням, до 30 годин автономної роботи та підтримкою аудіо високої роздільної здатності.",
        price: 12999,
        rating: 5,
        imageUrl: "https://via.placeholder.com/300x300.png?text=Sony+WH-1000XM4"
    };

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleBuy = () => {
        alert(`Додано до кошика: ${productData.title}\nКількість: ${quantity} шт.\nЗагальна сума: ${productData.price * quantity} ₴`);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', display: 'flex', gap: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>

            {/* Зображення товару (Dumb HTML Element) */}
            <div style={{ flex: '0 0 300px' }}>
                <img src={productData.imageUrl} alt={productData.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
            </div>

            {/* Деталі товару (Презентаційний компонент) */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* Передача даних через Props */}
                <ProductDetails
                    title={productData.title}
                    description={productData.description}
                    price={productData.price}
                    rating={productData.rating}
                />

                <div style={{ padding: '0 20px', marginTop: 'auto' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '20px' }} />

                    {/* Керування кількістю (Презентаційний компонент, але з колбеками змінює стан батька) */}
                    <QuantityControl
                        quantity={quantity}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                    />

                    {/* Кнопка купити */}
                    <Button onClick={handleBuy} style={{ width: '100%', padding: '15px', fontSize: '18px' }}>
                        Купити за {productData.price * quantity} ₴
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;
