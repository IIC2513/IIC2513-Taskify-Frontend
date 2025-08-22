import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </section>
    </main>
  );
}

