import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../routes/paths";
import usePortfolio from "../hooks/usePortfolio";

const Home = function () {
  const { portfolio } = usePortfolio();
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <Link to={PATHS.portfolio} className="underline font-light">
        Portfolio
      </Link>
      <p>{JSON.stringify(portfolio)}</p>
    </div>
  );
};

export default React.memo(Home);
