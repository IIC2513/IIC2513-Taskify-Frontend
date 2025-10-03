import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from '../../auth/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        e.preventDefault();
    setError("");

    try {
        const response = await register(form);
        // register() intentará guardar token/user si están disponibles
        if (window.confirm('Registro exitoso. ¿Quieres ir al inicio? Pulsa Aceptar para navegar.')) {
          navigate('/');
        } else {
          console.log('Registro completado, staying on register page for inspection.');
        }
    } catch (err) {
      console.error("Login error:", err);
      setError("No se pudo registrar correctamente");
    }
  };

  return (
    <main className="register-wrap">
      <section className="register-card">
        <nav className="page-back">
          <button
            type="button"
            className="back-link"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </nav>

        <h1 className="register-title">Crear cuenta</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="fld">
            <span className="fld-label">Username</span>
            <input
              className="fld-input"
              type="text"
              name="username"
              placeholder="Nuevo usuario"
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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="register-btn">Registrarme</button>
        </form>
      </section>
    </main>
  );
}
