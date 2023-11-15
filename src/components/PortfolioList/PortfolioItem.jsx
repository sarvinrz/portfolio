import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import fetcher from "../../utils/fetcher";
import i18next from "i18next";

const PortfolioItem = function ({ amount, price, symbol }) {
  const { data: coins } = useQuery(["/v2/tokens"], fetcher);
  const { data: pairs } = useQuery("/v2/pairs", fetcher);

  const coinValue = useMemo(() => {
    if (coins && pairs) {
      const currentCoin = coins.find((item) => item.symbol === symbol);

      if (currentCoin) {
        const usdPrice = pairs.find(
          (p) =>
            p.name.split("/")[0] === currentCoin.symbol &&
            p.name.split("/")[1] === "USDT"
        ).lastPrice;

        return Number(usdPrice) * Number(amount);
      }
    }
  }, [amount, coins, pairs, symbol]);

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
              {(+price).toLocaleString(i18next.language, {
                maximumFractionDigits: 2,
              })}
              $USD
            </span>
            <span className="bg-white rounded-xl px-6 py-2 text-xs dark:bg-gray-900 font-light whitespace-nowrap w-auto self-start max-w-[120px]">
              {(+amount).toLocaleString(i18next.language, {
                maximumFractionDigits: 2,
              })}
              {symbol}
            </span>
          </div>
          <span
            className={`bg-white dark:bg-gray-900  ${
              percentage < 0 ? "text-red-500" : "text-emerald-500"
            } rounded-xl px-6 py-2 text-xs font-light whitespace-nowrap w-auto self-end max-w-[120px]`}
          >
            {sign}{" "}
            {Math.abs(percentage).toLocaleString(i18next.language, {
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
