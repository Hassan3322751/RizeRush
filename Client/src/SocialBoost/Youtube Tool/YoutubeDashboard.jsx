import React, { useState, useEffect, useCallback } from 'react';
import { Card, Container, Row, Col, Spinner, ProgressBar} from 'react-bootstrap';
import Feedback from '../Common Components/Feedback_Card';
import DailyBonusCard from '../Common Components/DailyBonus';
import RefferEarn from '../Common Components/RefferEarn';
import { getYoutubeData, getInstagramData, getTikTokData } from '../ApiUtils/GetInfoForDashbod';
import DashboardCard from "../Common Components/DashboardCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../CSS/mobileResponsive.scss'
import '../CSS/tabResponsive.scss'
import '../CSS/pcResponsive.scss'

const YoutubeDashboard = (prop) => {
  const [youtubeData, setYoutubeData] = useState();
  const [socialMediaData, setSocialMediaData] = useState();
  const [loading, setLoading] = useState(false);
  const { platform } = prop;
  
  const fetchData = useCallback(async () => {
    try {
      let data;
      if (platform === 'youtube') {
        data = await getYoutubeData();
        setYoutubeData(data);
      } else if (platform === 'instagram') {
        data = await getInstagramData(); // Assuming similar data structure for TikTok and Instagram
        setSocialMediaData(data);
      } else if (platform === 'tiktok'){
        data = await getTikTokData(); // Assuming similar data structure for TikTok and Instagram
        setSocialMediaData(data);
      }

      const uniquePromotionIds = [...new Set(data.promotions.map(promo => promo))];
      const combinedPromotions = [...uniquePromotionIds];
      localStorage.setItem('usersPromotions', JSON.stringify(combinedPromotions));

      // Handle data as needed
    } catch (error) {
      alert("An internal server error occurred. Please try again.");
      // Handle errors
    } finally {
      setLoading(false);
    }
  }, [platform]);

  useEffect(() => {
fetchData();
  }, [fetchData]);

  const sampleData = [
    { name: 'Jan', likes: 4000, views: 2400, amt: 2400 },
    { name: 'Feb', likes: 3000, views: 1398, amt: 2210 },
    { name: 'Mar', likes: 2000, views: 9800, subscribers: 5500, amt: 2290 },
    { name: 'Apr', likes: 2780, views: 3908, subscribers: 5000, amt: 2000 },
    { name: 'May', likes: 1890, views: 4800, subscribers: 5600, amt: 2181 },
    { name: 'Jun', likes: 2390, views: 3800, subscribers: 3000, amt: 2500 },
    { name: 'Jul', likes: 3490, views: 4300, subscribers: 2000, amt: 2100 },
    { name: 'Jan', likes: 4000, views: 2400, amt: 2400 },
    { name: 'Feb', likes: 3000, views: 1398, subscribers: 6000, amt: 2210 },
    { name: 'Mar', likes: 2000, views: 9800, subscribers: 7000, amt: 2290 },
    { name: 'Apr', likes: 2780, views: 3908, amt: 2000 },
    { name: 'May', likes: 1890, views: 4800, subscribers: 5099, amt: 2181 },
    { name: 'Jun', likes: 2390, views: 3800, subscribers: 8990, amt: 2500 },
  ];

  return (
    <>
    <DashboardCard platform={platform}/>
    
    {platform === 'youtube' && youtubeData ? (
      <div className='align-items-center m-5'>
        <Row>
          <Col md={4}>
            <div className='account-info-card p-0 box-shadow'>
              <div className='text-center p-0 card-body'>
                <div className='thumbnail'>
                  <img src={youtubeData.thumbnail} 
                    className='rounded-circle' alt='Account Thumbnail'
                  />
                </div>
                <div>
                  <h3 title='YouTube Channel Name'>{youtubeData.channelName}</h3>
                  <p className='m-1' title='YouTube Channel ID'>{youtubeData.id}</p>
                </div>
              </div>
              <div className='p-0'>
                <p className='bold fa-2xl bg-primary p-1 text-white m-0 text-center' title='Coins'>
                  <i className="fa-solid fa-coins" style={{ color: 'gold' }}></i> {youtubeData.coins}
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <DailyBonusCard props={{ platformType: platform, m: '10px' }} />
          </Col>
          <Col md={4}>
            <RefferEarn />
            <Feedback/>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <Card className='p-3 box-shadow'>
              <Card.Title>Engagement Over Time</Card.Title>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={sampleData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="subscribers" stroke="#212529" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    ) : platform !== 'youtube' && socialMediaData ? (
      <div className='align-items-center m-5'>
        <Row>
          <Col md={4}>
            <div className='account-info-card box-shadow p-0'>
              <div className='text-center p-0 card-body'>
                <div className='thumbnail'>
                  <img src='https://via.placeholder.com/150' 
                    className='rounded-circle' alt='Account Thumbnail'
                  />
                </div>
                <h3 title='YouTube Channel Name'>{socialMediaData.userName}</h3>
                <p className='m-1' title='YouTube Channel ID'>{socialMediaData.id}</p>
              </div>
              <div className='p-0'>
                <p className='bold fa-2xl bg-primary p-1 text-white m-0 text-center' title='Coins'>
                  <i className="fa-solid fa-coins" style={{ color: 'gold' }}></i> {socialMediaData.coins}
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <DailyBonusCard props={{ platformType: platform, m: '10px' }} />
          </Col>
          <Col md={4}>
            <RefferEarn />
            <Feedback/>
          </Col>
        </Row>
        
        <Row className='mt-4'>
          <Col>
            <Card className='p-3 box-shadow'>
              <Card.Title>Engagement Over Time</Card.Title>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={sampleData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    ) : (
      <p style={{ height: '100%', padding: '10vw', fontSize: '30px' }} className='text-center'>
        <Spinner animation="border" size="xm" variant='primary' />
      </p>
    )}
    </>
  );
};

export default YoutubeDashboard;