import "./Navbar.css"
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-dot" aria-hidden="true" />
        <Link to="/" className="link-logo">Taskify</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="link">Tareas</Link></li> 
        <li><Link to="/login" className="link">Login</Link></li>
        <li><Link to="/register" className="link">Register</Link></li>
        {/* 
        <li className="link">Login </li>
        <li className="link">Register</li>
        */}
      </ul>
    </nav>
  );
}

{/* 
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-dot" aria-hidden="true" />
        <Link to="/" className="link-logo">Taskify</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="link">Tareas</Link></li> 
        <li className="link">Login </li>
        <li className="link">Register</li>
      </ul>
    </nav>
  );
}
*/}

