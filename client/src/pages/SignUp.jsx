import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-4 md:gap-10 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="text-center flex-1">
          <Link
            to="/"
            className="text-2xl md:text-4xl font-semibold dark:text-white tracking-wide"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white ">
              Gyanendra's
            </span>
            PortFolio
          </Link>
          <p className="text-sm mt-5">
            This is my Portfolio project. You can sign up with your email and
            password or Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1 flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Enter Username"
                id="username"
                required
              />
            </div>

            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter Email"
                id="email"
                required
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput
                type="text"
                placeholder="Enter Password"
                id="password"
                required
              />
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>

          <div>
            <span>Have an account?</span>{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
