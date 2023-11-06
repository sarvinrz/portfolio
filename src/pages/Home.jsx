import React from "react";
import MarketsTable from "../components/MarketsTable";

const Home = function () {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <MarketsTable />
    </div>
  );
};

export default React.memo(Home);
