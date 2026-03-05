import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
    const navigate = useNavigate();

    const handleSave = () => {
        // Імітація збереження налаштувань
        alert("Налаштування успішно збережено!");
        // Програмне перенаправлення на головну сторінку
        navigate('/');
    };

    return (
        <div>
            <h2>Налаштування профілю</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Отримувати сповіщення:</label>
                    <input type="checkbox" defaultChecked /> Так
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Тема оформлення:</label>
                    <select style={{ padding: '8px', width: '100%' }}>
                        <option>Світла</option>
                        <option>Темна</option>
                        <option>Системна</option>
                    </select>
                </div>
                <button
                    onClick={handleSave}
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Зберегти налаштування
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
