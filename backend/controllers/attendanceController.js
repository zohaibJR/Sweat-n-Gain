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

export const getLast7DaysWeight = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 6);

    const records = await Attendance.find({
      user: user._id,
      date: { $gte: last7Days, $lte: today }
    })
    .sort({ date: 1 })
    .select("date weight status");

    res.json(records);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

