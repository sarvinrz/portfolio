import { useState, createContext, useCallback } from "react";
import PropType from "prop-types";

export const PortfolioContext = createContext([]);

export const PortfolioContextProvider = function ({ children }) {
  const [portfolio, setPortfolio] = useState([]);

  const addItem = useCallback((item) => {
    setPortfolio((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((item) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== item.id));
  }, []);

  return (
    <PortfolioContext.Provider value={{ addItem, removeItem, portfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

PortfolioContextProvider.propTypes = {
  children: PropType.node.isRequired,
};
