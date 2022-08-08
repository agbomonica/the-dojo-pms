import { Link } from "react-router-dom";

// Styles & Images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

function Navbar() {
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
          <button className="btn">Logout</button>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
