import React, { useCallback, useReducer, useMemo } from "react";
import Select from "../Select";
import Input from "../Input";
import formReducer from "../../reducers/formReducer";
import usePortfolio from "../../hooks/usePortfolio";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import fetcher from "../../utils/fetcher";
import toEnglishDigits from "../../utils/toEnglishDigits";
import toFarsiNumber from "../../utils/toFarsiDigits";

const initialState = {
  symbol: "",
  price: "",
  amount: 0,
};

const AddPortfolioItemForm = function () {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const { addItem } = usePortfolio();
  const { t } = useTranslation();
  const { data: coins, isLoading } = useQuery(["/v2/tokens"], fetcher);

  const slicedCoins = useMemo(() => {
    if (coins) return coins.slice(0, 10);
  }, [coins]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: toEnglishDigits(value),
    });
  }, []);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const { symbol, amount, price } = formState;
      if (!symbol || !amount || !price) {
        console.error("All Field's are required!");
        return;
      }
      addItem({
        symbol,
        price,
        amount,
      });
    },
    [addItem, formState]
  );

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col space-y-2">
      <Select
        name="symbol"
        loading={isLoading}
        setValue={handleInputChange}
        options={
          slicedCoins
            ? slicedCoins.map((c) => ({ value: c.symbol, label: c.name }))
            : []
        }
      />
      <Input
        name="price"
        placeholder="Price"
        value={toFarsiNumber(formState.price)}
        setValue={handleInputChange}
      />
      <Input
        name="amount"
        placeholder="Amount"
        value={toFarsiNumber(formState.amount)}
        setValue={handleInputChange}
      />
      <button
        type="submit"
        className="p-2 text-center w-full rounded-xl shadow-sm bg-indigo-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-indigo-900 focus:ring focus:ring-indigo-500 text-indigo-200"
      >
        {t("Add")}
      </button>
    </form>
  );
};

export default React.memo(AddPortfolioItemForm);
