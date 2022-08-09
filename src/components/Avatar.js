// Styles
import "./Avatar.css";

function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src} alt="User photo" />
    </div>
  );
}

export default Avatar;
