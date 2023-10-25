import React, { useCallback, useEffect } from "react";
import { BASE_URL } from "../config";
import PortfolioList from "../components/PortfolioList";
import useCoins from "../hooks/useCoins";
import AddPortfolioItemForm from "../components/AddPortfolioItemForm";

const Portfolio = function () {
  const { setCoins } = useCoins();

  const fetchCoinsData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/assets`, {
        headers: { "X-CoinAPI-Key": "ECDDB7CA-0DB5-48ED-9726-88DB6B26BB82" },
      });
      const parsedData = await response.json();

      setCoins(parsedData.slice(0, 10));
    } catch (e) {
      console.error(e);
    }
  }, [setCoins]);

  useEffect(() => {
    fetchCoinsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex container mx-auto max-w-4xl flex-row gap-4 justify-center items-start w-full">
      <div className="flex flex-row space-x-2 rtl:space-x-reverse items-center md:w-1/4 w-full">
        <div className="flex flex-col bg-indigo-200 text-indigo-800 dark:bg-gray-700  dark:text-white shadow-xl rounded-md p-4 space-y-4">
          <span className="flex flex-col space-y-1">
            <h3>Add New Asset</h3>
            <p className="text-sm font-light opacity-50">
              You can add new assets here.
            </p>
          </span>

          <AddPortfolioItemForm />
        </div>
      </div>
      <div className="flex flex-col bg-indigo-200 text-indigo-800  dark:bg-gray-700 dark:text-white shadow-xl rounded-md p-4 md:w-3/4 w-full">
        <h3 className="text-xl font-bold">Portfolio</h3>

        <PortfolioList />
      </div>
    </div>
  );
};

export default React.memo(Portfolio);
