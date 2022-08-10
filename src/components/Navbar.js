// Hooks
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// Styles & Images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

function Navbar() {
  const { isPending, logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header className="header">
      <ul className="header__nav-list">
        <li className="header__logo">
          <img src={Temple} alt="Dojo Logo" />
          <span>The Dogo</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="login">Login</Link>
            </li>

            <li>
              <Link to="signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
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
        )}
      </ul>
    </header>
  );
}

export default Navbar;
