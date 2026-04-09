import React from 'react';
import ProductDetails from '../../components/molecules/ProductDetails';
import QuantityControl from '../../components/molecules/QuantityControl';
import Button from '../../components/atoms/Button';
import useCartStore from '../../store/useCartStore';

// Smart Компонент: Контейнер Товару
const ProductCard = () => {
    // Використовуємо глобальне сховище
    const { items, addToCart, updateQuantity } = useCartStore();

    // Імітація даних з сервера
    const productData = {
        id: 101,
        title: "Бездротові навушники Sony WH-1000XM4",
        description: "Легендарні навушники з найкращим у своєму класі активним шумозаглушенням, до 30 годин автономної роботи та підтримкою аудіо високої роздільної здатності.",
        price: 12999,
        rating: 5,
        imageUrl: "https://via.placeholder.com/300x300.png?text=Sony+WH-1000XM4"
    };

    // Знаходимо, чи є цей товар уже в кошику
    const cartItem = items.find(item => item.id === productData.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleIncrease = () => {
        if (cartItem) {
            updateQuantity(productData.id, quantity + 1);
        } else {
            addToCart(productData, 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(productData.id, quantity - 1);
        }
    };

    const handleBuy = () => {
        if (!cartItem) {
            addToCart(productData, 1);
        }
        alert(`Товар "${productData.title}" у кошику!`);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', display: 'flex', gap: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>

            {/* Зображення товару */}
            <div style={{ flex: '0 0 300px' }}>
                <img src={productData.imageUrl} alt={productData.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
            </div>

            {/* Деталі товару */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                <ProductDetails
                    title={productData.title}
                    description={productData.description}
                    price={productData.price}
                    rating={productData.rating}
                />

                <div style={{ padding: '0 20px', marginTop: 'auto' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '20px' }} />

                    {/* Керування кількістю через глобальний стан */}
                    <QuantityControl
                        quantity={quantity || 1}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                    />

                    {/* Кнопка купити/в кошику */}
                    <Button onClick={handleBuy} style={{ width: '100%', padding: '15px', fontSize: '18px', background: cartItem ? '#4caf50' : '#007bff' }}>
                        {cartItem ? `В кошику (${quantity})` : `Купити за ${productData.price} ₴`}
                    </Button>
                </div>
            </div>

        </div>
    );
};


export default ProductCard;
