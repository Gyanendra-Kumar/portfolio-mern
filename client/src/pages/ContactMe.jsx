import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

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
      <h1 className="text-center mt-20 text-6xl text-gray-600 font-serif dark:text-gray-200">
        Contact Me
      </h1>
      <div className="flex flex-col lg:flex-row">
        {/* contact details */}
        <Card></Card>

        {/* contact form */}
        <Card>
          <form onSubmit={sendEmail} className="flex flex-col mt-6 w-[50%]">
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
            />
            <label>Mobile Number:</label>
            <input
              type="number"
              name="user_mobile"
              value={formData.user_mobile}
              onChange={handleChange}
            />
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            {stateMessage && <p>{stateMessage}</p>}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactMe;
