import React, { useState, useReducer, useCallback, useEffect } from "react";
import Input from "../components/Input";
import formReducer from "../reducers/formReducer";
import Select from "../components/Select";
import { BASE_URL } from "../config";
import usePortfolio from "../hooks/usePortfolio";
import PortfolioList from "../components/PortfolioList";
import useCoins from "../hooks/useCoins";

const initialState = {
  symbol: "",
  price: 0,
  amount: 0,
};

const Portfolio = function () {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const { addItem } = usePortfolio();

  // const [coins, setCoins] = useState([]);

  const { coins, setCoins } = useCoins();

  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    dispatch({ type: "UPDATE_FIELD", field: name, value });
  }, []);

  const fetchCoinsData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/v1/assets`, {
        headers: { "X-CoinAPI-Key": "ECDDB7CA-0DB5-48ED-9726-88DB6B26BB82" },
      });
      const parsedData = await response.json();

      setCoins(parsedData.slice(0, 10));

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }, [setCoins]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      const { symbol, price, amount } = formState;

      if (symbol && price && amount) {
        addItem({
          symbol,
          price,
          amount,
        });
      }
    },
    [addItem, formState]
  );

  console.log(coins);

  useEffect(() => {
    fetchCoinsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white bg-indigo-700 min-h-screen w-full">
      <div className="flex container mx-auto max-w-4xl flex-row gap-4 justify-center items-start w-full">
        <div className="flex flex-row space-x-2 rtl:space-x-reverse items-center md:w-1/4 w-full">
          <div className="flex flex-col bg-indigo-200 text-indigo-800 shadow-xl rounded-md p-4 space-y-4">
            <span className="flex flex-col space-y-1">
              <h3>Add New Asset</h3>
              <p className="text-sm font-light opacity-50">
                You can add new assets here.
              </p>
            </span>
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col space-y-2"
            >
              <Select
                name="symbol"
                loading={loading}
                setValue={handleInputChange}
                options={
                  coins
                    ? coins.map((c) => ({
                        value: c.asset_id,
                        label: c.name,
                      }))
                    : []
                }
              />

              <Input
                name="price"
                placeholder="Price"
                value={formState["price"]}
                setValue={handleInputChange}
              />
              <Input
                name="amount"
                placeholder="Amount"
                value={formState["amount"]}
                setValue={handleInputChange}
              />
              <button
                type="submit"
                className="p-2 text-center w-full rounded-xl shadow-sm bg-indigo-800 hover:bg-indigo-900 focus:ring focus:ring-indigo-500 text-indigo-200"
              >
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col bg-indigo-200 text-indigo-800 shadow-xl rounded-md p-4 md:w-3/4 w-full">
          <h3 className="text-xl font-bold">Portfolio</h3>

          <PortfolioList />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Portfolio);
