import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '72px', color: '#dc3545', margin: '0' }}>404</h1>
            <h2>Сторінку не знайдено</h2>
            <p>Вибачте, шлях за яким ви перейшли не існує.</p>
            <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                Повернутися на Головну
            </Link>
        </div>
    );
};

export default NotFound;
