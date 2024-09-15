import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import {
  getProductError,
  getProductPending,
  getProductSuccess,
} from "../../Toolkit/ProductsSlicer";
import { Download, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Games = () => {
  const dispatch = useDispatch();
  const { data, isPending, isError } = useSelector((state) => state.products);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    console: '',
    created: '',
    category: '',
    company: '',
    system: '',
    trailer: '',
    like: 0,
    file: '',
    photos: [],
  });

  useEffect(() => {
    const getAllProducts = async () => {
      dispatch(getProductPending());
      try {
        const response = await Axios.get("product");
        dispatch(getProductSuccess(response.data?.data || []));
      } catch (error) {
        dispatch(
          getProductError(error.response?.data?.message || "Unknown error")
        );
      }
    };
    getAllProducts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await Axios.delete(`product/${id}`);
      dispatch(getProductSuccess(data.filter((product) => product._id !== id)));
      alert("Product deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const openModal = (game) => {
    setSelectedGame(game);
    setFormData(game);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();
      for (let key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file, index) => {
            formDataToSubmit.append(`photos[${index}]`, file);
          });
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }

      await Axios.put(`product/${selectedGame._id}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Product updated successfully");
      setIsModalOpen(false);
      dispatch(getProductSuccess(data.map((game) => game._id === selectedGame._id ? formData : game)));
    } catch (error) {
      alert("Failed to update product");
    }
  };

  //Styles:
  const PeddingTd = "py-3 px-4 border-b border-gray-800";
  const PeddingDiv = "bg-gray-600 rounded";
  const DataLengthTableTrTh = "py-3 px-6  border-b border-gray-700 text-left"
  const DataMapTableTr = "py-1 px-6 border-b border-gray-800"
  const DataEditInput = "border rounded px-3 py-2 w-full"

  return (
    <div className="p-8 bg-green-100 max-h-screen overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-3xl text-black">Games [ {data.length} ]</h1>
        <Link
          to={"/create-game"}
          className="bg-sidebarBg text-white px-4 py-2 rounded shadow hover:bg-highlight duration-400 transition-colors"
        >
          Create Game
        </Link>
      </div>

      {isPending ? (
        <table className="w-full">
          <tbody>
            {Array.from({ length: 1 }).map((_, index) => (
              <tr key={index} className="bg-gray-500 animate-pulse">
                <td className={PeddingTd}>
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                </td>
                <td className={PeddingTd}>
                  <div className={`w-24 h-4 ${PeddingDiv}`}></div>
                </td>
                <td className={PeddingTd}>
                  <div className={`w-32 h-4 ${PeddingDiv}`}></div>
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-center">
                  <div className={`w-6 h-6 ${PeddingDiv}`}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Error: {isError}</p>
      ) : data.length > 0 ? (
        <table className="min-w-full bg-white text-black shadow-lg">
          <thead className="bg-sidebarBg text-white">
            <tr>
              <th className={DataLengthTableTrTh}>
                Image
              </th>
              <th className={DataLengthTableTrTh}>
                Product Name
              </th>
              <th className={DataLengthTableTrTh}>
                Console
              </th>
              <th className="py-3 px-4 text-center border-b border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className={DataMapTableTr}>
                  <img
                    src={product.photos[1] ||
                      "https://st3.depositphotos.com/5852012/15878/v/450/depositphotos_158781058-stock-illustration-photo-gallery-flat-icon-with.jpg"
                    }
                    alt="Product"
                    className="w-12 h-12 mt-1 rounded-full object-cover border-2 border-highlight"
                  />
                </td>
                <td className={DataMapTableTr}>
                  {product.title}
                </td>
                <td className={DataMapTableTr}>
                  {product.console}
                </td>
                <td className="py-1 px-4 border-b border-gray-800 text-center ">
                  <div className="flex justify-center items-center gap-5">
                    <button onClick={() => openModal(product)}>
                      <Eye className="text-blue-600 text-xs text-center" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 text-white rounded-md p-1 hover:bg-red-700"
                    >
                      <Trash2 className="text-white text-xs" />
                    </button>
                    <a href={product.photos[0]} download>
                      <button
                        className="bg-green-500 text-white rounded-md p-1 hover:bg-green-700"
                      >
                        <Download className="text-white text-xs" />
                      </button>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          No products found.
        </p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto flex justify-center items-start z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 lg:w-1/2 mt-20">
            <h2 className="text-2xl mb-4">Edit Game - {selectedGame?.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2" htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="console">Console</label>
                <input
                  id="console"
                  type="text"
                  name="console"
                  value={formData.console}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="category">Category</label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="system">System</label>
                <input
                  id="system"
                  type="text"
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="trailer">Trailer</label>
                <input
                  id="trailer"
                  type="text"
                  name="trailer"
                  value={formData.trailer}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="created">Created</label>
                <input
                  id="created"
                  type="text"
                  name="created"
                  value={formData.created}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={DataEditInput}
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="file">File</label>
                <h1>{formData.photos[0]}</h1>
              </div>
            </div>
            <div className="col-span-2 mt-4  flex items-center gap-2">
              <label className="block mb-2 text-lg" htmlFor="preview-photo">Preview Photo:</label>
              {formData.photos[1] && (
                <div className="flex items-center gap-2">
                  <img
                    src={formData.photos[1]}
                    alt="Preview"
                    className="w-16 h-16 object-cover border rounded "
                  />
                </div>
              )}

            </div>
            <div className=" flex items-center gap-2 mt-4 flex-wrap">
              <label className="block mb-2 text-lg">Gameplay Photos:</label>
              {(Array.isArray(formData.photos) ? formData.photos.slice(2) : []).map((photo, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={photo}
                    alt={`Gameplay ${index + 1}`}
                    className="w-16 h-16 object-cover border rounded mr-2"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <label className="block mb-2 text-lg">Official Trailer:</label>
              <iframe
                width="100"
                className="mb-4"
                height="55"
                src={formData.trailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
