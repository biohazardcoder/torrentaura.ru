import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const instance = axios.create({
    baseURL: "https://server-torrentaura-ru.onrender.com/",
    headers: {
        Authorization: token,
    },
});

export default instance;
