import { useState, useEffect } from "react";

const useWindowSize = () => {
    // Локальний стан нашого хука
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Функція-обробник події
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Підписуємося на подію зміни розміру вікна
        window.addEventListener("resize", handleResize);

        // ОЧИЩЕННЯ (Cleanup) - критично важливо для уникнення Memory Leaks
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Пустий масив: ефект спрацьовує 1 раз при монтуванні

    // Хук "висилає" назовні свій стан
    return windowSize;
};

export default useWindowSize;
