import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from './MainLayout.module.css';

const MainLayout = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const getActiveClass = ({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
                    <NavLink to="/students" className={getActiveClass}>Студенти</NavLink>
                    <NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
                    <NavLink to="/profile" className={getActiveClass}>Профіль</NavLink>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isAuthenticated ? (
                        <>
                            <span style={{ color: 'white' }}>Привіт, {user?.email}</span>
                            <button onClick={handleLogout} className={styles.link} style={{ background: 'transparent', border: '1px solid white', cursor: 'pointer' }}>Вийти</button>
                        </>
                    ) : (
                        <NavLink to="/login" className={getActiveClass}>Увійти</NavLink>
                    )}
                </div>
            </nav>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                Розроблено в рамках лабораторної роботи №4 та №5
            </footer>
        </div>
    );
};
export default MainLayout;
