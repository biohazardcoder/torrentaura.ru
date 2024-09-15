import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../../Toolkit/AdminsSlicer";
import { Trash2 } from "lucide-react";

export const Admins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isPending, isError } = useSelector((state) => state.admins);

  useEffect(() => {
    const getAllAdmins = async () => {
      dispatch(getAdminsPending());
      try {
        const response = await Axios.get("admin");
        dispatch(getAdminsSuccess(response.data?.data || []));
      } catch (error) {
        dispatch(
          getAdminsError(error.response?.data?.message || "Unknown error")
        );
      }
    };
    getAllAdmins();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await Axios.delete(`admin/${id}`);
      dispatch(getAdminsSuccess(data.filter((admin) => admin._id !== id)));
      alert("Admin Deleted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete admin");
    }
  };
  //Style :
  const PendingTd = "py-3 px-6 border-b border-green-800"
  const PendingDiv = "bg-gray-600 rounded"
  const DataTableTrTh = "py-4 px-6 text-left font-semibold"
  const DataMapTableTd = "py-1 px-6 border-b border-green-800"

  return (
    <div className="p-8 bg-green-100 max-h-screen overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-3xl text-black">Admins [ {data.length} ]</h1>
        <button
          onClick={() => navigate("/create-admin")}
          className="bg-sidebarBg text-white px-4 py-2 rounded shadow hover:bg-highlight duration-400 transition-colors"
        >
          Create Admin
        </button>
      </div>

      {isPending ? (
        <table width={"100%"}>
          <tbody>
            {Array.from({ length: 1 }).map((_, index) => (
              <tr key={index} className="bg-gray-500 animate-pulse">
                <td className={PendingTd}>
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                </td>
                <td className={PendingTd}>
                  <div className={`w-24 h-4 ${PendingDiv}`}></div>
                </td>
                <td className={PendingTd}>
                  <div className={`w-24 h-4 ${PendingDiv}`}></div>
                </td>
                <td className={PendingTd}>
                  <div className={`w-32 h-4 ${PendingDiv}`}></div>
                </td>
                <td className={`${PendingTd} text-center`}>
                  <div className={`w-6 h-6 ${PendingDiv}`}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Error: {isError}</p>
      ) : data.length > 0 ? (
        <table className="min-w-full bg-sidebarBg text-white shadow-lg">
          <thead className="bg-sidebarBg">
            <tr>
              <th className={DataTableTrTh}>Avatar</th>
              <th className={DataTableTrTh}>First Name</th>
              <th className={DataTableTrTh}>Last Name</th>
              <th className={DataTableTrTh}>Phone Number</th>
              <th className={DataTableTrTh}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {data.map((admin) => (
              <tr
                key={admin._id}
                className="hover:bg-slate-200 transition-colors"
              >
                <td className={DataMapTableTd}>
                  <img
                    src={
                      admin.avatar ||
                      "https://st3.depositphotos.com/5852012/15878/v/450/depositphotos_158781058-stock-illustration-photo-gallery-flat-icon-with.jpg"
                    }
                    alt="Avatar"
                    className="w-12 h-12 mt-1 rounded-full object-cover border-2 border-highlight"
                  />
                </td>
                <td className={DataMapTableTd}>
                  {admin.firstName}
                </td>
                <td className={DataMapTableTd}>
                  {admin.lastName}
                </td>
                <td className={DataMapTableTd}>
                  {admin.phoneNumber}
                </td>
                <td className="py-1 px-4 border-b border-green-800 text-center">
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-600 text-white rounded-md p-1 hover:bg-red-700"
                  >
                    <Trash2 className="text-white text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          No admins found.
        </p>
      )
      }
    </div >
  );
};
