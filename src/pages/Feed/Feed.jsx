import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import appStyles from '../../App.module.css';

const Feed = () => {
    const { data: posts, isLoading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");
    
    // Хук для роботи з URL параметрами (замість useState)
    const [searchParams, setSearchParams] = useSearchParams();

    // Дістаємо поточні значення з URL (або дефолтні)
    const searchQuery = searchParams.get("query") || "";
    const sortOrder = searchParams.get("sort") || "asc";

    const handleSearchChange = (e) => {
        const text = e.target.value;
        // Копіюємо наявні параметри, щоб не видалити сортування при пошуку
        const newParams = new URLSearchParams(searchParams);
        if (text) {
            newParams.set("query", text);
        } else {
            newParams.delete("query");
        }
        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        // Копіюємо наявні параметри, щоб не видалити пошук при сортуванні
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort", e.target.value);
        setSearchParams(newParams);
    };

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
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Пошук новин..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <select 
                    value={sortOrder} 
                    onChange={handleSortChange}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    <option value="asc">Від А до Я</option>
                    <option value="desc">Від Я до А</option>
                </select>
            </div>

            <div className={appStyles.feed}>
                {processedPosts.length > 0 ? (
                    processedPosts.slice(0, 15).map((post) => (
                        <div key={post.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '15px' }}>
                            <h3 style={{ textTransform: 'capitalize', color: '#333' }}>{post.title}</h3>
                            <p style={{ color: '#555' }}>{post.body}</p>
                            <Link to={`/feed/${post.id}`} style={{ display: 'inline-block', marginTop: '10px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                                Читати далі →
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className={appStyles.empty}>Нічого не знайдено за вашим запитом "{searchQuery}".</p>
                )}
            </div>
        </div>
    );
};

export default Feed;
