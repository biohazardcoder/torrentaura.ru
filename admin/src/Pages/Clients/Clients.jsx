import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../Axios';
import { getClientPending, getClientError, getClientSuccess } from '../../Toolkit/ClientsSlicer';
import { Trash2 } from "lucide-react";

function Clients() {
  const { data, isPending, isError } = useSelector((state) => state.clients);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllClients = async () => {
      dispatch(getClientPending());
      try {
        const response = await Axios.get('client');
        const clients = response.data;
        dispatch(getClientSuccess(clients));
      } catch (error) {
        dispatch(getClientError(error.response?.data?.message));
      }
    };
    getAllClients();
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await Axios.delete(`client/${_id}`);
      dispatch(getClientSuccess(data.filter((client) => client._id !== _id)));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting client:', error.response?.data?.message || 'Error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  //Styles:
  const PeddingTd = "py-3 px-4 border-b border-gray-800";
  const PeddingDiv = "bg-gray-600 rounded";
  const DataTableTrTh = "py-4 px-6 text-left font-semibold"
  const DataMapTableTr = "  py-2 px-6 text-gray-700"

  return (
    <div className="p-8 bg-green-100 max-h-screen overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-3xl text-black">Clients [ {data.length} ]</h1>
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
      ) : data?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-sidebarBg text-white">
              <tr>
                <th className={DataTableTrTh}>Avatar</th>
                <th className={DataTableTrTh}>First Name</th>
                <th className={DataTableTrTh}>Last Name</th>
                <th className={DataTableTrTh}>Phone Number</th>
                <th className={DataTableTrTh}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((client) => (
                <tr key={client._id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="py-2 px-6">
                    <img src={client.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-highlight" />
                  </td>
                  <td className={DataMapTableTr}>{client.firstName}</td>
                  <td className={DataMapTableTr}>{client.lastName}</td>
                  <td className={DataMapTableTr}>{client.phoneNumber}</td>
                  <td className="py-2 px-6 ">
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="bg-red-600 text-white rounded-md p-1 hover:bg-red-700"
                    >
                      <Trash2 className="text-white text-xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="py-4 px-6 text-center text-gray-600">No clients found</h1>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this client?</p>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;



