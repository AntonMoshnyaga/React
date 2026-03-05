import { useState } from 'react';
import Post from './components/molecules/Post/Post';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import { postsData, students } from './data';
import styles from './App.module.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // States for Lab 4: Conditional Rendering
  const [showHelp, setShowHelp] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  // Logic for posts
  const filteredPosts = postsData.filter(post => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Logic for students
  const activeStudents = students.filter(student => student.isActive);
  const totalScore = activeStudents.reduce((sum, student) => sum + (student.score || 0), 0);
  const averageScore = activeStudents.length ? (totalScore / activeStudents.length).toFixed(2) : 0;

  const studentsToDisplay = filterActive
    ? students.filter(student => student.score && student.score >= 60)
    : students;

  return (
    <div className={styles.appContainer}>
      <h1 style={{ textAlign: 'center' }}>Умовне відображення</h1>

      {/* Help section */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button className={styles.toggleBtn} onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Приховати інструкцію" : "Показати інструкцію"}
        </button>
        {showHelp && <p className={styles.helpText}>Довідка: Дозволяє керувати списками студентів та новинами.</p>}
      </div>

      {/* Tabs navigation */}
      <div className={styles.tabsMenu}>
        <button
          className={activeTab === 'list' ? `${styles.tabBtn} ${styles.activeTab}` : styles.tabBtn}
          onClick={() => setActiveTab('list')}
        >
          Всі студенти
        </button>
        <button
          className={activeTab === 'stats' ? `${styles.tabBtn} ${styles.activeTab}` : styles.tabBtn}
          onClick={() => setActiveTab('stats')}
        >
          Статистика
        </button>
        <button
          className={activeTab === 'about' ? `${styles.tabBtn} ${styles.activeTab}` : styles.tabBtn}
          onClick={() => setActiveTab('about')}
        >
          Про автора
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>

        {activeTab === 'list' && (
          <div className={styles.contentSection}>
            <h2>Список студентів</h2>
            <button className={styles.toggleBtn} onClick={() => setFilterActive(!filterActive)}>
              {filterActive ? "Показати всіх" : "Показати тільки успішних"}
            </button>

            {studentsToDisplay.length > 0 ? (
              <ul className={styles.studentList}>
                {studentsToDisplay.map((student) => (
                  <li
                    key={student.id}
                    style={{
                      color: student.isActive ? 'black' : 'gray',
                      textDecoration: student.isActive ? 'none' : 'line-through',
                    }}
                  >
                    <strong>{student.name}</strong> — {' '}
                    <span style={{ color: (student.score ?? 0) >= 60 ? 'green' : 'red' }}>
                      {student.score ?? "Оцінка відсутня"}
                      {student.score != null ? (student.score >= 60 ? ' (Зараховано)' : ' (Незараховано)') : ''}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>За вашим запитом нікого не знайдено</p>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className={styles.contentSection}>
            <h2>Статистика студентів</h2>
            <p>Середній бал активних студентів: <strong>{averageScore}</strong></p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className={styles.contentSection}>
            <h2>Стрічка новин</h2>
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
                  <Post key={post.id} {...post} />
                ))
              ) : (
                <p className={styles.empty}>Нічого не знайдено за вашим запитом.</p>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
