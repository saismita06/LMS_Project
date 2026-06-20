import dotenv from "dotenv";
dotenv.config(); // 👈 FORCE load env here

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY not found in env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;


