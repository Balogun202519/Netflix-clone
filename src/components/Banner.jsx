import React from "react";

export default function Banner() {
  return (
    <div className="Banner">
      <div className="banner-overlay" />

      <div className="banner-content">
        <h1>Unlimited movies, TV shows, and more.</h1>

        <h2>Watch anywhere. Cancel anytime.</h2>

        <p>
          Ready to watch? Enter your email to create.
        </p>

        <div className="banner-form">
          <input type="email" placeholder="Email address" />

          <button>Get Started ▶</button>
        </div>
      </div>
    </div>
  );
}