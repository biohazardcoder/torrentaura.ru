import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

export const CreateAdmin = () => {
  const [createAdminData, setcreateAdminData] = useState({
    phoneNumber: "",
    password: "" ,
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcreateAdminData((adminData) => ({ ...adminData, [name]: value }));
  };

 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/admin/create", {
      phoneNumber: createAdminData.phoneNumber,
      password: createAdminData.password ,
      firstName: createAdminData.firstName,
      lastName: createAdminData.lastName,
      });
      alert("New Admin added")
      navigate("/admins")
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Section>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-4 w-full mx-auto mt-14 md:w-[500px]"
      >
        <h1 className="text-4xl text-center">New Product</h1>
        <input
          type="text"
          name="firstName"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="number"
          name="phoneNumber"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="password"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-green-700 w-full text-xl py-2 rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </Section>
  );
};
