import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <>
      <Link to="/" className={`${className}`}>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white ">
          Gyanendra's
        </span>
        PortFolio
      </Link>
    </>
  );
};

export default Logo;
