import React, { useState } from 'react';
import '../AttendenceForm/AttendeceForm.css';

function AttendenceForm() {
  const [attendance, setAttendance] = useState('');
  const [weight, setWeight] = useState('');

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Date: ${formattedDate}\nAttendance: ${attendance}\nWeight: ${weight} kg`);
  };

  return (
    <div className="FormMain">
      <form className="AttendanceForm" onSubmit={handleSubmit}>
        <h2 className="DateHeading">{formattedDate}</h2>

        <div className="RadioGroup">
          <label>
            <input
              type="radio"
              name="attendance"
              value="Present"
              checked={attendance === 'Present'}
              onChange={(e) => setAttendance(e.target.value)}
            />
            Present
          </label>

          <label>
            <input
              type="radio"
              name="attendance"
              value="Absent"
              checked={attendance === 'Absent'}
              onChange={(e) => setAttendance(e.target.value)}
            />
            Absent
          </label>
        </div>

        <div className="WeightInput">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>

        <button type="submit" className="SubmitBtn">Submit</button>
      </form>
    </div>
  );
}

export default AttendenceForm;
