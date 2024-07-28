import React from 'react';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const RefferEarn = () => {
  return (
    <div className='p-0 m-2 box-shadow' style={{backgroundColor: 'white'}} >
            <div className='text-center p-0 card-body'>
            <div className=''>
              <h3 className='m-0 p-1'>Reffer & Earn</h3>
            </div>
              <p className='m-0 p-2' title='YouTube Channel ID'>
                Reffer your friends by a link and get bounus coins. So get your reffer link below button.
              </p>
              <p><strong>Award: </strong>You will get bonus credits on every referral.</p>
            </div>
            <div className='p-0'>
            <Link to='/reffer_earn' style={{ textDecoration: 'none' }}>
              <Button 
              className='bold bg-warning p-2 text-white m-0 text-center d-block w-100'
              title='Coins'
              style={{border: 'none'}}>
                <i className="fa-solid fa-coins" style={{ color: 'white' }} ></i> Reffer & Earn
              </Button>
              </Link>
            </div>
      </div>
  );
};

export default RefferEarn;