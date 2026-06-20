import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  
  // 1. Use a Ref to prevent double-calling the API in Strict Mode
  const enrollmentProcessed = useRef(false);
  const courseId = params.get("courseId");

  useEffect(() => {
    const finalizeEnrollment = async () => {
      // Prevent running this function more than once
      if (enrollmentProcessed.current) return;
      enrollmentProcessed.current = true;

      try {
        const token = await getToken();
        
        const res = await fetch("http://localhost:5000/api/payment/success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Enrolled successfully!");
          navigate("/my-enrollments");
        } else {
          // If the error is "User Not Found", it's a backend sync issue
          toast.error(data.message || "Enrollment failed");
          navigate("/");
        }
      } catch (err) {
        console.error("Error finalizing payment:", err);
        toast.error("An error occurred during enrollment.");
        navigate("/");
      }
    };

    if (courseId) {
      finalizeEnrollment();
    } else {
      // If no courseId is present, the URL is invalid
      toast.error("Invalid payment session.");
      navigate("/");
    }
  }, [courseId, getToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <h1 className="text-2xl font-semibold text-gray-800">Finalizing your enrollment...</h1>
      <p className="text-gray-500 mt-2">Please do not refresh or close this page.</p>
    </div>
  );
};

export default PaymentSuccess;