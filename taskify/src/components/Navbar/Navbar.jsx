import "./Navbar.css"
import { Link } from 'react-router-dom';

export default function Navbar() {

  const user = localStorage.getItem("user");

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-dot" aria-hidden="true" />
        <Link to="/" className="link-logo">Taskify</Link>
      </div>
      <ul className="nav-links">
        {!user && (
          <>
            <li><Link to="/login" className="link">Login</Link></li>
            <li><Link to="/register" className="link">Register</Link></li>
          </>
        )}

        {user && (
          <li><Link to="/logout" className="link">Cerrar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
}
