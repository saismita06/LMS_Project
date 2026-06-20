import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { getToken } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/course/${courseId}`);
      const data = await res.json();
      if (data.success) {
        setCourse(data.course);
      } else {
        toast.error(data.message || "Course not found");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourseData(); }, [courseId]);

  const handleBuyCourse = async () => {
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (err) {
      toast.error("Network error: Is the backend running?");
    }
  };

  // ✅ HELPER: This is the most important part for fixing your broken images
  const getThumbnailSrc = (path) => {
    if (!path) return "https://placehold.co/600x400?text=No+Thumbnail";
    
    // If the path starts with http, it's a CDN link (e.g., Udemy/Unsplash)
    if (path.startsWith('http')) return path;

    // If it's a local path like "/uploads/img.png", point it to your Express backend
    if (path.startsWith('/uploads')) return `http://localhost:5000${path}`;

    // fallback for the "/src/assets/..." paths in your MongoDB
    return "https://placehold.co/600x400?text=Update+DB+Path";
  };

  if (loading) return <p className="text-center mt-20 text-xl font-medium">Loading details...</p>;
  if (!course) return <p className="text-center mt-20 text-xl">Course not found</p>;

  return (
    <>
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{course.courseTitle}</h1>
            <p className="text-lg text-gray-600">{course.courseDescription}</p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Beginner Friendly</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Lifetime Access</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Certificate Included</span>
            </div>
            <h2 className="text-xl font-semibold pt-4">What you’ll learn</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
              <li>✔ Modern web development</li>
              <li>✔ Professional best practices</li>
              <li>✔ Hands-on coding projects</li>
              <li>✔ Advanced problem solving</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
            <img 
              src={getThumbnailSrc(course.courseThumbnail)} 
              alt={course.courseTitle} 
              className="rounded-xl mb-5 w-full aspect-video object-cover shadow-sm"
              onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"; }} 
            />
            <p className="text-3xl font-bold mb-4 text-gray-900">₹{course.coursePrice}</p>
            <button
              onClick={handleBuyCourse}
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              Enroll Now
            </button>
            <p className="text-center text-sm text-gray-400 mt-4">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;