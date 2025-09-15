import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    phone: string;
  };
}

interface ErrorResponse {
  message: string;
}

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validatePhone = (value: string): boolean => {
    const regex = /^[0-9]{9}$/; // exactly 9 digits
    return regex.test(value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validatePhone(phone)) {
      setError("O número deve ter exatamente 9 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data: LoginResponse | ErrorResponse = await response.json();

      if (response.ok && "token" in data) {
        localStorage.setItem("token", data.token);
        console.log("Login successful", data);
        navigate("/dashboard");
      } else {
        setError("message" in data ? data.message : "Login failed");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app login-container">
      <div className="login-content">
        <h1>Log In</h1>
        <p>Entre com o seu número de telefone (9 dígitos).</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="phone">Nº de Telefone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // only digits
                setPhone(val);
              }}
              maxLength={9}
              required
              placeholder="Ex: 923456789"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite a sua senha"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || !phone || !password}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <p>
          Ainda não tem conta? <a href="/signup">Registe-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
