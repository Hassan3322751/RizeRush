import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardCard = (props) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div 
    className="mt-5 mb-5 flex-center nav-card" 
    style={{ borderRadius: '10px', flexWrap:'nowrap' }}
    >
      <Link to={`/${props.platform}Dashboard`} className='nav-card-link'>
        <div
          className={`text-center`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleButtonClick('dashboard')}
        >
          {/* <i className="fa-solid fa-chart-line" style={{ color: 'dodgerblue' }}></i> */}

          <i class="fa-solid fa-table-columns" style={{color: 'dodgerblue'}}></i><h5>Dashboard</h5>
        </div>
      </Link>

      <Link to={`/earn${props.platform}Credits`} className='nav-card-link'>
        <div
          className={`text-center`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleButtonClick('earnCredits')}
        >
          <i className="fa-solid fa-coins" style={{ color: 'gold' }}></i>
          <h5>Earn Credits</h5>
        </div>
      </Link>

      <Link to={`/add_${props.platform}_Promotion`} className='nav-card-link'>
        <div
          className={`text-center`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleButtonClick('boostProfile')}
        >
          <i className="fa-solid fa-rocket" style={{ color: 'dodgerblue' }}></i>
          <h5>Boost Profile</h5>
        </div>
      </Link>

      <Link to={`/view${props.platform}Promos`} className='nav-card-link'>
        <div
          className={`text-center`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleButtonClick('viewPromotions')}
        >
          <i className="fa-solid fa-list" style={{ color: 'purple' }}></i>
          <h5>View Promotions</h5>
        </div>
      </Link>
    </div>
  );
};

export default DashboardCard;