import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext({
  direction: "ltr",
  mode: "light",
  language: "en",
});

const ThemeContextProvider = function ({ children }) {
  const [mode, setMode] = useState("light");
  const [direction, setDirection] = useState("ltr");
  const [language, setLanguage] = useState("en");

  return (
    <ThemeContext.Provider
      value={{ mode, setMode, direction, setDirection, language, setLanguage }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;
