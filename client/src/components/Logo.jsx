import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, fadeIn } from "../utils/variants";

const Logo = ({ className }) => {
  return (
    <motion.div variants={fadeIn("down", 0.4)} initial="hidden" animate="show">
      <Link to="/" className={`${className}`}>
        <span className="px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  rounded-md text-white ">
          Gyanendra's
        </span>
        PortFolio
      </Link>
    </motion.div>
  );
};

export default Logo;
