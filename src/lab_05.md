# Практична робота: Створення системи автентифікації (Лаб №5)

## Фрагменти коду

### Конфігурація AuthContext.jsx
```javascript
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Реалізація компонента ProtectedRoute.jsx
```javascript
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
```

---

## Відповіді на контрольні запитання

1. **Яку архітектурну проблему (пов'язану з передачею пропсів) вирішує використання Context API?**
   Context API вирішує проблему *Prop Drilling* (або "прокидання пропсів") — ситуації, коли дані необхідно передавати через довгий ланцюжок проміжних компонентів, яким ці дані насправді не потрібні, тільки для того, щоб доставити їх компоненту, що знаходиться на кілька рівнів вкладеності глибше в дереві. Context дозволяє "транслювати" дані глобально на весь додаток і підписуватися на них лише там, де вони дійсно потрібні (`useContext`).

2. **Чому для глобального управління станом у складних додатках іноді обирають Redux/Zustand замість вбудованого Context API?**
   - **Продуктивність:** Коли значення в `Context.Provider` змінюється, *всі* компоненти, які використовують цей `useContext`, автоматично перерендерюються, навіть якщо вони використовують лише частину об'єкта стану. Бібліотеки на кшталт Redux або Zustand оптимізовані: вони дозволяють підписуватися лише на конкретні шматочки стану, уникаючи зайвих рендерів.
   - **Складність та структура:** Redux дає жорстку архітектуру (Action -> Reducer -> Store), що значно полегшує відстеження того, хто, коли і чому змінив стан. Також Redux має потужні інструменти налаштування, такі як Redux DevTools для "мандрівок у часі" (Time Travel Debugging).

3. **Яка роль патерна Higher-Order Component (HOC) при реалізації захищених маршрутів (Protected Routes)?**
   HOC (компонент вищого порядку) у випадку роутингу (як `ProtectedRoute`) виконує роль "охоронця" (Guard Component). Він "огортає" цільовий компонент або групу маршрутів (`Outlet`), читає стан із AuthContext і приймає рішення перед тим, як показати контент:
   - Якщо авторизований → відмальовує Children.
   - Якщо ні → зупиняє відображення і примусово виконує `Navigate`. 
   Це дозволяє не дублювати перевірку `if(!isAuth)` на кожній окремій сторінці.

4. **Чому при перенаправленні неавторизованого користувача використовується властивість `replace: true` у компоненті `Navigate`? (Поясніть вплив на стек історії браузера).**
   Браузер зберігає всі переходи сторінками у стеку історії (History API). Коли ми робимо звичайний перехід (`replace: false`), URL додається у стек як новий запис. 
   Якщо неавторизований користувач зайде на `/profile` і його звичайно перекине на `/login`, стек виглядатиме як `[/profile, /login]`. Тоді, якщо на логіні натиснути кнопку "Назад" у браузері, користувач повернеться на `/profile`, його знову перевірить HOC і **знову відкине** на `/login`. Це створить неприємний нескінченний цикл. Властивість `replace: true` замінює *поточний* запис (`/profile`) на новий (`/login`), переписуючи історію так, наче він зразу потрапив на `/login`.
