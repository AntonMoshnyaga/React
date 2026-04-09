import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import useWindowSize from '../../hooks/useWindowSize';
import appStyles from '../../App.module.css';

const generateHeavyAnalytics = (num) => {
    console.log("Запуск важких обчислень...");
    let result = 0;
    // Зменшимо трохи кількість ітерацій, щоб не "завісити" браузер намертво, 
    // але щоб лаг був відчутним (~100-300ms)
    for (let i = 0; i < 500000000; i++) {
        result += num;
    }
    return result;
};

const Feed = () => {
    const { data: posts, isLoading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");
    
    // Хук для роботи з URL параметрами
    const [searchParams, setSearchParams] = useSearchParams();

    // Чисто локальне значення для демонстрації лагу інпуту
    const [inputValue, setInputValue] = React.useState("");
    const [analyticsNumber, setAnalyticsNumber] = React.useState(1);

    // Кастомний хук ширини вікна
    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Дістаємо поточні значення з URL (або дефолтні)
    const searchQuery = searchParams.get("query") || "";
    const sortOrder = searchParams.get("sort") || "asc";

    // ОПТИМІЗАЦІЯ: React запам'ятає результат цієї функції.
    // Він запустить її ЗНОВУ ТІЛЬКИ ЯКЩО зміниться [analyticsNumber].
    // Якщо змінюється [inputValue] (ми друкуємо) -> функція НЕ виконується.
    const analyticsResult = React.useMemo(() => {
        return generateHeavyAnalytics(analyticsNumber);
    }, [analyticsNumber]);

    const handleSearchChange = React.useCallback((e) => {
        const text = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (text) {
            newParams.set("query", text);
        } else {
            newParams.delete("query");
        }
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const handleLocalInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSortChange = React.useCallback((e) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort", e.target.value);
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    if (isLoading) {
        return (
            <div className={appStyles.contentSection} style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Завантаження новин...</h2>
                <div style={{ animation: 'spin 1s linear infinite', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto' }}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={appStyles.contentSection}>
                <h2 style={{ color: 'red' }}>Сталася помилка: {error}</h2>
            </div>
        );
    }

    // 1. Фільтрація
    let processedPosts = posts ? posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    // 2. Сортування
    processedPosts = processedPosts.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    return (
        <div className={appStyles.contentSection}>
            <h2>Стрічка новин (API JSONPlaceholder)</h2>
            
            <div style={{ background: '#f9f9f9', padding: '15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h3>Аналітика продуктивності</h3>
                <p>Результат важких обчислень: <strong>{analyticsResult}</strong></p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label>Швидкий інпут (локальний стейт):</label>
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleLocalInputChange}
                        placeholder="Друкуйте тут, щоб відчути лаг..."
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                    />
                </div>
                <p><small style={{ color: '#666' }}>Кожна зміна в цьому інпуті викликає повний рендер компонента та запуск важкої функції.</small></p>
            </div>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Пошук новин (URL)..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <select 
                    value={sortOrder} 
                    onChange={handleSortChange}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', width: isMobile ? '100%' : 'auto' }}
                >
                    <option value="asc">Від А до Я</option>
                    <option value="desc">Від Я до А</option>
                </select>
            </div>

            {/* Завдання для самостійного виконання */}
            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fffbe6', borderRadius: '8px', border: '1px solid #ffe58f' }}>
                <h3>Самостійна робота: Рендер 10,000 елементів</h3>
                <p>Кількість елементів: 10,000 (Array.fill)</p>
                
                {/* 
                    Демонстрація без useMemo: 
                    Кожна зміна в інпуті вище змушує React перестворювати цей масив, 
                    що займає час та ресурси.
                */}
                <div style={{ height: '150px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', background: 'white' }}>
                    {React.useMemo(() => {
                        console.log("Рендер великого списку...");
                        return Array(10000).fill(0).map((_, i) => (
                            <div key={i} style={{ fontSize: '12px' }}>Елемент продуктивності №{i}</div>
                        ));
                    }, [])}
                </div>
                <p><small style={{ color: '#856404' }}>Примітка: Тут використано <code>useMemo</code> з порожнім масивом залежностей, щоб цей список не "вбивав" FPS при кожному натисканні клавіші в інпутах вище.</small></p>
            </div>
        </div>
    );
};


export default Feed;
