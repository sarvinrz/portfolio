import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PATHS from "../routes/paths";
import usePortfolio from "../hooks/usePortfolio";

const Home = function () {
  const { portfolio } = usePortfolio();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <Link to={PATHS.portfolio} className="underline font-light">
        {t("Portfolio")}
      </Link>
      <p>{JSON.stringify(portfolio)}</p>
    </div>
  );
};

export default React.memo(Home);
