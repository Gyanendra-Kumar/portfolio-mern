import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Button } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

const ProjectPage = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  //   console.log(slug);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${slug}`);
        const data = await res.json();
        // console.log(data.posts[0]);
        if (!res.ok) {
          setError(true);
          setIsLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchPost();
  }, []);
  console.log(post);
  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-3 flex flex-col max-w-6xl mx-auto 2xl:min-h-screen">
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:max-w-4xl">
            {post?.title}
          </h1>
          <Link
            to={`/search?category=${post?.category}`}
            className="self-center mt-2 md:mt-5"
          >
            <Button color="gray" pill size="xs">
              {post?.category}
            </Button>
          </Link>
          <img
            src={post?.image}
            alt={post?.title}
            className="mt-10 p-3 max-h-[600px] w-full object-contain"
          />

          <div className="flex justify-between p-3 px-6 border-b border-b-slate-300 text-sm">
            <span>
              {post && new Date(post?.createdAt).toLocaleDateString()}
            </span>
            <span className="italic">
              {(post?.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>

          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          ></div>
        </div>
      )}
      <div className="max-w-5xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
    </main>
  );
};

export default ProjectPage;
