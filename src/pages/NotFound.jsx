import React from "react";

const NotFound = function () {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-3xl font-bold">404 Not Found</h3>
    </div>
  );
};

export default React.memo(NotFound);
