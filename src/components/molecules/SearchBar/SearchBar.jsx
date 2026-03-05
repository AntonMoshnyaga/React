import styles from './SearchBar.module.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Пошук постів..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchBar;
