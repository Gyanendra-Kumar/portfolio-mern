import React from "react";
import gyanendraImg from "../assets/gyanendra-photo.png";
import DrawButton from "../components/hoc/DrawButton";

const Home = () => {
  return (
    <main className="min-h-screen max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row py-16 md:py-32">
        {/* left side */}
        <div className="flex-1 flex-col gap-4 px-4">
          <div className="mb-6">
            <DrawButton className="text-md py-2 uppercase tracking-[4px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
              Welcome to my PortFolio
            </DrawButton>
          </div>
          <h1 className="text-4xl leading-[50px] font-semibold mb-6">
            Hi, I'm <span className="text-[#ff014f]">Gyanendra Kumar</span>{" "}
            Front-End Developer.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 tracking-wide leading-7">
            I'm an Application Developer at IBM in India. I'm dedicated and
            passionate to creating immersive user experiences through dynamic UI
            effects and animations, committed to seamlessly blending creativity
            with functionality in intuitive interfaces.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1"></div>
      </div>
    </main>
  );
};

export default Home;
