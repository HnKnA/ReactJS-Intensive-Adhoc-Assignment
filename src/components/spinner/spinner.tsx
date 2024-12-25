import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"
        role="status"
        aria-label="Loading..."
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
