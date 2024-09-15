import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

export const CreateAdmin = () => {
  const [createAdminData, setcreateAdminData] = useState({
    phoneNumber: "",
    password: "",
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
        password: createAdminData.password,
        firstName: createAdminData.firstName,
        lastName: createAdminData.lastName,
      });
      alert("New Admin Added!")
      navigate("/admins")
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //Styles : 
  const FormInput = "border border-gray-300 rounded-md p-2 w-full"
  return (
    <Section className="bg-dashboardBg flex flex-col justify-center items-center h-screen p-4">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-mainBg p-8 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-center text-2xl font-bold text-mainText">New Product</h1>
        <input
          type="text"
          name="firstName"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="number"
          name="phoneNumber"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="password"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-highlight w-full text-xl py-2 rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </Section>
  );
};
