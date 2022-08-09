import { useState } from "react";

import { useSignup } from "../../hooks/useSignup";

// Styles
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { isPending, error, signup } = useSignup();

  const handleFileChange = function (e) {
    setThumbnail(null);
    let selected = e.target.files[0];

    // file validation rules
    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    // Measured in (Bytes)
    if (selected.size > 100000) {
      setThumbnailError("Image size must be less than 100KB");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    signup(email, password, displayName, thumbnail);
  };

  return (
    <form method="POST" className="form__auth" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        <span>Display Name:</span>
        <input
          type="text"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>

      <label>
        <span>Profile Thumbnail:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <p className="error">{thumbnailError}</p>}
      </label>

      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {!isPending && <button className="btn">Sign up</button>}

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Signup;
