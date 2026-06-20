import Course from "../models/Course.js";

// ✅ 1. Get All Courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find()
      .select(['-courseContent', '-enrolledStudents'])
      .populate({ path: 'educator', select: '-password' });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ 2. Get Course by Id (Renamed to match route import)
// controllers/courseController.js
export const getCourseId = async (req, res) => {
  try {
    const { id } = req.params; 

    // ✅ Use findById directly. Since your test ID is a string, 
    // it will work as long as the document exists in MongoDB with that _id.
    const course = await Course.findById(id).populate({
        path: 'educator',
        select: '-password'
    });

    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: "Course not found" 
      });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
