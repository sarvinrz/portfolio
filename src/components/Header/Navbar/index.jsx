import React from "react";
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

const Navbar = function () {
  return (
    <ul className="flex flex-row items-center justify-center space-x-8 rtl:space-x-reverse">
      {menuItems.map((item) => (
        <NavbarItem key={item.id} title={item.title} to={item.to} />
      ))}
    </ul>
  );
};

export default React.memo(Navbar);
