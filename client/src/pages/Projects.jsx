import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import PostCard from "../components/PostCard";

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
    <div className="mt-16 sm:mt-24 max-w-6xl mx-auto">
      <h1 className="text-center text-4xl xl:text-5xl font-semibold mb-10">
        My Work
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  justify-center gap-10 my-10">
        {project?.map((item) => (
          <PostCard key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
