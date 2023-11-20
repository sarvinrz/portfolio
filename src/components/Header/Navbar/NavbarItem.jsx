import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const NavbarItem = function ({ to, title }) {
  const { t } = useTranslation();
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `md:flex hidden text-lg font-semibold ${
            isActive
              ? "bg-gray-200 shadow-sm text-indigo-700 dark:text-gray-200 dark:bg-gray-600"
              : "hover:bg-gray-200 hover:shadow-sm hover:text-indigo-700 dark:hover:text-gray-200 dark:hover:bg-gray-600"
          } rounded-xl px-4 py-2 transition duration-400`
        }
        to={to}
      >
        {t(title)}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `md:hidden flex text-lg font-semibold ${
            isActive ? "bg-gray-100 text-indigo-500" : "text-indigo-500/70"
          } rounded-xl justify-center px-4 py-2 transition duration-400`
        }
        to={to}
      >
        {t(title)}
      </NavLink>
    </li>
  );
};

NavbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default React.memo(NavbarItem);
