import React, { FC, useEffect } from "react";
import "../DarkAndLightMode/DarkAndLightMode.css";
import { useSelector, useDispatch } from "react-redux";
import { AppType } from "../../../Type/Type";
import { darkAndLightModeAction } from "../../../Actions/actionsApp";

export type DarkAndLightModeProps = {
  toggleTheme?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const DarkAndLightMode: FC<DarkAndLightModeProps> = () => {
  //state redux
  const selectTheme = (state: AppType) => state.appState.theme;
  const theme = useSelector(selectTheme);

  //actions redux
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      dispatch(darkAndLightModeAction("dark"));
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      window.localStorage.setItem("theme", "light");
      dispatch(darkAndLightModeAction("light"));
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      dispatch(darkAndLightModeAction(localTheme));
      document.documentElement.setAttribute("data-theme", localTheme);
    }
  }, [dispatch]);

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
