import React, { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  NavbarToggle,
  TextInput,
  Dropdown,
  Avatar,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { motion } from "framer-motion";
import { containerVariants, fadeIn } from "../utils/variants";

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  //   const pathname = path.split("/").filter((x) => x);
  //   console.log(pathname);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
    }
  }, [location.search]);

  // console.log(searchTerm);

  // sign out
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar className="border-b-2">
        <Logo className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white tracking-wide" />

        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="flex gap-2 md:order-2 items-center">
          <Button
            className="w-12 h-10 flex"
            color="gray"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>

          {currentUser ? (
            <Dropdown
              size="10px"
              outline
              arrowIcon={false}
              gradientDuoTone="redToYellow"
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePhoto}
                  rounded
                  size="sm"
                  className="w-10 h-10 z-20"
                />
              }
            >
              <Dropdown.Header className="z-20 ">
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item icon={MdDashboard} className="z-20">
                  Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item
                icon={FaSignOutAlt}
                onClick={handleSignOut}
                className="z-20"
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <motion.div
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              animate="show"
            >
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            </motion.div>
          )}

          <NavbarToggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link as={"div"} active={path === "/"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link as={"div"} active={path === "/about"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link as={"div"} active={path === "/projects"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
          <Navbar.Link as={"div"} active={path === "/contact"}>
            <Link to="/contact">Contact Me</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </motion.header>
  );
};

export default Header;
