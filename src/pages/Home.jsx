import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../routes/paths";
import usePortfolio from "../hooks/usePortfolio";
import MainLayout from "../layouts/MainLayout";

const Home = function () {
  const { portfolio } = usePortfolio();
  return (
    <MainLayout>
      <div className="flex flex-col w-full min-h-screen justify-center items-center">
        <Link to={PATHS.portfolio} className="underline font-light">
          Portfolio
        </Link>
        <p>{JSON.stringify(portfolio)}</p>
      </div>
    </MainLayout>
  );
};

export default React.memo(Home);
