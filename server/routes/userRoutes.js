import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// Login
router.post("/", async (req, res) => {
  const { username, password, user_id } = req.body;

  try {
    const user = await User.findOne({ username, user_id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user by user_id
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user by user_id
router.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.username = username;
    user.password = password;

    const updatedUserData = await user.save();
    console.log("Updated user:", updatedUserData);

    res.status(200).json(updatedUserData);
  } catch (err) {
    console.error("Error updating user: ", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
