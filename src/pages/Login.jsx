import React, { useState } from "react";
import loginlogo from "@/assets/CoffitoLogo.png";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateField = (field, value) => {
    if (!value.trim()) {
      return "This field is required.";
    }

    return "";
  };

  const validateForm = () => {
    const nextUsernameError = validateField("username", username);
    const nextPasswordError = validateField("password", password);

    setUsernameError(nextUsernameError);
    setPasswordError(nextPasswordError);

    return !nextUsernameError && !nextPasswordError;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "username") {
      setUsernameError(validateField(field, username));
    }

    if (field === "password") {
      setPasswordError(validateField(field, password));
    }
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
    if (touched.username) {
      setUsernameError(validateField("username", value));
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (touched.password) {
      setPasswordError(validateField("password", value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setTouched({ username: true, password: true });

    if (!validateForm()) {
      return;
    }

    const user_id = "12134";
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/users", {
        username,
        password,
        user_id,
      });

      if (response.status === 200) {
        onLogin();
      }
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 400) {
        setError("Username or password is incorrect. Please try again.");
      } else {
        setError("Cannot connect right now. Check your connection and try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-parent">
      <div className="login-shell" role="presentation">
        <section className="login-brand-panel" aria-hidden="true">
          <div className="login-brand-badge">Coffito</div>
          <img src={loginlogo} alt="" className="login-logo-img" />
          <p className="login-brand-copy">Coffee Shop POS for faster, smoother service.</p>
        </section>

        <section className="login-box" aria-labelledby="login-title">
          <h1 id="login-title" className="h2login">Welcome back</h1>
          <p className="login-subtitle">Sign in to Coffito POS using your staff account.</p>

          <form onSubmit={handleSubmit} className="login-fields" noValidate>
            {error && (
              <div className="login-error-banner" role="alert" aria-live="assertive">
                {error}
              </div>
            )}

            <div className="login-field-group">
              <label htmlFor="username" className="login-label">Username</label>
              <input
                id="username"
                className="input-fields"
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                onBlur={() => handleBlur("username")}
                autoComplete="username"
                aria-invalid={Boolean(usernameError)}
                aria-describedby={usernameError ? "username-error" : undefined}
              />
              {usernameError && (
                <p id="username-error" className="login-error-message" role="status" aria-live="polite">
                  {usernameError}
                </p>
              )}
            </div>

            <div className="login-field-group">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="login-password-wrap">
                <input
                  id="password"
                  className="input-fields login-password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  autoComplete="current-password"
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={passwordError ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="login-show-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="login-error-message" role="status" aria-live="polite">
                  {passwordError}
                </p>
              )}
            </div>

            <button className="login-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Log In"}
            </button>

            <p className="login-helper-copy">Authorized staff access only.</p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
