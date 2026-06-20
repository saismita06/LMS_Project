import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [userData, setUserData] = useState(null);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Function to calculate average rating
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const fetchUserData = async () => {
    if (!isSignedIn) return;
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success) {
        setUserData(data.user);
        setIsEducator(data.user?.role === "educator");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setEnrolledCourses(data.enrolledCourses);
    } catch {
      toast.error("Failed to load enrolled courses");
    }
  };

  const currency = "$";

  useEffect(() => {
    if (isLoaded && isSignedIn) fetchUserData();
  }, [isLoaded, isSignedIn]);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        userData,
        setUserData,
        isEducator,
        setIsEducator,
        isSignedIn,
        getToken,
        navigate,
        enrolledCourses,
        setEnrolledCourses,
        fetchUserEnrolledCourses,
        currency,
        calculateRating, // Added to provider value
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return ctx;
};