import { useContext } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";

const usePortfolio = function () {
  const portfolioContext = useContext(PortfolioContext);
  const { addItem, removeItem, portfolio } = portfolioContext;

  return { addItem, removeItem, portfolio };
};

export default usePortfolio;
