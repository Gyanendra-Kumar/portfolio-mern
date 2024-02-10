import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Img from "./Img";

const tableHead = [
  { name: "SL No." },
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
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const startIndex = userPosts.length;

  const editorUrl = `/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`;
  const adminUrl = `/api/post/getPosts?startIndex=${startIndex}`;

  const fetchPosts = async (url) => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        // setUserPosts(data.posts);
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts(adminUrl);
    } else if (currentUser.isEditor) {
      fetchPosts(editorUrl);
    }
  }, [currentUser._id]);

  const handleShowMore = () => {
    try {
      if (currentUser.isAdmin) {
        fetchPosts(adminUrl);
      } else if (currentUser.isEditor) {
        fetchPosts(editorUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete post handler
  const handleDeletePost = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/post/deletePost/${postIdToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        toast.error(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Loader />
        </div>
      ) : (
        <div className="table-auto max-w-6xl 2xl:w-[1280px] overflow-x-scroll md:mx-auto px-3 py-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          {(currentUser?.isAdmin || currentUser?.isEditor) &&
          userPosts.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  {tableHead?.map((th) => {
                    return (
                      <Table.HeadCell key={th.name}>{th.name}</Table.HeadCell>
                    );
                  })}
                </Table.Head>
                {userPosts?.map((userPost, index) => (
                  <Table.Body key={userPost._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        {new Date(userPost?.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${userPost?.slug}`}>
                          <Img
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
                            className="text-teal-700 dark:text-green-400 hover:scale-110 hover:text-green-500 transition-all"
                            size="20"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="cursor-pointer transition-all">
                          <RiDeleteBin4Line
                            size="20"
                            className="text-red-600 hover:scale-110"
                            onClick={() => {
                              setShowModal(true);
                              setPostIdToDelete(userPost._id);
                            }}
                          />
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

          {showModal && (
            <Modal
              show={showModal}
              size="md"
              onClose={() => setShowModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this project?
                  </h3>

                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeletePost}>
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardPosts;
