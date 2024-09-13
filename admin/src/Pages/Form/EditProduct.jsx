import React, { useState, useEffect } from 'react';
import Axios from '../../Axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    colors: '',
    photos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await Axios.get(`/product/${id}`);
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error.response?.data?.message || error.message);
        setError('Error fetching product details.');
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append('photos', files[i]);
      }
      const { data } = await Axios.post('/upload', formImageData);
      setProductData((prevData) => ({
        ...prevData,
        photos: Array.isArray(prevData.photos) ? [...prevData.photos, ...data.photos] : [...data.photos],
      }));
    } catch (err) {
      console.error('Error uploading photos:', err);
      setError('Error uploading photos.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/product/${id}`, {
        title: productData.title || '',
        description: productData.description || '',
        price: +productData.price || 0,
        stock: +productData.stock || 0,
        category: productData.category || '',
        colors: productData.colors || '',
        photos: productData.photos || [],
      });
      alert('Product updated successfully');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error.response?.data?.message || error.message);
      setError('Error updating product.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-4 w-full mx-auto mt-14 md:w-[500px]"
      >
        <h1 className="text-4xl text-center">Edit Product</h1>

        <input
          type="text"
          name="title"
          value={productData.title}
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={productData.description}
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="stock"
          value={productData.stock}
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Stock"
        />
        <input
          type="text"
          name="category"
          value={productData.category}
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Category"
        />
        <input
          type="text"
          name="colors"
          value={productData.colors}
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Colors"
        />

        <input
          type="file"
          multiple
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="bg-green-700 w-full text-xl py-2 rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
