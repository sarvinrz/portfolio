import React from "react";
import PortfolioList from "../components/PortfolioList";
import AddPortfolioItemForm from "../components/AddPortfolioItemForm";
import { useTranslation } from "react-i18next";

const Portfolio = function () {
  const { t } = useTranslation();

  return (
    <div className="flex container mx-auto max-w-4xl flex-row gap-4 justify-center items-start w-full">
      <div className="flex flex-row space-x-2 rtl:space-x-reverse items-center md:w-1/4 w-full">
        <div className="flex flex-col bg-indigo-200 text-indigo-800 dark:bg-gray-700  dark:text-white shadow-xl rounded-md p-4 space-y-4">
          <span className="flex flex-col space-y-1">
            <h3>{t("Add New Asset")}</h3>
            <p className="text-sm font-light opacity-50">
              {t("You can add new assets here.")}
            </p>
          </span>

          <AddPortfolioItemForm />
        </div>
      </div>
      <div className="flex flex-col bg-indigo-200 text-indigo-800  dark:bg-gray-700 dark:text-white shadow-xl rounded-md p-4 md:w-3/4 w-full">
        <h3 className="text-xl font-bold">{t("Portfolio")}</h3>

        <PortfolioList />
      </div>
    </div>
  );
};

export default React.memo(Portfolio);
