import React, { useEffect, useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      const searchQuery = urlParams.toString();

      try {
        const res = await fetch(`/api/post/getPosts?${searchQuery}`);

        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setPosts(data?.posts);
          //   console.log(data);
          setIsLoading(false);

          if (data?.posts?.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, [location.search]);

  // console.log(sidebarData);
  // console.log(posts);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
              className="w-full"
            >
              <option value="">UnCategorized</option>
              <option value="react.js">React.js</option>
              <option value="next.js">Next.js</option>
              <option value="javascript">JavaScript</option>
              <option value="react-native">React Native</option>
            </Select>
          </div>

          <Button
            type="submit"
            outline
            gradientDuoTone="purpleToPink"
            size="lg"
          >
            Apply Filters
          </Button>
        </form>
      </div>

      {/* search result */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 py-6 px-10 mt-5">
          Project Result
        </h1>

        <div className="p-10 flex flex-wrap gap-4">
          {!isLoading && posts.length === 0 && (
            <p className="text-lg text-gray-500">No Projects found!</p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap gap-4">
              {posts?.length > 0 &&
                posts?.map((post) => <PostCard key={post?._id} data={post} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
