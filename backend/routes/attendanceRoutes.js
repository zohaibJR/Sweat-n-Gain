import express from 'express';
import {
  submitAttendance,
  getLast7DaysWeight,
  getLatestWeight,
  getMonthlyAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', submitAttendance);
router.get('/last7days', getLast7DaysWeight);
router.get('/latest', getLatestWeight);

// New route for monthly attendance
router.get('/monthly', getMonthlyAttendance);

export default router;
