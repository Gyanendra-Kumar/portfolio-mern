import React from "react";
import Carousel from "./Carousel";
// import Projects from "../pages/Projects";

// motion
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

const SkillsSection = () => {
  return (
    <section className="py-10 sm:py-12 flex flex-col sm:gap-10">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        exit="exit"
      >
        <h1 className="text-3xl sm:text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  hover:from-pink-500 hover:to-yellow-500 uppercase font-bold">
          SKILLS
        </h1>
      </motion.div>

      <div>
        <Carousel />
      </div>
    </section>
  );
};

export default SkillsSection;
