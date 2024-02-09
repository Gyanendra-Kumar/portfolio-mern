import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const PostCard = ({ data }) => {
  // console.log(data);
  return (
    <div className="border border-blue-400 p-2 rounded-md ">
      <Link to={`/post/${data?.slug}`} className="flex flex-col">
        <div className="overflow-hidden">
          <img
            src={data?.image}
            alt={data?.title}
            className="h-[200px] w-full object-cover hover:scale-105 transition-all duration-300 rounded-md"
          />
        </div>
        <div className="py-2 flex justify-between px-4">
          <p className="text-lg capitalize line-clamp-2">{data?.title}</p>
          <span className="italic text-sm">{data?.category}</span>
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
