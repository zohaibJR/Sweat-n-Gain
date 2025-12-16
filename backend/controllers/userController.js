import User from "../models/user.js"
import bcrypt from "bcrypt";

// -------------------  SIGNUP  -------------------
export const signupUser = async (req, res) => {
  try {
    const { name, email, country, password } = req.body;

    if (!name || !email || !country || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if email exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      country,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};