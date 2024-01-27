import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value.trim(),
    }));
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setIsLoading(false);
        return setErrorMessage(data.message);
      }

      setIsLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="max-h-screen mt-20">
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Enter Username"
                id="username"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter Email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter Password"
                id="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div>
            <span>Have an account?</span>{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
