import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = ({ bgColor }) => {

  // ✅ FIXED: Use the custom hook directly instead of useContext(AppContext)
  const { isEducator } = useAppContext();
  const { user } = useUser();

  // This Navbar only shows if the user is an educator and is logged in
  return isEducator && user && (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ${bgColor}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi! {user.fullName || "Educator"}</p>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;