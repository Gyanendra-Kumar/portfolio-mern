import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [userComments, setUserComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;

    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      console.log(data);
      setCommentError(data.message);

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setUserComments([data, ...userComments]);
      }
    } catch (error) {
      console.log(error.message);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComment/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setUserComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  // console.log(userComments);

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

          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      <>
        {userComments.length === 0 ? (
          <p className="text-sm text-gray-500 my-5">No Comments yet!</p>
        ) : (
          <div className="border border-gray-500 mt-6 rounded-md">
            <div className="text-sm mb-2 flex items-center gap-2 border-b-2">
              <p className="text-gray-600 font-semibold text-md p-4">
                Comments:
              </p>
              <div className="border px-2 py-1 border-gray-500 rounded-md">
                <p>{userComments?.length}</p>
              </div>
            </div>

            {/* showing comments */}
            <div className="w-full h-56 overflow-auto">
              {userComments?.map((userComment, index) => (
                <div key={index}>
                  <Comment comment={userComment} />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CommentSection;
