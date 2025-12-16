// models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    date: { 
        type: Date, 
        required: true 
    }, // The day the user checked in

    weight: { 
        type: Number, 
        required: true 
    }, // weight in kg or lbs
}, 
{ timestamps: true });

// Ensure a user can have only one attendance record per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
