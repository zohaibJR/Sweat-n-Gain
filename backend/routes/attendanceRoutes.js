import express from 'express';
import { submitAttendance, getLast7DaysWeight } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', submitAttendance);
router.get('/last7days', getLast7DaysWeight);

export default router;
