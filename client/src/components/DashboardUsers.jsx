import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";

const tableHead = [
  { name: "SL No." },
  { name: "Date updated" },
  { name: "User Image" },
  { name: "UserName" },
  { name: "Email" },
  { name: "Admin" },
  { name: "Editor" },
  { name: "User" },
  { name: "Delete" },
  ,
];

const DashboardUsers = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const startIndex = users.length;

  const usersUrl = `/api/user/getUsers?startIndex=${startIndex}`;

  // fetch users from database
  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        // setUserPosts(data.posts);
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchUsers(usersUrl);
    }
  }, [currentUser._id]);

  // console.log(userPosts);

  const handleShowMore = () => {
    // const startIndex = userPosts.length;

    try {
      if (currentUser.isAdmin) {
        fetchUsers(usersUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete post handler
  const handleDeleteUser = async () => {
    setShowModal(false);
    // try {
    //   const res = await fetch(`/api/user/deletePost/${postIdToDelete}`, {
    //     method: "DELETE",
    //   });
    //   const data = await res.json();
    //   if (!res.ok) {
    //     console.log(data.message);
    //     toast.error(data.message);
    //   } else {
    //     setUsers((prev) => prev.filter((post) => post._id !== postIdToDelete));
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   toast.error(error.message);
    // }
    console.log("User deleted");
  };

  return (
    <div className="table-auto max-w-6xl 2xl:w-[1280px] overflow-x-scroll md:mx-auto px-3 py-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              {tableHead?.map((th) => {
                return <Table.HeadCell key={th.name}>{th.name}</Table.HeadCell>;
              })}
            </Table.Head>
            {users?.map((user, index) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user?.profilePhoto}
                      alt={user?.username}
                      className="w-20 h-20 object-cover rounded-[100%] bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell className="">
                    {user.isAdmin ? (
                      <FaCheck className="text-teal-600 text-lg" />
                    ) : (
                      <FaTimes className="text-red-500 text-lg" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isEditor ? (
                      <FaCheck className="text-teal-600 text-lg" />
                    ) : (
                      <FaTimes className="text-red-500 text-lg" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isUser ? (
                      <FaCheck className="text-teal-600 text-lg" />
                    ) : (
                      <FaTimes className="text-red-500 text-lg" />
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="cursor-pointer transition-all">
                      <RiDeleteBin4Line
                        size="20"
                        className="text-red-600 hover:scale-110"
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
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
        <p>You have no user.</p>
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
                Are you sure you want to delete this user?
              </h3>

              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
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
  );
};

export default DashboardUsers;
