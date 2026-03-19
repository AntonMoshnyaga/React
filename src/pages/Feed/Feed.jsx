import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import appStyles from '../../App.module.css';

const Feed = () => {
    // Викликаємо наш кастомний хук
    const {
        data: posts,
        isLoading,
        error,
    } = useFetch("https://jsonplaceholder.typicode.com/posts");

    const [searchTerm, setSearchTerm] = useState('');

    // 1. Стан завантаження
    if (isLoading) {
        return (
            <div className={appStyles.contentSection} style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Завантаження новин...</h2>
                <div style={{ animation: 'spin 1s linear infinite', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto' }}></div>
            </div>
        );
    }

    // 2. Стан помилки
    if (error) {
        return (
            <div className={appStyles.contentSection}>
                <h2 style={{ color: 'red' }}>Сталася помилка: {error}</h2>
            </div>
        );
    }

    // Пошук
    const filteredPosts = posts ? posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // 3. Стан успішного завантаження (Data)
    return (
        <div className={appStyles.contentSection}>
            <h2>Стрічка новин (API JSONPlaceholder)</h2>
            
            <input 
                type="text" 
                placeholder="Пошук новин..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <div className={appStyles.feed}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.slice(0, 15).map((post) => (
                        <div key={post.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '15px' }}>
                            <h3 style={{ textTransform: 'capitalize', color: '#333' }}>{post.title}</h3>
                            <p style={{ color: '#555' }}>{post.body}</p>
                            {/* Посилання на сторінку конкретного поста */}
                            <Link to={`/feed/${post.id}`} style={{ display: 'inline-block', marginTop: '10px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                                Читати далі →
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className={appStyles.empty}>Нічого не знайдено за вашим запитом.</p>
                )}
            </div>
        </div>
    );
};

export default Feed;
