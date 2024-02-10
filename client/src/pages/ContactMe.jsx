import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import contact from "../assets/contact1.png";

const ContactMe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
    user_mobile: 0,
  });

  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          setStateMessage("Something went wrong, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        }
      );

    // Clears the form after sending the email
    e.target.reset();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl md:text-6xl mt-20 font-serif text-gray-600 dark:text-gray-200">
        Contact Me
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* contact details */}
        <Card className="flex-1 py-10 bg-gradient-to-br hover:bg-gradient-to-tr from-gray-200 via-gray-50 to-white dark:from-[#1f2937] dark:via-[#2c3a4d] dark:shadow-2xl shadow-xl">
          <img />
        </Card>

        {/* contact form */}
        <Card className="flex-1 py-10 bg-gradient-to-br hover:bg-gradient-to-tr from-gray-200 via-gray-50 to-white dark:from-[#1f2937] dark:via-[#2c3a4d] dark:shadow-2xl shadow-xl">
          <form onSubmit={sendEmail} className="flex flex-col  gap-2">
            <div className="flex flex-col gap-3">
              <Label>
                <span className="text-red-400">*</span>Name:
              </Label>
              <TextInput
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Enter your Name."
                required
              />
            </div>
            <Label>
              <span className="text-red-400">*</span>Email
            </Label>
            <TextInput
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            <Label>
              <span className="text-red-400">*</span>Mobile Number:
            </Label>
            <TextInput
              type="number"
              name="user_mobile"
              value={formData.user_mobile}
              onChange={handleChange}
              required
            />
            <Label>
              <span className="text-red-400">*</span>Message
            </Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Leave a message"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2"
              gradientDuoTone="purpleToPink"
            >
              Submit
            </Button>
            {stateMessage && <p>{stateMessage}</p>}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactMe;
