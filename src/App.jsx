import Button from './components/atoms/Button/Button';
import Input from './components/atoms/Input/Input'; // Ваш компонент
import Card from './components/molecules/Card/Card';

function App() {
  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f2f5' 
    }}>
      <Card>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          Ласкаво просимо
        </h2>

        <div style={{ marginBottom: '15px' }}>
          {/* Використовуйте ваш компонент Input тут */}
          <Input type="email" placeholder="Email" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          {/* Використовуйте ваш компонент Input тут */}
          <Input type="password" placeholder="Пароль" />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px',
          justifyContent: 'center' 
        }}>
          <Button onClick={handleLogin} variant="primary">
            Увійти
          </Button>
          <Button variant="secondary">
            Реєстрація
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
