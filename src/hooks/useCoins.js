import { useContext } from "react";
import { CoinsContext } from "../contexts/CoinsContext";

const useCoins = function () {
  const coins = useContext(CoinsContext);

  return coins;
};

export default useCoins;
