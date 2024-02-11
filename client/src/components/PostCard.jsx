import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import Img from "./Img";
// motion

const PostCard = ({ data }) => {
  // console.log(data);
  return (
    <div className="border w-80  border-blue-400 p-2 rounded-md hover:shadow-3xl dark:hover:shadow-lg dark:hover:shadow-purple-400 transition-all duration-500">
      <Link to={`/post/${data?.slug}`} className="flex flex-col">
        <div className="overflow-hidden transition-all duration-500 rounded-md">
          <Img
            src={data?.image}
            alt={data?.title}
            className="h-[200px] w-[400px] object-cover  transition-all ease-linear duration-500 rounded-md transform hover:scale-105"
          />
        </div>
        <div className="py-2 flex justify-between px-4 gap-2 items-center">
          <p className="text-lg capitalize line-clamp-1">{data?.title}</p>
          <span className="italic text-sm text-orange-400">
            {data?.category}
          </span>
        </div>
      </Link>

      <Button
        className="w-full rounded-tl-none rounded-tr-2xl rounded-br-none rounded-bl-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        size="md"
      >
        <Link
          to={`/post/${data?.slug}`}
          className="font-semibold tracking-wider text-lg"
        >
          Read Article
        </Link>
      </Button>
    </div>
  );
};

export default PostCard;
