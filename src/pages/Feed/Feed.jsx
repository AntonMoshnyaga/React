import { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/molecules/Post/Post';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import { postsData } from '../../data';
import appStyles from '../../App.module.css';

const Feed = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = postsData.filter(post => {
        const matchesSearch =
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={appStyles.contentSection}>
            <h2>Стрічка новин</h2>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className={appStyles.filters}>
                {['All', 'News', 'Updates'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={activeCategory === cat ? appStyles.active : ''}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={appStyles.feed}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                            <Post {...post} />
                            <Link to={`/feed/${post.id}`} style={{ display: 'inline-block', marginTop: '10px', color: '#007bff', textDecoration: 'none' }}>Читати далі →</Link>
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
