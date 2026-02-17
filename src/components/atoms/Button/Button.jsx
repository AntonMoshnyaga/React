import styles from './Button.module.css';
// Використовуємо деструктуризацію пропсів
const Button = ({ children, onClick, variant = 'primary' })=> {
    return (
    <button
        className={`${styles.button} ${styles[variant]}`}
        onClick={onClick}>
        {children}
    </button>
    );
};
export default Button;