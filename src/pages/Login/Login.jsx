import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (email.trim() !== "") {
            setIsLoading(true);
            try {
                await login(email);
                navigate("/profile", { replace: true });
            } catch (error) {
                alert("Помилка при спробі входу");
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("Будь ласка, введіть електронну пошту!");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "white" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Вхід в систему</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Електронна пошта"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введіть ваш Email..."
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Завантаження..." : "Увійти"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
