import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(
      req.body,
      req.headers["svix-id"],
      req.headers["svix-timestamp"],
      req.headers["svix-signature"]
    );

    const { data, type } = evt;

    if (type === "user.created") {
      const existingUser = await User.findById(data.id);

      if (!existingUser) {
        await User.create({
          _id: data.id,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          email:
            data.email_addresses?.[0]?.email_address || "no-email@clerk.dev",
          imageUrl: data.image_url || "",
          enrolledCourses: [],
        });
      }
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        name:
          `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
        email:
          data.email_addresses?.[0]?.email_address || "no-email@clerk.dev",
        imageUrl: data.image_url || "",
      });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Clerk webhook error:", err);
    return res.status(400).json({ success: false });
  }
};


  