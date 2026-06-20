import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/user/enrolled-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.filter(item => item !== null));
      }
    } catch (error) {
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnrolledCourses(); }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <div className="md:px-36 px-8 pt-10 min-h-[70vh] pb-20 bg-white">
        <h1 className="text-3xl font-bold mb-8">My Enrollments</h1>
        <div className="grid grid-cols-1 gap-6">
          {enrolledCourses.map((item, index) => {
            const course = item.courseId || item;
            
            // --- MATH FIX ---
            const totalLectures = course.courseContent?.reduce((acc, chap) => acc + (chap.chapterContent?.length || 0), 0) || 0;
            const completedCount = item.completedLectures?.length || 0;
            const progress = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;

            return (
              <div key={index} className="border p-4 flex flex-col md:flex-row gap-6 items-center rounded-2xl shadow-sm">
                <div className="w-full md:w-48 h-28 flex-shrink-0">
                  <img
                    src={course.courseThumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded-xl border"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=480&auto=format&fit=crop"; }}
                  />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="font-bold text-xl">{course.courseTitle || "Course"}</h2>
                  <p className="text-sm text-gray-500 mb-4">{totalLectures} Lessons • {completedCount} Completed</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600">{progress}% Completed</span>
                  </div>
                  <Line percent={progress} strokeWidth={3} strokeColor="#2563eb" trailColor="#f1f5f9" />
                </div>
                <button onClick={() => navigate(`/player/${course._id}`)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
                  {progress > 0 ? "Continue" : "Start"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;