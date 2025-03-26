"use client";

import HomeComponent from "../app/components/Home";

export default function Home() {
  return (
    <div>
      <HomeComponent />

      {/* 404 Error Page */}
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" className="go-home">Go to Home</a>
      </div>
    </div>
  );
}
