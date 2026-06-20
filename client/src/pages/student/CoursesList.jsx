import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../../components/student/CourseCard";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";

const CoursesList = () => {
  const { backendUrl } = useAppContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH REAL DATA FROM BACKEND
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="md:px-36 px-8 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">All Courses</h1>
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesList;




