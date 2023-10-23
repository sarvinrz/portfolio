import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = function () {
  const themeContext = useContext(ThemeContext);
  const { mode, direction, language, setMode, setDirection, setLanguage } =
    themeContext;

  return { mode, direction, language, setMode, setDirection, setLanguage };
};

export default useTheme;
