import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/NavBar.css';

function NavBar() {
  return (
    <div className='mainDiv'>
      <div className="LeftSide"></div>

      <div className="RightSide">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/attendence">Mark Attendance</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
