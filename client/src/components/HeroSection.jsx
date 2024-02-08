import React from "react";
import DrawButton from "./hoc/DrawButton";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuLinkedin } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import myImage from "../assets/gyanendra-photo.png";
import { Button, Tooltip } from "flowbite-react";

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col max-sm:gap-10 gap-6 pl-6 sm:flex-row py-10 sm:py-10 md:py-20 lg:py-32">
        {/* left side */}
        <div className="flex-1 flex-col gap-4 px-4">
          <div className="mb-6">
            <DrawButton className="text-lg max-sm:text-center uppercase tracking-[4px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome to my PortFolio
            </DrawButton>
          </div>
          <h1 className="text-3xl max-sm:text-center sm:text-4xl leading-[40px] font-semibold mb-6">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% italic hover:from-pink-500 hover:to-yellow-500 uppercase">
              Gyanendra Kumar
            </span>{" "}
            Front-End Developer.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 tracking-wide leading-7">
            I'm an Application Developer at IBM in India. I'm dedicated and
            passionate to creating immersive user experiences through dynamic UI
            effects and animations, committed to seamlessly blending creativity
            with functionality in intuitive interfaces.
          </p>

          <div className="pt-10 sm:pt-16 lg:pt-32 max-sm:flex flex-col max-sm:items-center">
            <p className="uppercase tracking-[4px] font-semibold font-sans text-gray-800 dark:text-gray-200">
              find me
            </p>

            <div className="flex gap-4 mt-6">
              <Link
                to="https://www.linkedin.com/in/gyanendra-kumar-22975b18b/"
                target="_blank"
              >
                <Button gradientDuoTone="purpleToPink">
                  <LuLinkedin size="20" />
                </Button>
              </Link>

              <a href={`mailto:kganendra1998@gmail.com`}>
                <Button gradientDuoTone="greenToBlue">
                  <MdOutlineMailOutline size="20" />
                </Button>
              </a>
              <Tooltip
                content="Download Resume"
                placement="bottom"
                className="bg-gray-500 text-white"
              >
                <Button gradientDuoTone="pinkToOrange" className="hidden">
                  <FiDownload size="20" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex justify-center items-center hover:origin-top-left hover:rotate-[5deg] transition-all duration-500">
          <div className="">
            <div className="shadow-xl shadow-slate-500 rounded-md border-gray-600">
              <img
                src={myImage}
                alt="gyanendra_kumar"
                className="w-52 h-52 sm:w-72 sm:h-auto lg:w-96 object-cover scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
