import { useState } from 'react';
import Post from './components/molecules/Post/Post';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import { postsData, students } from './data';
import styles from './App.module.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = postsData.filter(post => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const activeTopStudents = students.filter(
    (student) => student.isActive && student.score > 60
  );

  const activeStudents = students.filter(student => student.isActive);
  const totalScore = activeStudents.reduce((sum, student) => sum + student.score, 0);
  const averageScore = activeStudents.length ? (totalScore / activeStudents.length).toFixed(2) : 0;

  const sortedStudents = [...students].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.appContainer}>
      <h1 style={{ textAlign: 'center' }}>Стрічка з фільтрацією</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className={styles.filters}>
        {['All', 'News', 'Updates'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? styles.active : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.feed}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id} // КРИТИЧНО ВАЖЛИВО!
              author={post.author}
              content={post.content}
              date={post.date}
              avatar={post.avatar}
            />
          ))
        ) : (
          <p className={styles.empty}>Нічого не знайдено за вашим запитом.</p>
        )}
      </div>

      <hr />

      <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Статистика студентів</h1>

      <h3>Загальний список студентів (Атрибут key)</h3>
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            style={{
              color: student.isActive ? 'black' : 'gray',
              textDecoration: student.isActive ? 'none' : 'line-through',
            }}
          >
            {student.name} - {student.score} балів
          </li>
        ))}
      </ul>

      <h3>Сортований список (за спаданням балів)</h3>
      <ul>
        {sortedStudents.map((student) => (
          <li key={student.id}>
            {student.name} - {student.score} балів
          </li>
        ))}
      </ul>

      <h3>Активні студенти (Бал &gt; 60, Метод filter)</h3>
      <ul>
        {activeTopStudents.map((student) => (
          <li key={student.id}>
            {student.name} - {student.score} балів
          </li>
        ))}
      </ul>

      <h3>Агрегація даних (Метод reduce)</h3>
      <p>Середній бал активних студентів: <strong>{averageScore}</strong></p>

    </div>
  );
}

export default App;
