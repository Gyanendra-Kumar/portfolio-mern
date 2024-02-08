import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

const Projects = () => {
  const [project, setProject] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/post/getPosts?limit=6");
      const data = await res.json();

      setProject(data.posts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log(project);
  return (
    <div className="mt-16 sm:mt-24 ">
      <h1 className="text-center text-4xl xl:text-5xl font-semibold mb-10">
        My Work
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  justify-center gap-10 my-10">
        {project?.map((item) => {
          return (
            <Link
              to={`/post/${item?.slug}`}
              className="shadow-3xl dark:shadow-xl dark:bg-[rgb(25,36,66)] py-4 px-3 rounded-md  transition-all duration-500"
              key={item?._id}
            >
              <div className="h-48 overflow-hidden flex justify-center shadow-sm dark:shadow-sky-300 rounded-md ">
                <img
                  src={item?.image}
                  className="w-full h-full object-cover rounded-md hover:scale-105 transition-all duration-500 hover:rounded-md "
                />
              </div>
              <div className="py-2">
                <h4 className="font-semibold font-serif capitalize tracking-[2px] line-clamp-2 text-xl">
                  {item?.title}
                </h4>
                <p className="text-ms italic text-teal-400 ">
                  {item?.category}
                </p>
              </div>

              <Button
                className="w-full flex items-center gap-2"
                outline
                gradientDuoTone="pinkToOrange"
              >
                <p>Read More</p>
                <HiOutlineArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
