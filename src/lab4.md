# Лабораторна робота №4: Розробка багатосторінкової навігації

## Посилання
- **GitHub Репозиторій**: (Вставте посилання)
- **Розгорнута версія (Vercel/GitHub Pages)**: (Вставте посилання)

## Опис структури маршрутів (Обґрунтування вибору)
Після інтеграції `react-router-dom` в додаток було обрано архітектуру на базі Layout (макета).

Усі загальні компоненти додатку (навігація `nav`, підвал `footer`) винесені до `MainLayout`. Використовуючи дочірні маршрути (підхід `<Route path="/" element={<MainLayout />}>`), ми дозволяємо всьому контенту всередині додатка рендеритись у компоненті `<Outlet />` макета. 
Це дає перевагу у продуктивності: загальні компоненти навігації не перерендеровуються при переході між сторінками. 

Для маршруту `Profile` використано вкладені маршрути (символ `*` у шляху: `"profile/*"`). Це зроблено з метою декомпозиції — сторінка профілю сама вирішує, яка в неї буде внутрішня навігація (підрозділи `ProfileOverview` і `ProfileSettings`), не забруднюючи загальний `App.jsx`.

---

## Фрагменти коду

### Конфігурація Routes та BrowserRouter
```javascript
// main.jsx
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// App.jsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="feed" element={<Feed />} />
    <Route path="feed/:postId" element={<PostPage />} />
    <Route path="profile/*" element={<Profile />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

### Реалізація Layout із компонентом Outlet
```javascript
// MainLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
      <div className={styles.wrapper}>
        <nav className={styles.navbar}>
           {/* Навігація... */}
        </nav>
        <main className={styles.mainContent}>
          <Outlet /> {/* Заповнювач контенту */}
        </main>
        <footer>...</footer>
      </div>
    );
};
```

### Логіка обробки параметрів через useParams
```javascript
// PostPage.jsx
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const { postId } = useParams();
    const post = postsData.find(p => p.id === Number(postId));
    
    if (!post) return <div>Пост із ID {postId} не знайдено.</div>;
    // ...
```

### Приклад програмної навігації через useNavigate
```javascript
// ProfileSettings.jsx
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
    const navigate = useNavigate();

    const handleSave = () => {
        alert("Налаштування успішно збережено!");
        navigate('/'); // Перенаправлення
    };
    // ...
```

---

## Відповіді на контрольні запитання

1. **Фундаментальна різниця між клієнтською та серверною маршрутизацією:**
   Серверна маршрутизація відправляє запит на бекенд і перезавантажує всю сторінку з новим HTML-кодом на кожне посилання. Клієнтська маршрутизація (SPA) перехоплює зміну URL, не перезавантажує сторінку, а просто за допомогою JavaScript та Virtual DOM замінює потрібний контент (компоненти React) на екрані.

2. **Роль атрибута index:**
   Атрибут `index` використовується для вкладених маршрутів і вказує React Router'у, який дочірній маршрут потрібно відобразити в `<Outlet>`, якщо шлях точно такий, як базовий шлях батьківського `Route`. Наприклад, для `path="/"`, `Route index` відрендерить `<Home />`.

3. **Чому використовувати useNavigate, а не Link для обробників подій?**
   `<Link>` створює тег `<a>` і призначений виключно для кліків (переходів) користувача. `useNavigate` повертає функцію, яку можна викликати **імперативно** всередині логіки: наприклад, після відправки форми, успішної авторизації чи виконання API-запитів. `<Link>` виконати це не може.

4. **Як реалізувати динамічне підсвічування активних посилань?**
   Користуючись компонентом `<NavLink>`, який вміє передавати об'єкт `{ isActive }` у властивість `className` або `style`. Якщо посилання відповідає поточному URL, `isActive` набуває значення `true`. Зручно використовувати функцію `({isActive}) => isActive ? 'active' : ''`.

5. **Що таке "catch-all" маршрут і де його розміщувати?**
   Це маршрут із `path="*"`. Він спрацьовує, якщо жоден з інших маршрутів вище нього не підійшов. Його використовують для сторінки помилки (404 Page). Розміщувати його потрібно **завжди в самому кінці** списку маршрутів.
