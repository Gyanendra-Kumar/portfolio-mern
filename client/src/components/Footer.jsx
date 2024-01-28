import React from "react";
import { Footer } from "flowbite-react";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const FooterComponent = () => {
  return (
    <Footer
      container
      className="border-t-8 border-teal-500 py-10 flex flex-col"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          {/* logo */}
          <div>
            <Logo className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white tracking-wide" />
          </div>

          <div className="grid grid-cols-2 gap-3 max-sm:mt-4 md:grid-cols-2 lg:grid-cols-3  sm:gap-6">
            <div>
              <Footer.Title
                title="About"
                className="text-green-500 font-bold underline tracking-wide"
              />
              <Footer.LinkGroup col>
                <Footer.Link as={"div"}>
                  <Link to="/about">About Me</Link>
                </Footer.Link>
                <Footer.Link as={"div"}>
                  <Link to="/projects">Projects</Link>
                </Footer.Link>
                <Footer.Link as={"div"}>
                  <Link to="/contact">Contact Me</Link>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title
                title="Follow Me"
                className="text-green-500 font-bold underline tracking-wide"
              />
              <Footer.LinkGroup col>
                <Footer.Link as={"div"}>
                  <Link
                    to="https://www.linkedin.com/in/gyanendra-kumar-22975b18b"
                    target="_blank"
                    className="flex gap-1 text-md items-center font-semibold"
                  >
                    <FaLinkedin size="20" className="text-[#0077B5]" /> LinkedIn
                  </Link>
                </Footer.Link>

                <Footer.Link as={"div"}>
                  <Link
                    to="mailto:kgyanendra1998@gmail.com"
                    className="flex gap-1 text-md items-center font-semibold"
                  >
                    <MdEmail size="20" className="text-[#BB001B]" />
                    Email
                  </Link>
                </Footer.Link>

                <Footer.Link as={"div"}>
                  <Link
                    to="https://github.com/Huski-commando/"
                    target="_blank"
                    className="flex gap-1 text-md items-center font-semibold"
                  >
                    <FaGithub size="20" className="text-black" />
                    GitHub
                  </Link>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title
                title="Contacts"
                className="text-green-500 font-bold underline tracking-wide"
              />
              <Footer.LinkGroup className="flex flex-col gap-4">
                <Footer.Link className="cursor-pointer">
                  +91-9611359579
                </Footer.Link>
                <Footer.Link as={"div"}>
                  <Link to="mailto:kgyanendra1998@gmail.com">
                    kgyanendra1998@gmail.com
                  </Link>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>

      <Footer.Divider />

      <div className="flex gap-4 sm:gap-0 sm:justify-between sm:px-10 w-full flex-col sm:flex-row ">
        <Footer.Copyright
          href="#"
          by="Gyanendra Kumar"
          year={new Date().getFullYear()}
          className="text-center"
        />

        <div className="flex gap-4 justify-center">
          <Link
            to="https://www.linkedin.com/in/gyanendra-kumar-22975b18b"
            target="_blank"
            className="flex gap-1 text-md items-center font-semibold text-[#0077B5]"
          >
            <FaLinkedin size="20" /> LinkedIn
          </Link>

          <Link
            to="https://github.com/Huski-commando/"
            target="_blank"
            className="flex gap-1 text-md items-center font-semibold"
          >
            <FaGithub size="20" />
            GitHub
          </Link>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
