import React, { useState,useEffect } from 'react';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import { Card, Button, Container } from 'react-bootstrap';
import baseUrl from '../Common Components/baseUrl.js';

const DailyBonusCard = ({props}) => {
  console.log(props)
  let platformType = props.platformType;
  // let platformType = 'tiktok';
  const [bonusData, setBonusData] = useState({
    dailyActionsDone: null,
    bonusCredits: null,
    resetTime: null,
    isClaimed: false,
  }) 
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl()}/dailyBonus?platformType=${platformType}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const { dailyActionsCompleted, bonusCredits, nextResetTime, isClaimed } = data.message;
          setBonusData({
            dailyActionsDone: dailyActionsCompleted,
            bonusCredits: bonusCredits,
            resetTime: nextResetTime,
            isClaimed: isClaimed,
          });
        } else if (response.status === 404) {
          alert("Daily Bonus Data not found");
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleClick = async()=>{
    setLoading(true)
    if(bonusData.dailyActionsDone >= 25){
      try {
        const response = await fetch(`${baseUrl()}/dailyReward?platformType=${platformType}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setBonusData.isClaimed(true);
          alert(" credits added successfully ");
          setLoading(false)
        } else if (response.status === 400) {
          setLoading(false)
          console.log(response)
        }
      } catch (error) {
        setLoading(false)
        console.error('Error:', error.message);
      }
    } else {
      setLoading(false)
      alert("You did not complete daily tasks")
    }
  };

  return (
    <div className='p-0 box-shadow'
    style={{margin: props.m, boxSizing: 'border-box', backgroundColor: 'white'}}
    >
            <div className='text-center'>
            <div className=''>
              <h3 className='m-0 pt-1'>Daily Bonus</h3>
            </div>
              <h6 title='YouTube Channel Name' className='m-3'>DAILY ACTIONS COMPLETED: {bonusData.dailyActionsDone} / 25</h6>
              <p className='pl-2 pr-2' title='YouTube Channel ID'>
                Complete 20 daily actions before timer, to claim the daily bonus. Every Like or Subscribe that you perform is counted as 1 daily action.
              </p>
              <p><strong>Note:</strong> Daily bounus can be claimed once a day only</p>
            </div>

            <div className='p-0'>
              <p className='bold bg-primary p-1 text-white m-0 text-center' 
              title='Coins' style={{borderRadius: '2px'}}
              >
              <i className="fa-solid fa-clock ml-2" style={{ color: 'white' }} ></i> Daily Bonus Reset in: {bonusData.resetTime}
              </p>
                <Button className='box-shadow mt-2 mb-2' variant="outline-dark" onClick={handleClick} 
                style={{width: '100%'}}
                disabled={bonusData.isClaimed || loading}>
                {
                  (bonusData.isClaimed === true) ? "Bonus Claimed" : "Claim Bonus"  
                }
                </Button>
            </div>
          </div>
  );
};

export default DailyBonusCard;