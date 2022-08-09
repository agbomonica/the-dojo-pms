import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

// Styles & Images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

function Navbar() {
  const { isPending, logout } = useLogout();

  return (
    <header className="header">
      <ul className="header__nav-list">
        <li className="header__logo">
          <img src={Temple} alt="Dojo Logo" />
          <span>The Dogo</span>
        </li>

        <li>
          <Link to="login">Login</Link>
        </li>

        <li>
          <Link to="signup">Signup</Link>
        </li>

        <li>
          {isPending && (
            <button className="btn" disabled>
              Logging out
            </button>
          )}

          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
