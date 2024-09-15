import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

export const AddGame = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    console: "",
    created: "",
    category: "",
    company: "",
    system: "",
    trailer: "",
    file: "",
    photos: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("photos", files[i]);
      }
      const { data } = await Axios.post("/upload", formImageData);
      setProductData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...data.photos],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/product/create", {
        title: productData.title,
        description: productData.description,
        console: productData.console,
        created: productData.created,
        category: productData.category,
        company: productData.company,
        system: productData.system,
        trailer: productData.trailer,
        file: productData.file,
        photos: productData.photos,
      });
      alert("New Game Added!");
      navigate("/games");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //Style :
  const InputStyle = "border border-gray-300 rounded-md p-2 w-full mt-4"
  const DivInput = "border text-mainText border-gray-300 rounded-md p-2 w-full"
  const DivLabel = "block text-sm font-medium text-mainText mb-2"
  return (
    <Section className="bg-dashboardBg flex  justify-center  h-[95%] p-2 pb-10">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-lg bg-mainBg p-4 rounded-lg shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-center text-2xl font-bold text-mainText mb-4">
          Add New Product
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="title"
              className={InputStyle} value={productData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              className={InputStyle}
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="console"
              className={InputStyle}
              value={productData.console}
              onChange={handleInputChange}
              placeholder="Console"
              required
            />
            <input
              type="number"
              name="created"
              className={InputStyle}
              value={productData.created}
              onChange={handleInputChange}
              placeholder="Created Year"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="category"
              className={InputStyle} value={productData.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
            <textarea
              type="text"
              name="system"
              className={InputStyle}
              value={productData.system}
              onChange={handleInputChange}
              placeholder="System"
              required
            />
            <input
              type="text"
              name="company"
              className={InputStyle}
              value={productData.company}
              onChange={handleInputChange}
              placeholder="Company"
              required
            />
            <input
              type="text"
              name="trailer"
              className={InputStyle}
              value={productData.trailer}
              onChange={handleInputChange}
              placeholder="Trailer URL"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={DivLabel}>File Upload:</label>
          <input
            type="file"
            name="file"
            className={DivInput}
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className={DivLabel}>Photos Upload:</label>
          <input
            type="file"
            name="photos"
            className={DivInput}
            multiple
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="bg-highlight w-full text-xl py-2 rounded-md text-white mt-6"
        >
          Submit
        </button>
      </form>
    </Section>
  );
};
