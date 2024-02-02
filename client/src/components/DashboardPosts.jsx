import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin || currentUser.isEditor) {
      fetchPosts();
    }
  }, [currentUser._id]);

  console.log(userPosts);
  return <div>DashboardPosts</div>;
};

export default DashboardPosts;
