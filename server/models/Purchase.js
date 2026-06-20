import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    courseId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    userId: {
        type: String, // Clerk User ID (e.g., user_38Ne...)
        ref: 'User',  // Points to User model
        required: true
    },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }

}, { timestamps: true });

export const Purchase = mongoose.model('Purchase', PurchaseSchema);