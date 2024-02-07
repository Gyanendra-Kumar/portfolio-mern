import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiArrowNarrowUp } from "react-icons/hi";
import { HiDocumentText } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardOverview = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
      fetchPosts();
    }
  }, [currentUser]);

  console.log("users: ", users, totalUsers, lastMonthUsers);
  console.log("Posts", posts, totalPosts, lastMonthPosts);

  return (
    <main className="p-3 md:mx-auto">
      <section className="flex flex-wrap gap-4 justify-evenly">
        {/* users */}
        <div className="flex flex-col p-3 bg-slate-100 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <aside className="flex justify-between">
            <div>
              <h3 className="text-gray-500 uppercase text-md font-semibold">
                Total Users
              </h3>
              <p>{totalUsers}</p>
            </div>
            <FaUsers className="bg-teal-600 rounded-full text-white text-5xl  p-3 shadow-xl" />
          </aside>
          <aside className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <p className="text-gray-500 ">Last Month</p>
          </aside>
        </div>

        {/* posts */}
        <div className="flex flex-col p-3 bg-slate-100 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <aside className="flex justify-between">
            <div>
              <h3 className="text-gray-500 uppercase text-md font-semibold">
                Total Projects
              </h3>
              <p>{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-blue-600 rounded-full text-white text-5xl  p-3 shadow-xl" />
          </aside>
          <aside className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <p className="text-gray-500 ">Last Month</p>
          </aside>
        </div>
      </section>

      <section className="py-6 flex flex-wrap gap-4 justify-center mx-auto">
        {/* Recent users */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-100 dark:bg-slate-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Link to={`/dashboard?tab=users`}>
              <Button outline gradientDuoTone="purpleToPink">
                See all
              </Button>
            </Link>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
            </Table.Head>

            {users?.map((user) => {
              return (
                <Table.Body key={user?._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="flex justify-center">
                      <img
                        src={user?.profilePhoto}
                        alt={user?.username}
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="text-xs md:text-sm">
                      {user?.username}
                    </Table.Cell>

                    <Table.Cell>
                      {user?.isAdmin
                        ? "Admin"
                        : user?.isEditor
                        ? "Editor"
                        : "User"}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </div>

        {/* Recent Projects */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-100 dark:bg-slate-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Projects</h1>
            <Link to={`/dashboard?tab=posts`}>
              <Button outline gradientDuoTone="purpleToPink">
                See all
              </Button>
            </Link>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Project Image</Table.HeadCell>
              <Table.HeadCell>Project Title</Table.HeadCell>
              <Table.HeadCell>Project Category</Table.HeadCell>
            </Table.Head>

            {posts?.map((post) => {
              return (
                <Table.Body key={post?._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="flex justify-center">
                      <img
                        src={post?.image}
                        alt={post?.title}
                        className="w-10 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="capitalize w-96">
                      {post?.title}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {post?.category}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </div>
      </section>
    </main>
  );
};

export default DashboardOverview;
