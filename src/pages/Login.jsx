import React, { useState } from "react";
import loginlogo from "@/assets/CoffitoLogo.png";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    const user_id = "12134";
    try {
      const response = await axios.post("/api/users", {
        username,
        password,
        user_id,
      });

      if (response.status === 200) {
        onLogin();
      }
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-parent flex flex-row justify-center items-center min-h-screen">
      <div className="loginlogo mr-[10%]">
        <img src={loginlogo} alt="Coffito Cafe" />
      </div>

      <div className="login-box">
        <h2 className="h2login">Login</h2>
        <div className="login-fields">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
              Username: <br />
              <input
                className="input-fields focus:outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            {usernameError && (
              <div className="error-message">{usernameError}</div>
            )}
            <br />
            <label>
              Password: <br />
              <input
                className="input-fields focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <br />
            <button className="login-btn rounded-md" type="submit">
              Log In
            </button>
            {error && (
              <div className="error-message mt-4 text-center">{error}</div>
            )}
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
