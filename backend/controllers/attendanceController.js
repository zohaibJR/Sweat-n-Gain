import Attendance from '../models/Attendence.js';
import User from '../models/user.js';
import { autoFillAbsentDays } from '../utils/autoFillAttendance.js';

export const submitAttendance = async (req, res) => {
  try {
    const { email, status, weight } = req.body;

    if (!email || !status || !weight) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔁 Auto mark absent for missing days
    await autoFillAbsentDays(user._id);

    const today = new Date();
    today.setHours(0,0,0,0);

    const attendance = new Attendance({
      user: user._id,
      date: today,
      status,
      weight
    });

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance submitted successfully"
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already marked attendance for today"
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
