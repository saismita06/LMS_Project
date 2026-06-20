import express from "express";
import { protectUser } from "../middlewares/authMiddleware.js";
import { 
    createCheckoutSession, 
    enrollAfterPayment 
} from "../controllers/paymentController.js";

const router = express.Router();

// Test Route
router.get("/test", (req, res) => res.send("Payment route is working!"));

// ✅ Route to start checkout
router.post("/checkout", protectUser, createCheckoutSession);

// ✅ Route to finalize enrollment (Called by PaymentSuccess.jsx)
router.post("/success", protectUser, enrollAfterPayment);

export default router;


