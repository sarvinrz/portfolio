import React from "react";
import { PiCoinsDuotone } from "react-icons/pi";

const Logo = function () {
  return (
    <span className=" flex flex-row justify-center items-center bg-white rounded-full dark:bg-gray-600 text-yellow-500 w-14 h-14 shadow-md p-1">
      <PiCoinsDuotone className="text-5xl" />
    </span>
  );
};

export default React.memo(Logo);
