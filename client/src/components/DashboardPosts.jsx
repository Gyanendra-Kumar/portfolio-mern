import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const editorUrl = `/api/post/getPosts?userId=${currentUser._id}`;
  const adminUrl = `/api/post/getPosts`;

  useEffect(() => {
    const fetchPosts = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts(adminUrl);
    } else if (currentUser.isEditor) {
      fetchPosts(editorUrl);
    }
  }, [currentUser._id]);

  console.log(userPosts);
  return <div>DashboardPosts</div>;
};

export default DashboardPosts;
