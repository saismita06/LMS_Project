import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import User from "../models/User.js";

// Helper to get user (Internal use only)
const getUserFromRequest = async (req) => {
  const clerkUserId = req.auth?.userId;
  if (!clerkUserId) return null;
  return await User.findOne({ clerkUserId });
};

export const getUserData = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const user = await User.findOne({ clerkUserId });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const userEnrolledCourses = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const user = await User.findOne({ clerkUserId }).populate("enrolledCourses");

    if (!user) return res.status(404).json({ success: false });

    // Fetch progress for each course to calculate percentage on frontend
    const enrolledCoursesWithProgress = await Promise.all(
      user.enrolledCourses.map(async (course) => {
        const progress = await CourseProgress.findOne({
          userId: user._id,
          courseId: course._id,
        });
        return {
          ...course._doc,
          completedLectures: progress ? progress.lectureCompleted : [],
        };
      })
    );

    res.status(200).json({ success: true, enrolledCourses: enrolledCoursesWithProgress });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const updateUserCourseProgress = async (req, res) => {
  try {
    const user = await getUserFromRequest(req);
    const { courseId, lectureId } = req.body;

    let progress = await CourseProgress.findOne({ userId: user._id, courseId });

    if (!progress) {
      progress = await CourseProgress.create({
        userId: user._id,
        courseId,
        lectureCompleted: [lectureId],
      });
    } else if (!progress.lectureCompleted.includes(lectureId)) {
      progress.lectureCompleted.push(lectureId);
      await progress.save();
    }

    res.json({ success: true, message: "Progress updated" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// Placeholder for remaining logic
export const purchaseCourse = async (req, res) => { /* your stripe logic */ };
export const getUserCourseProgress = async (req, res) => { /* your get logic */ };

// ✅ THIS WAS LIKELY MISSING OR MISNAMED
export const addUserRating = async (req, res) => {
  try {
    const user = await getUserFromRequest(req);
    const { courseId, rating } = req.body;
    // Add rating logic here
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};




