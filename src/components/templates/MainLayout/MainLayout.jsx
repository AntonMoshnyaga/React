import { NavLink, Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

const MainLayout = () => {
    const getActiveClass = ({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
                <NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
                <NavLink to="/profile" className={getActiveClass}>Профіль</NavLink>
            </nav>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                Розроблено в рамках лабораторної роботи №4
            </footer>
        </div>
    );
};
export default MainLayout;
