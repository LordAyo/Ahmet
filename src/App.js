import React from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="laser-scan-v1"></div>
      <div className="laser-scan-v2"></div>
      <div className="laser-scan-h1"></div>
      <div className="laser-scan-h2"></div>
      <main className="app-container">
        <ProfileCard />
      </main>
    </div>
  );
}

export default App;
