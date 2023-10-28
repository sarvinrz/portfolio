import React from "react";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import Header from "../components/Header";
import useTheme from "../hooks/useTheme";

const MainLayout = function ({ children }) {
  const { direction } = useTheme();
  return (
    <div
      dir={direction}
      className="flex flex-col justify-between text-white bg-indigo-700 dark:bg-gray-800 min-h-screen w-full transition duration-500"
    >
      <Header />
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
