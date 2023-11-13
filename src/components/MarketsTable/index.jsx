import i18next from "i18next";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import fetcher from "../../utils/fetcher";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const MarketsTable = function () {
  const { data: coins } = useQuery(["/v2/tokens"], fetcher);
  const { data: pairs } = useQuery(["/v2/pairs"], fetcher);

  const tableData = useMemo(() => {
    if (coins) {
      return coins.filter((c) => !["USDT", "TMN"].includes(c.symbol));
    }
  }, [coins]);

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className="flex flex-row items-center justify-start space-x-2 rtl:space-x-reverse">
          <div className="flex flex-row justify-center items-center rounded-full p-1 bg-indigo-500">
            <img
              className="w-8 h-8"
              src={`https://api.exnovin.io/static-contents/images/icons/${info.row.original.symbol}_64x64.png`}
            />
          </div>

          <p className="text-lg uppercase tracking-widest font-light">
            {info.getValue()}
          </p>
        </div>
      ),
      header: () => <p>Cryptocurrency</p>,
    }),
    columnHelper.accessor("symbol", {
      id: "convertRateInBase",
      cell: (info) => {
        const pair = pairs?.find(
          (p) =>
            p.name.split("/")[0] === info.getValue() &&
            p.name.split("/")[1] === "USDT"
        );

        return (
          <p>
            $
            {Number(pair?.lastPrice).toLocaleString(i18next.language, {
              maximumFractionDigits: 6,
            })}
          </p>
        );
      },
      header: () => <p>Price (USDT)</p>,
    }),
    columnHelper.accessor("symbol", {
      header: () => "24h Change (%)",
      cell: (info) => {
        const pair = pairs?.find(
          (p) =>
            p.name.split("/")[0] === info.getValue() &&
            p.name.split("/")[1] === "USDT"
        );
        return (
          <p
            className={`px-4 py-1 text-sm rounded-full bg-opacity-70 w-16 text-center ${
              pair?.change24Percentage >= 0
                ? "bg-green-500 text-green-700"
                : "bg-red-500 text-red-800"
            }`}
          >
            {pair?.change24Percentage}%
          </p>
        );
      },
    }),
    columnHelper.accessor("symbol", {
      cell: (info) => {
        const pair = pairs?.find(
          (p) =>
            p.name.split("/")[0] === info.getValue() &&
            p.name.split("/")[1] === "USDT"
        );
        return (
          <p>
            $
            {Number(pair?.vol24).toLocaleString(i18next.language, {
              maximumFractionDigits: 6,
            })}
          </p>
        );
      },
      header: () => <span>Volume</span>,
    }),
  ];

  const table = useReactTable({
    data: tableData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!coins && !pairs) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 md:container max-h-screen overflow-y-auto">
      <table
        className="w-full text-black rounded-lg shadow-sm"
        {...getCoreRowModel()}
      >
        <thead className="bg-gray-100 rounded-t-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-3 text-start" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${index === coins.length - 1 && "rounded-b-md"} ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } hover:bg-gray-50`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MarketsTable);
