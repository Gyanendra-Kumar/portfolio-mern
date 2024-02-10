import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import Img from "../Img";

const CarouselTwo = ({ skills }) => {
  return (
    <div>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[EffectCube, Autoplay]}
        className="mySwiper"
      >
        {skills.map((skill, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-br from-orange-400 via-yellow-200 to-red-400 h-full rounded-md ">
                <div
                  className="h-full flex flex-col gap-3 justify-center items-center text-center tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-2 text-lg flex-wrap font-bold "
                  key={skill.index}
                >
                  <p className="text-xl text-white">{skill.name}</p>
                  <Img src={skill.image} className="w-18 h-16 object-cover" />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CarouselTwo;
