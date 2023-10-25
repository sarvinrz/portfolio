import React, { useCallback, useContext } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import useTheme from "../../hooks/useTheme";
import { FaRegMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";

const Header = function () {
  const { mode, setMode, setLanguage } = useTheme();

  const onClickHandler = useCallback(() => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode, setMode]);

  return (
    <header className="flex flex-row w-full p-4">
      <nav className="flex flex-row justify-between mx-auto items-center w-full container max-w-5xl">
        <Logo />
        <Navbar />
        <div className="flex flex-col">
          <button onClick={onClickHandler}>
            {mode === "light" ? <FaRegMoon /> : <BsSun />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
