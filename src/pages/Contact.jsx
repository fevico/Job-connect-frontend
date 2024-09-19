import { useState, useEffect } from "react";
import { BiPhone } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import CustomButton from "@/components/CustomButton";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useSendMessageMutation } from "../redux/appData"; // Assuming this is the correct import

export default function Contact() {
  // Local state to manage form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Hook for sending message using mutation
  const [sendMessage, { isSuccess, isLoading, error }] =
    useSendMessageMutation();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the mutation function with form data
      await sendMessage(formData);
    } catch (err) {
      console.error("Message sending failed", err);
    }
  };

  // Notify on success or failure
  useEffect(() => {
    if (isSuccess) {
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } else if (error) {
      toast.error("Failed to send message. Please try again.");
    }
  }, [isSuccess, error]);

  return (
    <>
      <Helmet>
        <title>Contact Us - JobKonnectaNG</title>
        <meta name="description" content="Contact Us - JobKonnectaNG" />
        <meta name="keywords" content="contact, us, jobkonnecta, ng" />
        <meta name="author" content="JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col w-full lg:w-[40%] p-3">
          <h2 className="text-primary font-[800] text-[20px] lg:text-[32px] mt-5 lg:mt-[70px] text-left lg:pl-[50px]">
            Contact Us Today
          </h2>
          <p className="text-sm mb-[25px] lg:mb-[50px] text-left lg:pl-[50px]">
            Any questions? We’d be happy to help you!
          </p>
          <a
            href="tel:+2348157510679"
            className="w-[80%] mx-auto flex items-center gap-3 py-4 px-4 font-medium text-white justify-center border-[#ACD4FF] hover:bg-blue-500 rounded-md border-2 bg-primary mb-5"
          >
            <BiPhone /> +2348157510679
          </a>
          <div className="w-[80%] mx-auto flex items-center gap-1 py-4 px-10 font-medium text-white justify-center border-[#ACD4FF] hover:bg-blue-500 rounded-md border-2 bg-primary">
            <BsEnvelope className="w-6 h-6" />
            <span className="flex flex-col gap-1">
              jobkonnecta@gmail.com jobkonnecta.com.ng@outlook.com
            </span>
          </div>
          <div className="mt-4 w-[80%] mx-auto flex items-center gap-1 py-4 px-10 font-medium text-white justify-center border-[#ACD4FF] hover:bg-blue-500 rounded-md border-2 bg-primary">
            Ikeja, Lagos, Nigeria
          </div>
        </div>
        <div className="border-r-4 border-gray-300 h-[100vh] hidden lg:block"></div>
        <div className="flex flex-col gap-4 w-full lg:w-[60%] lg:mt-[100px]">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto"
          >
            <div className="flex flex-col items-start gap-1">
              <label>First Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label>Last Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label>Email Address</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label>Phone</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full lg:col-span-2">
              <label>Message</label>
              <textarea
                className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-2"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message..."
                required
              />
            </div>
            <div className="w-full lg:col-span-2 flex justify-end my-5">
              <CustomButton
                text={isLoading ? "Sending..." : "Send a Message"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
