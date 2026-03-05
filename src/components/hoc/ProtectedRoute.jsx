import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        // replace: true є критично важливим для чистоти історії браузера
        return <Navigate to={redirectPath} replace />;
    }

    // Якщо компонент має children, рендеримо їх, інакше рендеримо Outlet для вкладених маршрутів
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
