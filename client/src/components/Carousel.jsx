import React from "react";
import CarouselOne from "./carousels/CarouselOne";
import CarouselTwo from "./carousels/CarouselTwo";
import CarouselThree from "./carousels/CarouselThree";
import {
  RFH,
  RH,
  css,
  firebase,
  github,
  html,
  javascript,
  next,
  node,
  react,
  reduxToolkit,
  tailwind,
} from "../utils";

const skills1 = [
  {
    name: "HTML",
    image: html,
  },
  {
    name: "CSS",
    image: css,
  },
  {
    name: "Tailwind CSS",
    image: tailwind,
  },
  {
    name: "JavaScript",
    image: javascript,
  },
];
const skills2 = [
  { name: "React.JS", image: react },
  { name: "React Hooks", image: RH },
  { name: "Redux Toolkit", image: reduxToolkit },
  { name: "React Form Hook", image: RFH },
];
const skills3 = [
  { name: "Node.JS", image: node },
  { name: "Firebase", image: firebase },
  { name: "GitHub", image: github },
  { name: "Next.JS", image: next },
];

import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

const Carousel = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-evenly mt-6">
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        exit="exit"
      >
        <CarouselOne skills={skills1} />
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        exit="exit"
      >
        <CarouselTwo skills={skills2} />
      </motion.div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        exit="exit"
      >
        <CarouselThree skills={skills3} />
      </motion.div>
    </div>
  );
};

export default Carousel;
