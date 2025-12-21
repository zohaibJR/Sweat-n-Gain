import cron from 'node-cron';
import User from '../models/user.js';
import Attendance from '../models/Attendence.js';

// Run every day at 12:00 AM
cron.schedule('0 0 * * *', async () => {
  console.log('🕛 Running daily attendance cron job');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const users = await User.find();

  for (const user of users) {

    // Check if attendance already exists for today
    const alreadyMarked = await Attendance.findOne({
      user: user._id,
      date: today
    });

    if (alreadyMarked) continue;

    // Get last attendance
    const lastAttendance = await Attendance
      .findOne({ user: user._id })
      .sort({ date: -1 });

    if (!lastAttendance) continue;

    await Attendance.create({
      user: user._id,
      date: today,
      status: 'Absent',
      weight: lastAttendance.weight // 🔁 carry forward
    });

    console.log(`Auto Absent marked for ${user.email}`);
  }
});
