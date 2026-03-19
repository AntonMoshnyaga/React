import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    // Отримуємо початкове значення з localStorage або використовуємо передане (lazy initialization)
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Помилка читання з localStorage", error);
            return initialValue;
        }
    });

    // Підписуємося на зміни value і записуємо в localStorage
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Помилка запису в localStorage", error);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
