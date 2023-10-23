import { useState, createContext } from "react";
import PropType from "prop-types";

export const CoinsContext = createContext([]);

export const CoinsContextProvider = function ({ children }) {
  const [coins, setCoins] = useState([]);

  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

CoinsContextProvider.propTypes = {
  children: PropType.node.isRequired,
};
