import React, { FC, useState, useEffect } from "react";
import "../DarkAndLightMode/DarkAndLightMode.css";

export type DarkAndLightModeProps = {
  toggleTheme?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const DarkAndLightMode: FC<DarkAndLightModeProps> = () => {
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.setAttribute("data-theme", localTheme);
    }
  }, []);

  return (
    <button
      onClick={() => toggleTheme()}
      className="toggle_theme"
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      <i
        className="fas fa-adjust fa-2x"
        style={{ color: theme === "dark" ? "white" : "black" }}
      ></i>
      <p className="theme_title">
        {theme === "dark" ? "Light theme" : "Dark theme"}
      </p>
    </button>
  );
};

export default DarkAndLightMode;
