import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";

const tableHead = [
  { name: "Date updated" },
  { name: "Post Image" },
  { name: "Post Title" },
  { name: "category" },
  { name: "Edit" },
  { name: "Delete" },
  ,
];

const DashboardPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const editorUrl = `/api/post/getPosts?userId=${currentUser._id}`;
  const adminUrl = `/api/post/getPosts`;

  useEffect(() => {
    const fetchPosts = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
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

  // console.log(userPosts);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(``);
    } catch (error) {}
  };

  return (
    <div className="table-auto max-w-6xl 2xl:w-[1280px] overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {(currentUser?.isAdmin || currentUser?.isEditor) &&
      userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              {tableHead?.map((th) => {
                return <Table.HeadCell key={th.name}>{th.name}</Table.HeadCell>;
              })}
            </Table.Head>
            {userPosts?.map((userPost) => (
              <Table.Body key={userPost._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(userPost?.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${userPost?.slug}`}>
                      <img
                        src={userPost?.image}
                        alt={userPost?.title}
                        className="w-28 h-16 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${userPost?.slug}`}
                      className="capitalize font-medium text-black dark:text-white"
                    >
                      {userPost.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="capitalize">
                    {userPost.category}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${userPost._id}`}>
                      <FaRegEdit
                        className="text-teal-700 hover:scale-110 transition-all"
                        size="20"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="cursor-pointer hover:scale-110 transition-all">
                      <RiDeleteBin4Line size="20" className="text-red-600" />
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 w-full text-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no posts.</p>
      )}
    </div>
  );
};

export default DashboardPosts;
