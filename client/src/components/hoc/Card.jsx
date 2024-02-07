import React from "react";

const Card = ({ children, className }) => {
  return <span className={`${className} shadow-xl w-10`}>{children}</span>;
};

export default Card;
