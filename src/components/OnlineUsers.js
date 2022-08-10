// Hooks
import { useCollection } from "../hooks/useCollection";

// Components
import Avatar from "./Avatar";

// Styles
import "./OnlineUsers.css";

function OnlineUsers() {
  const { documents, error } = useCollection("users");
  return (
    <div className="user__list">
      <h2>All users</h2>

      {error && <div className="error">{error}</div>}

      {documents &&
        documents.map((user) => {
          return (
            <div key={user.id} className="user__list-item">
              {user.online && <span className="user__online"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          );
        })}
    </div>
  );
}

export default OnlineUsers;
