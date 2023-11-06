import React, { useCallback } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import useTheme from "../../hooks/useTheme";
import { FaRegMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { RiEarthLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const Header = function () {
  const { mode, setMode, language, setLanguage, setDirection } = useTheme();

  const {
    i18n: { changeLanguage, language: i18nLanguage },
    t,
  } = useTranslation();

  console.log(language, i18nLanguage);

  const changeDirection = useCallback(
    (direction) => {
      setDirection(direction);
    },
    [setDirection]
  );

  const changeLanguageHandler = useCallback(
    (language) => {
      setLanguage(language);
      changeLanguage(language);
      changeDirection(language === "en" ? "ltr" : "rtl");
    },
    [changeDirection, changeLanguage, setLanguage]
  );

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
      <nav className="flex flex-row justify-between mx-auto items-center w-full container py-2 px-4">
        <Logo />
        <Navbar />
        <div className="flex flex-row items-center space-x-4 rtl:space-x-reverse">
          <button onClick={onClickHandler}>
            {mode === "light" ? <FaRegMoon /> : <BsSun />}
          </button>
          <button className="flex flex-col group relative">
            <span className="flex flex-row space-x-1 rtl:space-x-reverse items-center uppercase">
              <RiEarthLine className="text-white text-lg" />
              <p>{t(language)}</p>
            </span>
            <div className="pt-7 absolute">
              <ul className="group-hover:flex flex-col hidden z-40 bg-white dark:bg-gray-900 w-12 shadow-md border border-gray-500 rounded-lg divide-y divide-gray-500 text-black dark:text-white">
                <li
                  className="p-2 dark:hover:bg-gray-800 hover:bg-gray-200 hover:rounded-t-lg"
                  onClick={() => changeLanguageHandler("en")}
                >
                  🇬🇧
                </li>
                <li
                  onClick={() => changeLanguageHandler("fa")}
                  className="p-2 dark:hover:bg-gray-800 hover:bg-gray-200 hover:rounded-b-lg"
                >
                  🇮🇷
                </li>
              </ul>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
