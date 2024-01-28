import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <>
      <Link to="/" className={`${className}`}>
        <span className="px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  rounded-md text-white ">
          Gyanendra's
        </span>
        PortFolio
      </Link>
    </>
  );
};

export default Logo;
