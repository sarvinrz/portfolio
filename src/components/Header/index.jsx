import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = function () {
  return (
    <header className="flex flex-row w-full p-4">
      <nav className="flex flex-row justify-between mx-auto items-center w-full container max-w-5xl">
        <Logo />
        <Navbar />
      </nav>
    </header>
  );
};

export default React.memo(Header);
