import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  }

  return (
    <div className="signup-page">
      {/* Background overlay */}
      <div className="signup-overlay" />

      {/* Header */}
      <header className="signup-header">
        <h1 className="signup-logo">NETFLIX</h1>
      </header>

      {/* Form */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Sign Up
          </button>

          <div className="signup-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <span>Need help?</span>
          </div>

          <p className="signup-footer">
            Already have an account?
            <span> Sign in now.</span>
          </p>
        </form>
      </div>
    </div>
  );
}