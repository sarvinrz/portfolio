import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import NavbarItem from "./NavbarItem";
import PATHS from "../../../routes/paths";

const menuItems = [
  {
    id: 1,
    title: "Home",
    to: PATHS.home,
  },
  {
    id: 2,
    title: "Portfolio",
    to: PATHS.portfolio,
  },
];

const Navbar = function ({ isSidebarOpen, setIsSidebarOpen }) {
  const { t } = useTranslation();

  const closeSidebar = useCallback(
    () => setIsSidebarOpen(false),
    [setIsSidebarOpen]
  );

  return (
    <>
      <ul className="hidden md:flex flex-row items-center justify-center md:space-x-8 rtl:space-x-reverse">
        {menuItems.map((item) => (
          <NavbarItem key={item.id} title={item.title} to={item.to} />
        ))}
      </ul>

      {isSidebarOpen && (
        <div className="flex md:hidden flex-col fixed p-6 w-[60vw] space-y-4 bg-white rounded-e-3xl top-0 start-0 h-screen z-50">
          <h3 className="text-indigo-600 text-center mx-auto text-sm font-light opacity-50">
            {t("Menu")}
          </h3>
          <ul onClick={closeSidebar} className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <NavbarItem key={item.id} title={item.title} to={item.to} />
            ))}
          </ul>
        </div>
      )}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="flex flex-col bg-black bg-opacity-40 h-full w-screen top-0 start-0 fixed z-30"
        />
      )}
    </>
  );
};

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default React.memo(Navbar);
