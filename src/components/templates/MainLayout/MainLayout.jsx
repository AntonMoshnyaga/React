import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useCartStore from '../../../store/useCartStore';

const MainLayout = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const totalQuantity = useCartStore(state => state.totalQuantity);
    const navigate = useNavigate();
    
    // Використання кастомного хука для збереження теми в localStorage
    const [theme, setTheme] = useLocalStorage('app-theme', 'light');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getActiveClass = ({ isActive }) => {
        return isActive ? 'nav-link active' : 'nav-link';
    };

    const isLight = theme === 'light';

    return (
        <div style={{ 
            fontFamily: 'sans-serif', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: isLight ? '#f9f9f9' : '#121212',
            color: isLight ? '#333' : '#f1f1f1',
            transition: 'all 0.3s ease'
        }}>
            <header style={{ 
                background: isLight ? '#282c34' : '#1a1a1a', 
                color: 'white', 
                padding: '15px 30px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ margin: 0, fontSize: '24px' }}>MyReactApp</h1>
                <nav style={{ display: 'flex', gap: '20px' }}>
                    <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
                    <NavLink to="/students" className={getActiveClass}>Студенти</NavLink>
                    <NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
                    <NavLink to="/profile" className={getActiveClass}>Профіль</NavLink>
                    <NavLink to="/store" className={getActiveClass}>Магазин</NavLink>
                    
                    <NavLink to="/store" style={{ position: 'relative', textDecoration: 'none', color: 'inherit' }}>
                        🛒 
                        {totalQuantity > 0 && (
                            <span style={{ 
                                position: 'absolute', 
                                top: '-8px', 
                                right: '-12px', 
                                background: '#e74c3c', 
                                color: 'white', 
                                borderRadius: '50%', 
                                padding: '2px 6px', 
                                fontSize: '10px',
                                fontWeight: 'bold'
                            }}>
                                {totalQuantity}
                            </span>
                        )}
                    </NavLink>
                </nav>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {/* Кнопка перемикання теми */}
                    <button 
                        onClick={() => setTheme(isLight ? 'dark' : 'light')}
                        style={{ background: 'none', border: '1px solid white', color: 'white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {isLight ? '🌙' : '☀️'}
                    </button>

                    {isAuthenticated ? (
                        <>
                            <span style={{ fontSize: '14px' }}>Welcome, {user?.email}</span>
                            <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Вийти</button>
                        </>
                    ) : (
                        <NavLink to="/login" style={{ textDecoration: 'none', background: '#3498db', color: 'white', padding: '8px 15px', borderRadius: '4px' }}>Логін</NavLink>
                    )}
                </div>
            </header>

            <main style={{ flex: 1, padding: '30px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <Outlet />
            </main>

            <footer style={{ background: isLight ? '#ddd' : '#222', padding: '15px', textAlign: 'center', marginTop: 'auto', color: isLight ? '#666' : '#bbb' }}>
                &copy; 2024 MyReactApp. Всі права захищені.
            </footer>
        </div>
    );
};

export default MainLayout;
