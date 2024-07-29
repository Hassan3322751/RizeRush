import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Form, Button, Badge, Container, Card } from 'react-bootstrap';
import DashboardCard from "../Common Components/DashboardCard.jsx";
import RefferEarn from '../Common Components/RefferEarn.jsx';
import { validateLink, addPromotion } from '../ApiUtils/AddPromotion.js';
import { getYoutubeData, getTikTokData, getInstagramData } from '../ApiUtils/GetInfoForDashbod.js';

const AddPromotion = (prop) => {
  const platformType = prop.platform;
  const [promotionType, setPromotionType] = useState('like');
  // const [platformType, setPlatformType] = useState(platform.platform);
  const [channelUrl, setChannelUrl] = useState();
  const [targetLinks, setTargetLinks] = useState();
  const [quantity, setQuantity] = useState('0');
  const [coins, setCoins] = useState();
  const [requiredCoins, setRequiredCoins] = useState();
  const [channelName, setChannelName] = useState();
  console.log(platformType);


  const fetchData = useCallback(async () => {
    try {
      let data;

      if (platformType === 'youtube') {
        data = await getYoutubeData();
      } else if (platformType === 'instagram') {
        data = await getInstagramData();
      } else if (platformType === 'tiktok') {
        data = await getTikTokData();
      }
      const { coins, channelName, userName, id } = data;
      
      setCoins(coins);
      setChannelName( 
        platformType === "youtube" ? channelName : userName
      );
      setChannelUrl(
        platformType === "youtube" ? id : userName
      );
    } catch (error) {
      console.error('Error:', error.message);
    }
  }, [platformType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, parseInt(value, 10));
    setQuantity(newQuantity)

    if(promotionType === 'subscribe'){
      setRequiredCoins(newQuantity * 2);
    } else if(promotionType === 'like') {
      setRequiredCoins(newQuantity);
    }
  };

  const handlePromotionTypeChange = (value) => {
    setPromotionType(value);
    setRequiredCoins('');
    setQuantity('')
    setTargetLinks('')
    
    if (value === 'subscribe') {
      setTargetLinks(channelUrl);
    } 
  };

  const handleClick = async () => {
    try {
      if (!platformType || !promotionType || !targetLinks || !quantity) {
        alert('Please fill in all fields');
        return;
      }

      const isValidLink = validateLink(targetLinks, platformType);
      // setTargetLink(isValidLink === false ? '' : isValidLink);
      const targetLink = isValidLink;

      if (!isValidLink) {
        alert('Please enter a valid link');
        return;
      } else {
        alert("success")
      }
      const promotionData = { targetLink, promotionType, quantity, requiredCoins };
      const data = {promotionData, platformType};
      const response = await addPromotion(data);

      if (response.ok) {
        setCoins(coins - requiredCoins);
        alert('Promotion Added Successfully');
      } else if (response.status === 401) {
        alert('User not authenticated');
      } else if (response.status === 400) {
        alert('Promotion for this link is already active, you can edit it');
        console.log(response);
      } else {
        throw new Error('Failed to save channel info');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <DashboardCard platform={platformType}/>

<div className="m-5">
  <Row>
    <Col md={6} className='p-0 mb-2 mr-2'>
      <Card>
        <Card.Body>
          <h5 className="card-title">How to Add Promotion:</h5>
          <ul>
            <li className='p-1 m-1' style={{borderLeft: '2px solid green', backgroundColor: 'lightblue'}}>
              <b>STEP 1:</b> Select the promotion type from above (YouTube Likes / Subscribers etc).</li>
            <li className='p-1 m-1' style={{borderLeft: '2px solid green', backgroundColor: 'lightblue'}}>
              <b>STEP 2:</b> Provide your YouTube video link or Channel ID, whatever is asked.</li>
            <li className='p-1 m-1' style={{borderLeft: '2px solid green', backgroundColor: 'lightblue'}}>
              <b>STEP 3:</b> Enter the number of likes or subscribers you want and hit the "Add Promotion" button. Your promotion will be completed after a few hours.</li>
          </ul>
          <p>
            <strong>Note:</strong> 
            <span className='p-1 m-1' style={{borderLeft: '2px solid green', backgroundColor: 'lightblue'}}>1 Like = 1 Coin</span> 
            <span className='p-1 m-1' style={{borderLeft: '2px solid green', backgroundColor: 'lightblue'}}>1 Sub/Follow = 2 Coins</span>
          </p>
        </Card.Body>
      </Card>
    </Col>

    <Col className='border flex-vertical p-2' style={{alignItems: 'normal'}}>
      <div className="text-center mb-2">
        <strong>Your Channel Name: {channelName}</strong>
      </div>
    
      <Form>
        <Form.Group controlId="promotionType">
          <Form.Label>Promotion Type:</Form.Label>
          <Form.Control
            as="select"
            value={promotionType}
            onChange={(e) => handlePromotionTypeChange(e.target.value)}
            style={{ backgroundColor: "#00aedb", color: "white" }}
          >
            <option value="subscribe">Subscribe</option>
            <option value="like">Like</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="targetLink">
          <Form.Label>Target Link:</Form.Label>
          <Form.Control
            type="string"
            value={targetLinks}
            placeholder={
              promotionType === 'like' ? 'Enter video link' : 'Enter channel URL'
            }
            onChange={(e) => setTargetLinks(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='flex-space-btw' controlId="creditsInfo">
          <div>
            <Button
              disabled={requiredCoins > coins}
              variant="primary"
              onClick={handleClick}
              style={{ backgroundColor: "#00b159", borderColor: "#00b159" }}
            >
              Add Promotion
            </Button>
          </div>

          <div className='m-2'>
            <Button variant="primary" className="mr-2" disabled>
              Coins <Badge bg="secondary">{coins}</Badge>
            </Button>
            <Button variant="primary" disabled>
              Required Coins <Badge bg="secondary">{requiredCoins}</Badge>
            </Button>
          </div>
        </Form.Group>

      </Form>
    </Col>
  </Row>
</div>

<div className="m-4">
  <Row>
  <Col md={6}>
      <Card className="mb-4">
        <Card.Body>
          <h5 className="card-title">Note:</h5>
          <ul>
            <li>You cannot boost the same link more than once, but you can always increase the required count by editing the promotion in the view promotions page.</li>
            <li>You cannot boost any other profile or any other profile posts using your credits.</li>
            <li>No one other than you can use your credits to get likes/subscribers on their account.</li>
            <li>You cannot transfer credits to any other username or profile.</li>
          </ul>
        </Card.Body>
      </Card>
    </Col>

    <Col sm={6}>
          <RefferEarn />
          <Card className='box-shadow p-2 m-2'>
            <strong className='text-center'>Feedback & Report</strong>
            <p className='text-center'>If you see here any type of problem or suggesion report us</p>
            <Button variant='primary' className='m-0'>Report</Button>
          </Card>
        </Col>
  </Row>
</div>
    </div>
  );
};

export default AddPromotion;