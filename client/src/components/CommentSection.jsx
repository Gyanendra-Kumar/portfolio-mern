import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Textarea } from "flowbite-react";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl mx-auto p-3 w-full">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser?.profilePhoto}
            alt={currentUser?.title}
            className="w-7 h-7 rounded-full object-cover"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-cyan-600 text-xs hover:underline"
          >
            @{currentUser?.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 flex gap-1">
          <span>You must sign in to comment.</span>
          <Link
            to="/sign-in"
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            // id="comment"
            placeholder="Leave a comment..."
            row={3}
            maxLength="200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between pt-4 items-center">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} Characters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
