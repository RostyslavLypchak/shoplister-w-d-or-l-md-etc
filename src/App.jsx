import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShoppingListsOverview from "./components/ShoppingListsOverview";
import ShoppingListDetail from "./components/ShoppingListDetail";
import { useTranslation } from "react-i18next"; // Importing i18next
import "./styles.css";
import './i18n'; // Import the i18n.js configuration file

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        <h1>{t("title")}</h1>
        <button onClick={toggleTheme} className="btn btn-primary">
          {isDarkMode ? t("lightMode") : t("darkMode")}
        </button>
        <button onClick={() => changeLanguage("en")} className="btn btn-secondary">
          English
        </button>
        <button onClick={() => changeLanguage("es")} className="btn btn-secondary">
          Čeština
        </button>

        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <div className="home-page">
                <h2>{t("welcome")}</h2>
                <button className="btn btn-primary">
                  <Link to="/lists" style={{ color: "white", textDecoration: "none" }}>
                    {t("openApp")}
                  </Link>
                </button>
              </div>
            }
          />
          {/* Shopping Lists Overview Route */}
          <Route path="/lists" element={<ShoppingListsOverview />} />
          {/* Individual Shopping List Route */}
          <Route path="/lists/:id" element={<ShoppingListDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
