import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import contact from "../assets/contact1.avif";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import Img from "../components/Img";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

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
          setStateMessage("Thank you for contacting me.");
          setIsSubmitting(false);
          setFormData({
            user_name: "",
            user_email: "",
            message: "",
            user_mobile: 0,
          });
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
    <div className="max-w-5xl mx-auto min-h-screen px-6 py-6">
      <motion.h1 className="text-center text-3xl md:text-6xl mt-14 font-serif text-gray-600 dark:text-gray-200">
        Contact Me
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* contact details */}
        <motion.div
          className="flex-1"
          variants={fadeIn("right", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          exit="exit"
        >
          <Card className="pb-6 cursor-pointer bg-gradient-to-br hover:bg-gradient-to-tr from-gray-200 via-gray-50 to-white dark:from-[#1f2937] dark:via-[#2c3a4d] dark:shadow-2xl shadow-xl group transition-transform duration-500 ease-in-out">
            <div className="overflow-hidden">
              <Img
                src={contact}
                alt="contact image"
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl tracking-wider font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Gyanendra Kumar
              </h2>
              <p className="tracking-wider">Associate System Engineer, IBM</p>
              <p className="tracking-wider">
                I am always available for Front-End Development work.
              </p>

              <p className="text-lg">
                <span className="font-semibold">Mobile: </span>+91-9611359759
              </p>
              <p className="text-lg group">
                <span className="font-semibold">Email: </span>
                <span className="text-lg font-semibold hover:border-b-2 hover:border-purple-500">
                  <a href={`mailto:kganendra1998@gmail.com`}>
                    kgyanendra1998@gmail.com
                  </a>
                </span>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* contact form */}
        <motion.div
          className="flex-2 lg:w-[60%]"
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          exit="exit"
        >
          <Card className="py-6 bg-gradient-to-br hover:bg-gradient-to-tr from-gray-200 via-gray-50 to-white dark:from-[#1f2937] dark:via-[#2c3a4d] dark:shadow-2xl shadow-xl">
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
              {stateMessage && <Alert color="success">{stateMessage}</Alert>}
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactMe;
