import React from "react";
import { MoonLoader } from "react-spinners";

const Fallback = function () {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-indigo-700 dark:bg-gray-800">
      <MoonLoader color="#fff" />
    </div>
  );
};

export default React.memo(Fallback);
