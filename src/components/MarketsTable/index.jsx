import i18next from "i18next";
import React from "react";

const data = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price_usd: 50000,
    percent_change_24h: 5.2,
    market_cap_usd: 950000000000,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price_usd: 3400,
    percent_change_24h: 6.1,
    market_cap_usd: 400000000000,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price_usd: 420,
    percent_change_24h: -3.5,
    market_cap_usd: 69000000000,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price_usd: 2.5,
    percent_change_24h: 4.3,
    market_cap_usd: 80000000000,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price_usd: 180,
    percent_change_24h: 7.9,
    market_cap_usd: 50000000000,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price_usd: 1.2,
    percent_change_24h: -2.8,
    market_cap_usd: 55000000000,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price_usd: 30,
    percent_change_24h: 3.2,
    market_cap_usd: 29000000000,
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price_usd: 150,
    percent_change_24h: 0.9,
    market_cap_usd: 10000000000,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    price_usd: 28,
    percent_change_24h: 4.7,
    market_cap_usd: 12000000000,
  },
  {
    name: "Stellar",
    symbol: "XLM",
    price_usd: 0.35,
    percent_change_24h: 1.6,
    market_cap_usd: 8000000000,
  },
];

const columns = [
  {
    id: 1,
    title: "Currency",
  },
  {
    id: 2,
    title: "Price (USD)",
  },
  {
    id: 3,
    title: "24h Change (%)",
  },
  {
    id: 4,
    title: "Market Cap (USD)",
  },
];

const MarketsTable = function () {
  return (
    <div className="p-4 md:container max-h-screen overflow-y-auto">
      <table className="w-full text-black rounded-lg shadow-sm">
        <thead className="bg-gray-100 rounded-t-md">
          <tr>
            {columns.map((col) => (
              <th className="p-3 text-start" key={col.id}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((crypto, index) => (
            <tr
              key={index}
              className={`${index === data.length - 1 && "rounded-b-md"} ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } hover:bg-gray-50`}
            >
              <td className="p-3">
                <div className="flex flex-row items-center justify-start space-x-2 rtl:space-x-reverse">
                  <div className="flex flex-row justify-center items-center rounded-full p-1 bg-indigo-500">
                    <img
                      className="w-8 h-8"
                      src={`https://api.exnovin.io/static-contents/images/icons/${crypto.symbol}_64x64.png`}
                    />
                  </div>

                  <p className="text-sm tracking-widest font-semibold">
                    {crypto.name}
                  </p>
                </div>
              </td>
              <td className="p-3 font-light text-lg">
                $
                {Number(crypto.price_usd).toLocaleString(i18next.language, {
                  maximumFractionDigits: 6,
                })}
              </td>
              <td className="p-3 flex flex-row items-center justify-start">
                <p
                  className={`px-4 py-1 text-sm rounded-full bg-opacity-70 w-16 text-center ${
                    crypto.percent_change_24h >= 0
                      ? "bg-green-500 text-green-700"
                      : "bg-red-500 text-red-800"
                  }`}
                >
                  {crypto.percent_change_24h}%
                </p>
              </td>
              <td className="p-3 font-light text-lg">
                $
                {Number(crypto.market_cap_usd).toLocaleString(
                  i18next.language,
                  {
                    maximumFractionDigits: 6,
                  }
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MarketsTable);
