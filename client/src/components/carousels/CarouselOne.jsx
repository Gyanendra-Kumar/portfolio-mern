import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination, Autoplay } from "swiper/modules";

const CarouselOne = ({ skills }) => {
  return (
    <div>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 16,
          shadowScale: 0.94,
        }}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[EffectCube, Autoplay]}
        className="mySwiper"
      >
        {skills.map((skill, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-br from-green-400 via-green-200 to-lime-300 h-full rounded-md">
                <div
                  className="h-full flex justify-center items-center flex-col gap-3 text-center tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-2 text-lg flex-wrap font-bold "
                  key={skill.index}
                >
                  <p className="text-xl">{skill.name}</p>
                  <div className="w-18 h-16">
                    <img
                      src={skill.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CarouselOne;
