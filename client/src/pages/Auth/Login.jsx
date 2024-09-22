import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import Axios from "../../Axios";
import { SiGamejolt } from "react-icons/si";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await Axios.post("client/login", {
        password,
        phoneNumber: +phone,
      });

      Cookies.set("token", data.token, { secure: true, expires: 7 });
      alert("Login has been successfully");
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Styles
  const styles = {
    container: "col-span-6 row-span-11 bg-mainText flex items-center justify-center",
    card: "bg-hoverBg shadow-lg rounded-lg p-8 w-full max-w-md",
    title: "flex items-center justify-center border-b-4 p-3 gap-3 mb-6",
    logo: "text-3xl text-accent text-mainText hover:text-highlight transition-colors duration-300 ease-in-out",
    header: "text-2xl font-semibold text-mainText tracking-wide hover:text-highlight transition-colors duration-300 ease-in-out",
    form: "flex flex-col gap-6",
    inputContainer: "bg-sidebarBg border border-mainText rounded-lg overflow-hidden",
    input: "p-3 outline-none w-full bg-sidebarBg text-mainText placeholder-gray-400",
    passwordContainer: "relative",
    passwordInput: "border border-mainText p-3 w-full rounded-lg bg-sidebarBg text-mainText placeholder-gray-400",
    eyeIcon: "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer",
    errorText: "text-red-500 text-sm mt-2",
    registerText: "text-mainText",
    registerLink: "text-highlight font-semibold hover:underline ml-1",
    button: `bg-sidebarBg py-2 text-mainText rounded-lg font-semibold shadow-md hover:bg-highlight transition-all duration-300 ease-in-out`,
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <span className={styles.logo}>
            <SiGamejolt />
          </span>
          <h1 className={styles.header}>Torrent Aura</h1>
        </div>
        <form className={styles.form} onSubmit={handleLogin}>
          <h1 className="text-3xl font-semibold text-mainText font-sans">Login</h1>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.passwordContainer}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className={styles.passwordInput}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.eyeIcon} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <EyeSlash size={24} color="#fff" /> : <Eye size={24} color="#fff" />}
            </div>
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <h1 className={styles.registerText}>
            If you don't have an account:
            <a href="/register" className={styles.registerLink}>
              Register here!
            </a>
          </h1>
          <button
            type="submit"
            className={`${styles.button} ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};
