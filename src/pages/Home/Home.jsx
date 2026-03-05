import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <h1>Вітаємо у нашому додатку!</h1>
            <p>Це головна сторінка. Ви можете перейти до стрічки новин або профілю.</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <Link to="/feed" style={{ padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Перейти до стрічки</Link>
                <Link to="/profile" style={{ padding: '10px 20px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Мій профіль</Link>
            </div>
        </div>
    );
};

export default Home;
