import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { Section } from "../../Components/Section/Section";
import { Statistics } from "../../modules/Statistics/Statistics";
import Axios from "../../Axios";

export const Dashboard = () => {
  const { data } = useSelector((state) => state.user);
  const [gameCount, setGameCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [adminsCount, setadminsCount] = useState(0);
  const { avatar } = data;

  function Logout() {
    if (!window.confirm("Are you sure you want to logout")) return;
    Cookies.remove("token");
    window.location.href = "/";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesResponse = await Axios.get("/product");
        setGameCount(gamesResponse.data.data.length);

        const clientsResponse = await Axios.get("/client");
        setClientCount(clientsResponse.data.length);

        const AdminsResponse = await Axios.get("/admin");
        setadminsCount(AdminsResponse.data.data.length);
      } catch (error) {
        console.error("Failed to fetch statistics data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Section className="bg-dashboardBg overflow-y-scroll max-h-screen py-8 px-6">
      <div className="flex justify-between items-center mb-8">
        <Link to={`/edit-admin/${data._id}`} className="flex items-center space-x-3 group">
          <div className="relative">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-14 h-14 rounded-full border-4 border-accent shadow-lg group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dashboardBg rounded-full shadow-md"></span>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-sidebarBg group-hover:text-accent transition-colors duration-300">
              Welcome, {data.firstName}
            </h2>
            <p className="text-sm text-gray-500">Edit your profile</p>
          </div>
        </Link>

        <button
          onClick={Logout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 ease-in-out hover:shadow-xl"
        >
          Logout <LogOut size={18} />
        </button>
      </div>

      <Statistics gameCount={gameCount} adminsCount={adminsCount} clientCount={clientCount} />
    </Section>
  );
};
