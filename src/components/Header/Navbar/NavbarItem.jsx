import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const NavbarItem = function ({ to, title }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `text-lg font-semibold ${
            isActive
              ? "bg-gray-200 shadow-sm text-indigo-700 dark:text-gray-200 dark:bg-gray-600"
              : "hover:bg-gray-200 hover:shadow-sm hover:text-indigo-700 dark:hover:text-gray-200 dark:hover:bg-gray-600"
          } rounded-xl px-4 py-2 transition duration-400`
        }
        to={to}
      >
        {title}
      </NavLink>
    </li>
  );
};

NavbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default React.memo(NavbarItem);
