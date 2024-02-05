import React from "react";
import { Spinner } from "flowbite-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner aria-label="Loading content" size="xl" />
    </div>
  );
};

export default Loader;
