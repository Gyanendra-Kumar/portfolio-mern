import React from "react";

import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";

const Home = () => {
  return (
    <main className="min-h-screen max-w-6xl mx-auto max-lg:px-6 max-sm:px-6">
      <HeroSection />
      <hr className="border-gray-400" />
      <SkillsSection />
    </main>
  );
};

export default Home;
