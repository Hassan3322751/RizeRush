import { React, useCallback, useEffect, useState } from 'react';
import DashboardCard from '../Common Components/DashboardCard';
import { Alert, Card, Button, Col, Row } from 'react-bootstrap';
import { fetchPromotions } from '../ApiUtils/Earn Credits';
import DailyBonusCard from '../Common Components/DailyBonus';
import RefferEarn from '../Common Components/RefferEarn';
import Feedback from '../Common Components/Feedback_Card';
import YouTubeSubscribeButton from '../Common Components/subscribeButton'
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';


const EarnCredits = (prop) => {
  const [promotions, setPromotions] = useState();
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [enableNextButton, setEnableNextButton] = useState(true);
  const [timerId, setTimerId] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [popupState, setPopupState] = useState(null)

  const [dailyBonusData, setDailyBonusData] = useState({
    dailyActionsCompleted: 0,
  });
  let platformType = prop.platform;
  let popupWindow = null;

  useEffect(() => {
    const fetch = async () => {
      const promotions = await fetchPromotions(platformType);
      setPromotions(promotions);
    }

    fetch();
  }, []);

  // Log the updated state when 'promotions' changes
  // useEffect(() => {
  // }, [promotions]);

  const callApi = async (success) => {
    const donePromotionId = promotions[currentPromotionIndex]._id;
    const promoType = promotions[currentPromotionIndex].promotionType;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobResult?platformType=${platformType}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success, donePromotionId, promoType }),
      });
      if (response.ok) {
        if (success) {
          setDailyBonusData((prevData) => ({
            ...prevData,
            dailyActionsCompleted: prevData.dailyActionsCompleted + 1,
          }));
        }
        console.log(dailyBonusData.dailyActionsCompleted)
        alert('suucess! credits will be added');
      }
      else {
        throw new Error('error! credits will not be added');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const showNextPromotion = useCallback(() => {
    if (currentPromotionIndex < promotions.length - 1) {
      setCurrentPromotionIndex(currentPromotionIndex + 1);
      setEnableNextButton(true);
      setLikeClicked(false);

      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
        setAlertMessage('Unsuccessful !')
        setAlertType('danger')

        // callApi(false);
      } else {
        setAlertType('success')
        setAlertMessage('success !')

        // callApi(true);
      }
    } else {
      alert("All promotions have been shown")
    }
  });

  const handleLikeClick = useCallback(() => {
    setLikeClicked(true);
    setEnableNextButton(false);
    setAlertMessage(null)

    const link = promotions && promotions.length > 0 ? promotions[currentPromotionIndex].targetLink : '';
    const popupFeatures = 'width=600,height=400,toolbar=no, location=no, menubar=no, scrollbars=yes, resizable=yes';
    popupWindow = window.open(link, '_blank', popupFeatures);
    setPopupState(popupWindow);
    console.log(popupWindow)

    const newTimerId = setTimeout(() => {
      if (enableNextButton) {
        console.log('You can now click the second button.');
      }
      clearTimeout(timerId)
      setTimerId(null);
    }, 10000);

    setTimerId(newTimerId);
  });

  const checkPopupWindow = useCallback(() => {
    console.log('popup')
    if (popupState) {
      if (popupState.closed) {
        console.log("closed");
        setPopupState(null);
        setTimerId(null);
        setAlertMessage('Unsuccessful !');
        setAlertType('danger');
        callApi(false);
      } else {
        console.log("pop checking triggered");
        popupState.focus();
      }
    }
  }, [popupState]);

  const renderPromotionContent = () => {
    const type = promotions[currentPromotionIndex].promotionType;
    switch (type) {
      case 'subscribe':
      case 'subscribers':
        return (
          <div>
            <p>
              <strong>Subscribe</strong> to " {promotions[currentPromotionIndex].targetLink} "
            </p>
          </div>
        );

      case 'like':
      case 'likes':
        return (
          <div>
            <p>
              <strong>Like</strong> to " {promotions[currentPromotionIndex].targetLink} "
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DashboardCard platform={platformType} />
      <div className='d-flex'>
      <Row>
        <Col md={12} lg={7}>
            <Card className='box-shadow m-3' style={{ minHeight: "30vh", }}>
          <Card.Header className='bg-info text-white text-center'>
            <strong>Earn Credits</strong>
          </Card.Header>
          <Card.Body className='flex-vertical'>
            <Card.Text>
              {!promotions ? (
                <p>Loading...</p>
              ) : promotions.length > 0 ? (
                <div>
                  {renderPromotionContent()}
                </div>
              ) : (
                <p>No promotions available</p>
              )}
            </Card.Text>
            <Card.Text>

              <Button variant='primary' className='mr-2'
                onClick={handleLikeClick}
                disabled={likeClicked || !enableNextButton}
              >
                {promotions && promotions.length > 0 ?
                  promotions[currentPromotionIndex].promotionType === 'like' ||
                    promotions[currentPromotionIndex].promotionType === 'likes' ? (
                    'Like'
                  ) : promotions[currentPromotionIndex].promotionType === 'subscribe' ||
                    promotions[currentPromotionIndex].promotionType === 'subscribers' ? (
                    'Subscribe'
                  ) : (
                    'Custom Text'
                  ) : 'Loading...'}
              </Button>

              <Button
                variant='outline-info'
                disabled={!likeClicked}
                onClick={showNextPromotion}
              >
                Verify & Next Promotion
              </Button>
            </Card.Text>

            {alertMessage && (
              <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible={false}  >
                {alertMessage}
              </Alert>
            )}
          </Card.Body>
        </Card>
        </Col>

        <Col md={12} lg={5}>
          <div className='m-3 p-3 border box-shadow' style={{minHeight: '30vh', boxSizing: 'border-box'}}>
              <strong className='bg-info text-white p-1 d-block mb-2'>Note :</strong>
              <ul>
                <li><b>1 Like</b> = 1 Coin && <b>1 Subscribe</b> = 2 Coins</li>
                <li>Please wait at least <b>10 seconds</b> after liking/subscribing action before closing the new tab.</li>
                <li>If you <b>unsubscribe</b> others, then your all subscribers that you received from us will be removed.</li>
                <li>Do not use <b>bots</b> to like and subscribe accounts otherwise your My Tools access will be restricted.</li>
              </ul>  
          </div>
        </Col>
      </Row>
      </div>

      <Row className='m-0'>
        <Col className='pl-0' sm={7}>
          <DailyBonusCard props={{platformType: platformType, m: '20px'}} />
        </Col>
        <Col sm={5}>
          <RefferEarn />
          <Feedback />
        </Col>
      </Row>
      <Row>
        {/* <YouTubeSubscribeButton /> */}
      </Row>
    </>
  );
}

export default EarnCredits;


// import React, { useEffect, useState } from 'react';

// const EarnCredits = () => {
//   const [popup, setPopup] = useState(null);

//   const openPopup = () => {
//     const popupWindow = window.open(
//       'https://www.youtube.com/watch?v=r2_A3bh94fY',
//       'Popup',
//       'width=600,height=600'
//     );

//     setPopup(popupWindow);
//   };

//   const handlePopupMessage = (event) => {
//     console.log(event.data);
//   };

//   useEffect(() => {
//     window.addEventListener('message', handlePopupMessage);
    
//     const interval = setInterval(() => {
//       if (popup && popup.closed) {
//         window.dispatchEvent(new CustomEvent('popupClosed', { detail: 'Popup window was closed' }));
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => {
//       window.removeEventListener('message', handlePopupMessage);
//       clearInterval(interval);
//     };
//   }, [popup]);

//   useEffect(() => {
//     const handlePopupClosed = (event) => {
//       console.log(event.detail);
//     };
    
//     window.addEventListener('popupClosed', handlePopupClosed);

//     return () => {
//       window.removeEventListener('popupClosed', handlePopupClosed);
//     };
//   }, []);

//   return (
//     <div>
//       <button onClick={openPopup}>Open YT PopUp</button>
//     </div>
//   );
// };

// export default EarnCredits;
