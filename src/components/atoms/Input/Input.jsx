import styles from './Input.module.css';
function Input({ type = 'text', placeholder = '', label }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input