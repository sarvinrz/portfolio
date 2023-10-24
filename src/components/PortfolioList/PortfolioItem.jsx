import React, { useMemo } from "react";
import PropTypes from "prop-types";
import useCoins from "../../hooks/useCoins";

const PortfolioItem = function ({ amount, price, symbol }) {
  const { coins } = useCoins();

  const coinValue = useMemo(() => {
    if (coins) {
      const currentCoin = coins.find((item) => item.asset_id === symbol);

      if (currentCoin) {
        const usdPrice = currentCoin["price_usd"];

        return Number(usdPrice) * Number(amount);
      }
    }
  }, [amount, coins, symbol]);

  const boughtValue = useMemo(() => {
    return Number(amount) * Number(price);
  }, [amount, price]);

  const pnl = useMemo(() => {
    if (coinValue) {
      return Number(coinValue) - Number(boughtValue);
    }
  }, [boughtValue, coinValue]);

  const percentage = useMemo(() => {
    return (Number(pnl) / Number(boughtValue)) * 100;
  }, [boughtValue, pnl]);

  const sign = useMemo(() => {
    if (percentage) {
      if (percentage < 0) {
        return "-";
      } else {
        return "+";
      }
    }
  }, [percentage]);

  return (
    <li>
      <div className="flex flex-row justify-between items-center p-4 rounded-lg bg-indigo-50/40">
        <div className="bg-white my-auto rounded-xl px-6 py-2 text-xl dark:bg-gray-900  font-bold w-auto self-start max-w-[120px] truncate">
          {symbol}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2 rtl:space-x-reverse">
            <span className="bg-white rounded-xl px-6 py-2 text-xs dark:bg-gray-900 font-light whitespace-nowrap w-auto self-start max-w-[120px]">
              {(+price).toLocaleString("en-GB", {
                maximumFractionDigits: 2,
              })}
              $USD
            </span>
            <span className="bg-white rounded-xl px-6 py-2 text-xs dark:bg-gray-900 font-light whitespace-nowrap w-auto self-start max-w-[120px]">
              {
                +amount.toLocaleString("en-GB", {
                  maximumFractionDigits: 2,
                })
              }
              {symbol}
            </span>
          </div>
          <span
            className={`bg-white dark:bg-gray-900  ${
              percentage < 0 ? "text-red-500" : "text-emerald-500"
            } rounded-xl px-6 py-2 text-xs font-light whitespace-nowrap w-auto self-end max-w-[120px]`}
          >
            {sign}{" "}
            {Math.abs(percentage).toLocaleString("en-GB", {
              maximumFractionDigits: 2,
            })}{" "}
            %
          </span>
        </div>
      </div>
    </li>
  );
};

PortfolioItem.propTypes = {
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default React.memo(PortfolioItem);
