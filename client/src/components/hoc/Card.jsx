import React from "react";

const Card = ({ children, className }) => {
  return (
    <span className={`${className} shadow-3xl shadow-inside`}>{children}</span>
  );
};

export default Card;
