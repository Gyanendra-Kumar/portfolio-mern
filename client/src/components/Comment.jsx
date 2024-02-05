import React, { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  // console.log(content);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);

  console.log(user);
  return (
    <div className="flex items-center p-4 border-b dark:border-b-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePhoto}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 truncate">
            @{user ? user?.username : `anonymous user`}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comment?.content}</p>
      </div>
    </div>
  );
};

export default Comment;
