import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, setIsLoggedIn, backendURL , setUserData } = useContext(UserContext);

  const isLoginPage = location.pathname === "/login"; 
  const isHomePage = location.pathname === "/"; 

  const logout = async () => {
    try {
      const response = await axios.post(backendURL + "/api/user/logout", {}, { withCredentials: true });
      if (response.data.success) {
        toast.success("Logged Out Successfully!");
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="shadow-md shadow-black bg-[#1b363b] py-2 px-8 sm:py-5 sm:px-16">
      <nav className="flex justify-between items-center">
        <h1 className="font-bold text-lg sm:text-3xl text-slate-200">BHALI</h1>

        {isLoggedIn ? (
          <button
            onClick={logout}
            className="border border-gray-950 bg-slate-200 rounded-full px-3 py-1 sm:py-2 sm:px-5 text-gray-900 text-normal sm:text-lg font-base sm:font-medium"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate(isLoginPage ? "/" : "/login")}
            className="border border-gray-950 bg-slate-200 rounded-full px-3 py-1 sm:py-2 sm:px-5 text-gray-900 text-normal sm:text-lg font-base sm:font-medium"
          >
            {isLoginPage ? "Go to Home" : "Login"}
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
