import { useState } from "react";

import { useLogin } from "../../hooks/useLogin";

// Styles
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, error, login } = useLogin();

  const handleSubmit = function (e) {
    e.preventDefault();

    login(email, password);
  };
  return (
    <form method="POST" className="form__auth" onSubmit={handleSubmit}>
      <h2>Log In</h2>

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

      {isPending && (
        <button className="btn" disabled>
          Logging In...
        </button>
      )}
      {!isPending && (
        <button className="btn" onClick={login}>
          Log In
        </button>
      )}

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Login;
