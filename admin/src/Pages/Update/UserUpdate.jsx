import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { Section } from "../../Components/Section/Section";

export const UserUpdate = () => {
  const { data } = useSelector((state) => state.user);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    avatar: data.avatar,
    phoneNumber: data.phoneNumber,
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.put(`admin/${id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: formData.avatar,
        phoneNumber: formData.phoneNumber,
        password: formData.newPassword,
      });
      alert("Updated!")
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  //Styles :
  const FormInput = "p-4 outline-none border border-mainText rounded-lg bg-sidebarBg text-mainText placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-all"
  const LinkStyle = "text-mainText rounded-lg py-2 px-4  font-semibold transition-all"

  return (
    <Section className="bg-dashboardBg flex flex-col justify-center items-center h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-mainBg p-8 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-center text-2xl font-bold text-mainText">Update Admin</h1>
        <input
          className={FormInput}
          type="text"
          placeholder="Firstname"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          className={FormInput}
          type="text"
          placeholder="Lastname"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          className={FormInput}
          type="number"
          placeholder="Phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          className={FormInput}
          type="password"
          placeholder="New password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
        />
        <div className="flex justify-between gap-4">
          <Link
            to="/"
            className={`bg-hoverBg  text-center ${LinkStyle} hover:text-orange-500`}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className={`bg-accent  ${LinkStyle} shadow-md hover:bg-highlight`}
          >
            Save
          </button>
        </div>
      </form>
    </Section>
  );
};
