import React, { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import useTheme from "../../hooks/useTheme";
import { FaRegMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { RiEarthLine, RiMenu2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PATHS from "../../routes/paths";

const Header = function () {
  const { mode, setMode, language, setLanguage, setDirection } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);

  const {
    i18n: { changeLanguage },
    t,
  } = useTranslation();

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
      const direction = language === "en" ? "ltr" : "rtl";
      changeDirection(direction);
      localStorage.setItem("language", language);
      localStorage.setItem("direction", direction);
    },
    [changeDirection, changeLanguage, setLanguage]
  );

  const onThemeModeChangeHandler = useCallback(() => {
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("mode", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      localStorage.setItem("mode", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode, setMode]);

  useEffect(() => {
    setDirection(
      localStorage.getItem("direction")
        ? localStorage.getItem("direction")
        : "ltr"
    );
    setMode(
      localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
    );

    if (localStorage.getItem("mode") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setLanguage(
      localStorage.getItem("language") ? localStorage.getItem("language") : "en"
    );
    localStorage.getItem("language") ? localStorage.getItem("language") : "en";

    if (localStorage.getItem("language") === "fa") {
      changeLanguage("fa");
    } else {
      changeLanguage("en");
    }
  }, [changeLanguage, setDirection, setLanguage, setMode]);

  return (
    <header className="flex flex-row w-full p-4">
      <nav className="flex flex-row justify-between mx-auto items-center w-full container py-2 px-4">
        <div className="flex flex-row items-center space-x-4 rtl:space-x-reverse">
          <button className="md:hidden flex" onClick={openSidebar}>
            <RiMenu2Line className="text-2xl" />
          </button>
          <Logo />
        </div>

        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-row items-center space-x-4 rtl:space-x-reverse">
          <Link
            to={PATHS.login}
            className="flex flex-row bg-white rounded-lg p-2 text-indigo-500 font-bold dark:text-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 justify-center w-24"
          >
            {t("Login")}
          </Link>
          <button onClick={onThemeModeChangeHandler}>
            {mode === "light" ? <FaRegMoon /> : <BsSun />}
          </button>
          <button className="flex flex-col group relative">
            <span className="flex flex-row space-x-1 rtl:space-x-reverse items-center uppercase">
              <RiEarthLine className="text-white text-lg" />
              <p className="text-sm mt-0.5">{t(language)}</p>
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
