import React from "react";

const Footer = function () {
  return (
    <footer className="flex flex-row justify-center items-center text-center p-4 text-indigo-300 text-xs opacity-80">
      Sarvin Rezazadeh with ❤️ + ☕️ | All rights reserved. |{" "}
      {new Date().getFullYear()}
    </footer>
  );
};

export default React.memo(Footer);
