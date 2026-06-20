import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

// Config
dotenv.config();

// Models
import Course from "./models/Course.js";
import User from "./models/User.js";
import { Purchase } from "./models/Purchase.js";

// Routes
import userRouter from "./routes/userRoutes.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import educatorRouter from "./routes/educatorRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ✅ Use Clerk Middleware
app.use(clerkMiddleware());

app.use('/uploads', express.static('uploads'));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/educator", educatorRouter);

// Seeding logic (Keep your dummyCourses array here...)
const dummyCourses = [ /* Your existing dummyCourses data */ ];

const seedDatabase = async () => {
  try {
    const educatorId = "user_38NeNx7Rj3vJdJrEn0gS8qEZjyT";

    // Seed Educator
    await User.findByIdAndUpdate(
      educatorId,
      { _id: educatorId, name: "Saismita Jena", email: "educator@test.com", role: "educator" },
      { upsert: true }
    );

    // Seed Courses
    for (const courseData of dummyCourses) {
      await Course.findByIdAndUpdate(courseData._id, { ...courseData, educator: educatorId }, { upsert: true });
    }

    console.log("🚀 Success: Database Seeded!");
  } catch (error) {
    console.error("❌ Seed error:", error.message);
  }
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedDatabase();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));