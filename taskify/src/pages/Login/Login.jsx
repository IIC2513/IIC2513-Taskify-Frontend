import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from '../../auth/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
  const response = await login(form);
  // login() ya guarda token y user en localStorage y context
  navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Usuario o contraseña incorrecta");
    }
  };

  return (
    <main className="login-wrap">
      <section className="login-card">
        {/* ← Volver */}
        <nav className="page-back">
          <button
            type="button"
            className="back-link"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </nav>

        <h1 className="login-title">Iniciar sesión</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="fld">
            <span className="fld-label">Username</span>
            <input
              className="fld-input"
              type="text"
              name="username"
              placeholder="Tu usuario"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </label>

          <label className="fld">
            <span className="fld-label">Password</span>
            <input
              className="fld-input"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="error-msg">{error}</p>}
          <p>¿No tienes sesión? <a href="/register" className="register-link">¡Regístrate!</a></p>

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </section>
    </main>
  );
}
