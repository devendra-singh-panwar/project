// Dark.js

import React, { useEffect, useState } from "react";
import "./Dark.css";

export default function Dark() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load the dark mode preference from local storage
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    setDarkMode(darkModeEnabled);
  }, []);

  useEffect(() => {
    // Apply the dark mode class to the body element
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // Save the dark mode preference to local storage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
        {darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
}
