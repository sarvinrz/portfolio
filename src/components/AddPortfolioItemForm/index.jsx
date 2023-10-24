import React, { useCallback, useReducer } from "react";
import Select from "../Select";
import Input from "../Input";
import formReducer from "../../reducers/formReducer";
import usePortfolio from "../../hooks/usePortfolio";
import useCoins from "../../hooks/useCoins";

const initialState = {
  symbol: "",
  price: "",
  amount: 0,
};

const AddPortfolioItemForm = function () {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const { addItem } = usePortfolio();
  const { coins } = useCoins();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
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
        loading={!coins || coins.length === 0}
        setValue={handleInputChange}
        options={
          coins ? coins.map((c) => ({ value: c.asset_id, label: c.name })) : []
        }
      />
      <Input
        name="price"
        placeholder="Price"
        value={formState.price}
        setValue={handleInputChange}
      />
      <Input
        name="amount"
        placeholder="Amount"
        value={formState.amount}
        setValue={handleInputChange}
      />
      <button
        type="submit"
        className="p-2 text-center w-full rounded-xl shadow-sm bg-indigo-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-indigo-900 focus:ring focus:ring-indigo-500 text-indigo-200"
      >
        Add
      </button>
    </form>
  );
};

export default React.memo(AddPortfolioItemForm);
