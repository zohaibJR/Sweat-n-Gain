import Attendance from '../models/Attendence.js';
import User from '../models/user.js';

// ---------------- SUBMIT ATTENDANCE ----------------
export const submitAttendance = async (req, res) => {
  try {
    const { email, status, weight } = req.body;

    if (!email || !status || weight === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Normalize today date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Prevent duplicate attendance
    const alreadyMarked = await Attendance.findOne({
      user: user._id,
      date: today
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked today"
      });
    }

    await Attendance.create({
      user: user._id,
      date: today,
      status,
      weight
    });

    res.status(201).json({ message: "Attendance submitted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LAST 7 DAYS WEIGHT ----------------
export const getLast7DaysWeight = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    const records = await Attendance.find({
      user: user._id,
      date: { $gte: startDate, $lte: today }
    }).sort({ date: 1 });

    res.json(records);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LATEST WEIGHT ----------------
export const getLatestWeight = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const latest = await Attendance.findOne({ user: user._id })
      .sort({ date: -1 })
      .select("weight");

    res.json({
      weight: latest ? latest.weight : null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/attendanceController.js

export const getMonthlyAttendance = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const totalDays = endOfMonth.getDate();

    const presentCount = await Attendance.countDocuments({
      user: user._id,
      status: 'Present',
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    res.json({
      totalDays,
      presentCount,
      month: now.toLocaleString('default', { month: 'long' })
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
