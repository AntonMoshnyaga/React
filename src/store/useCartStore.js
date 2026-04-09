import { create } from 'zustand';

// Сховище для кошика покупок
const useCartStore = create((set) => ({
    // Стан: масив товарів у кошику
    items: [],
    
    // Обчислювана властивість: загальна кількість товарів
    totalQuantity: 0,

    // Дія: Додати товар або оновити кількість
    addToCart: (product, quantity) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        let newItems;
        
        if (existingItem) {
            newItems = state.items.map(item =>
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + quantity } 
                    : item
            );
        } else {
            newItems = [...state.items, { ...product, quantity }];
        }

        return {
            items: newItems,
            totalQuantity: newItems.reduce((acc, item) => acc + item.quantity, 0)
        };
    }),

    // Дія: Оновити кількість конкретного товару
    updateQuantity: (productId, quantity) => set((state) => {
        const newItems = state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        return {
            items: newItems,
            totalQuantity: newItems.reduce((acc, item) => acc + item.quantity, 0)
        };
    }),

    // Дія: Видалити товар
    removeFromCart: (productId) => set((state) => {
        const newItems = state.items.filter(item => item.id !== productId);
        return {
            items: newItems,
            totalQuantity: newItems.reduce((acc, item) => acc + item.quantity, 0)
        };
    }),

    // Дія: Очистити кошик
    clearCart: () => set({ items: [], totalQuantity: 0 })
}));

export default useCartStore;
