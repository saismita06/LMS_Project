import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ✅ clerkUserId ko hi _id bana diya taaki population fail na ho
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "New User",
    },
    email: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["student", "educator", "admin"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course",
      },
    ],
  },
  { timestamps: true, _id: false } // 👈 _id: false zaroori hai kyunki hum String use kar rahe hain
);

export default mongoose.model("User", userSchema);
