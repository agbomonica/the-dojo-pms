import { NavLink } from "react-router-dom";

// Styles & Images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__user">
          {/* Avatar & username */}
          <p>Hey, user</p>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__navlinks">
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="Dashboard Icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="create">
                <img src={AddIcon} alt="Add Project Icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
