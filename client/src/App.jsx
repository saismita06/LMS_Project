import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/student/Navbar';
import Home from './pages/student/Home';
import CourseDetails from './pages/student/CourseDetails';
import CoursesList from './pages/student/CoursesList';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Educator from './pages/educator/Educator';
import Player from './pages/student/Player';
import MyEnrollments from './pages/student/MyEnrollments';
import Loading from './components/student/Loading';
import PaymentSuccess from './pages/student/PaymentSuccess';
import PaymentCancel from './pages/student/PaymentCancel';

import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const location = useLocation();
  const isEducatorRoute = location.pathname.startsWith('/educator');

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />

      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* ===== STUDENT ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* ✅ MATCHING THE STRIPE REDIRECT URL */}
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />

        {/* ===== EDUCATOR ROUTES ===== */}
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>

        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-2xl font-bold text-gray-800">
              Page Not Found
            </h1>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

