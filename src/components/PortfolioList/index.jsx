import React from "react";
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioItem from "./PortfolioItem";

const PortfolioList = function () {
  const { portfolio } = usePortfolio();

  if (portfolio?.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center">
        There are no items in your portfolio.
      </div>
    );
  }

  return (
    <ul className="flex flex-col space-y-4 p-1">
      {portfolio.map(({ amount, price, symbol }) => (
        <PortfolioItem
          key={symbol}
          amount={amount}
          price={price}
          symbol={symbol}
        />
      ))}
    </ul>
  );
};

export default React.memo(PortfolioList);
