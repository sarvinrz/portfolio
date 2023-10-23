import React from "react";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import { PiCoinsDuotone } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../routes/paths";

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

const MainLayout = function ({ children }) {
  return (
    <div className="flex flex-col justify-between text-white bg-indigo-700 min-h-screen w-full">
      <header className="flex flex-row w-full p-4">
        <nav className="flex flex-row justify-between mx-auto items-center w-full container max-w-5xl">
          <span className=" flex flex-row justify-center items-center bg-white rounded-full text-yellow-500 w-14 h-14 shadow-md p-1">
            <PiCoinsDuotone className="text-5xl" />
          </span>
          <ul className="flex flex-row items-center justify-center space-x-8 rtl:space-x-reverse">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  className={({ isActive }) =>
                    `text-lg font-semibold ${
                      isActive
                        ? "bg-gray-200 shadow-sm text-indigo-700"
                        : "hover:bg-gray-200 hover:shadow-sm hover:text-indigo-700"
                    } rounded-xl px-4 py-2 transition duration-400`
                  }
                  to={item.to}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="flex flex-col justify-center items-center h-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(MainLayout);
