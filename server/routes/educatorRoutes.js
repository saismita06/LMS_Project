import express from 'express'
import { 
    addCourse, 
    educatorDashboardData, 
    getEducatorCourses, 
    getEnrolledStudentsData, 
    updateRoleToEducator 
} from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

// ✅ Become an educator (Route: GET /api/educator/update-role)
// Note: This is a GET request because you're calling it via simple link/redirect
educatorRouter.get('/update-role', updateRoleToEducator);

// ✅ Add a new course (Route: POST /api/educator/add-course)
// Uses Multer for the 'image' field and protects the route so only educators can post
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);

// ✅ View courses created by the educator (Route: GET /api/educator/courses)
educatorRouter.get('/courses', protectEducator, getEducatorCourses);

// ✅ Get stats for the dashboard (Route: GET /api/educator/dashboard)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);

// ✅ View students enrolled in their courses (Route: GET /api/educator/enrolled-students)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

export default educatorRouter;