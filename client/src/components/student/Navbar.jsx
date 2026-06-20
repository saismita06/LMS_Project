import React from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const isCoursesListPage = location.pathname.includes("/course-list");

  const {
    backendUrl,
    isEducator,
    setIsEducator,
    navigate,
    getToken,
  } = useAppContext();

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (!user) {
        return openSignIn();
      }

      // If already an educator, just navigate to the dashboard
      if (isEducator) {
        return navigate("/educator");
      }

      const token = await getToken();

      // ✅ Calling the role update API
      const { data } = await axios.get(
        `${backendUrl}/api/educator/update-role`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
        navigate("/educator");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 ${
        isCoursesListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="LMS Logo"
        className="w-28 lg:w-32 cursor-pointer active:scale-95 transition-transform"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
        {user && (
          <>
            <button 
              onClick={becomeEducator} 
              className="hover:text-blue-600 transition-colors"
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <div className="h-5 w-[1px] bg-gray-300"></div>
            <Link to="/my-enrollments" className="hover:text-blue-600 transition-colors">
              My Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/"/>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-7 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-sm active:scale-95"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3 text-gray-600">
        {user && (
          <>
            <button onClick={becomeEducator} className="text-sm font-semibold text-blue-600">
              {isEducator ? "Dashboard" : "Educator"}
            </button>
            <div className="h-4 w-[1px] bg-gray-300"></div>
            <Link to="/my-enrollments" className="text-sm font-semibold">
              Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/"/>
        ) : (
          <button onClick={() => openSignIn()} aria-label="Sign In">
            <img src={assets.user_icon} alt="User Profile" className="w-9" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;