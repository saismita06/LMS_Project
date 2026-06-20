import { clerkClient } from "@clerk/express";

/**
 * Protect routes (any logged-in user)
 */
export const protectUser = async (req, res, next) => {
  try {
    // In @clerk/express, auth is an object already attached by clerkMiddleware()
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please Login",
      });
    }
    next();
  } catch (err) {
    console.error("protectUser error:", err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

/**
 * Protect educator-only routes
 */
export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please Login",
      });
    }

    // Fetch user details from Clerk to check metadata
    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata?.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Educator access only",
      });
    }

    // Attach user to request for use in controllers
    req.user = user;
    next();
  } catch (error) {
    console.error("protectEducator error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during Authentication",
    });
  }
};