import React from "react";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import Header from "../components/Header";

const MainLayout = function ({ children }) {
  return (
    <div className="flex flex-col justify-between text-white bg-indigo-700 min-h-screen w-full">
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
