import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Course from "../models/Course.js";
import User from "../models/User.js"; 
import { Purchase } from "../models/Purchase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ 1. Create Stripe Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID missing" });
    }

    let course = await Course.findById(courseId);

    // Fallback for dummy data
    if (!course) {
      course = {
        _id: courseId, 
        courseTitle: "Introduction to JavaScript",
        coursePrice: 49.99
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: course.courseTitle },
            unit_amount: Math.round(course.coursePrice * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/success?courseId=${courseId}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};

// ✅ 2. Enroll User After Successful Payment
export const enrollAfterPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Use req.auth() function call
    const auth = req.auth(); 
    const userId = auth.userId;

    if (!courseId || !userId) {
      return res.status(400).json({ success: false, message: "Required data missing" });
    }

    /**
     * ✅ THE CRITICAL FIX:
     * We target the _id but ALSO set clerkUserId to satisfy the index.
     * We use $setOnInsert so that if the user is NEW, we give them basic info.
     */
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { 
        $addToSet: { enrolledCourses: courseId },
        $set: { clerkUserId: userId }, // Satifies the unique index
        $setOnInsert: { 
          name: "Student", 
          email: "user@clerk.dev", // Default placeholder
          role: "student" 
        }
      },
      { new: true, upsert: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User processing failed" });
    }

    // Record the purchase
    const course = await Course.findById(courseId);
    
    // Avoid double-creating purchase records if the page is refreshed
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (!existingPurchase) {
      await Purchase.create({
        courseId,
        userId,
        amount: course ? course.coursePrice : 0,
        status: "completed"
      });
    }

    console.log("✅ Enrollment successful for:", userId);
    res.status(200).json({ success: true, message: "Enrolled successfully" });

  } catch (err) {
    console.error("DETAILED ERROR 👉", err.message);
    
    if (err.code === 11000) {
        return res.status(400).json({ 
            success: false, 
            message: "Database Conflict: Please delete the existing user in MongoDB and try again." 
        });
    }

    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
};