import React, { useState } from "react";
import { Container, Spinner, Form, Button, Alert } from "react-bootstrap";
import StepsComponent from "../Common Components/StepsComponent.jsx";
import TopBtn from "../Common Components/TopBtn.jsx";
import { fetchChannelInfo, saveChannelInfo } from "../ApiUtils/Youtube.js";
import { fetchInstaProfInfo, saveInstaProfInfo } from "../ApiUtils/Instagram.js";
import { fetchTiktokProfInfo, saveTiktokProfInfo} from "../ApiUtils/Tiktok.js";
import Images from "../Images/images.js";
import { useNavigate } from "react-router-dom"; 
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import '../CSS/mobileResponsive.scss'

const GenericToolInfo = (prop) => {
  const { platform } = prop;
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState(
    platform === "youtube" ? "UC-H_I6hG2SumoeILxfdSjTw" : "mianhassan6964 "
    );
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    
    const fetchInfo = async () => {
      setIsLoading(true)
      if (inputValue.trim() === "") {
        setShowToast(true);
        setIsLoading(false)
      } else {
      
      //If Youtube Tool is Opened or in use
      if (platform === "youtube") {
        const channelInfo = await fetchChannelInfo(inputValue);

        if (!channelInfo) {
          alert("Please enter a valid channel link / id");
          setIsLoading(false)
        } else {
          const saveResult = await saveChannelInfo(channelInfo);
          if (saveResult) {
            navigate("/youtubeDashboard");
          } else {
            setIsLoading(false)
            navigate("/youtube"); // Adjust as needed
          }
        }
        setShowToast(false);
      }

      //If Tiktok Tool is Opened or in use
       else if (platform === "tiktok") {
        const profileInfo = await fetchTiktokProfInfo(inputValue);
        console.log("tiktok user : " + profileInfo);
        if (!profileInfo) {
          alert("Please enter a valid profile username");
          setIsLoading(false)
        } else {
          const saveResult = await saveTiktokProfInfo(profileInfo);
          if (saveResult) {
            navigate("/tiktokDashboard");
          } else {
            setIsLoading(false)
            navigate("/tiktok"); // Adjust as needed
          }
          console.log("info saved of tiktok user")
        }
        setShowToast(false);
      }

      //If Instagram Tool is Opened or in use
       else if (platform === "instagram") {
        const profileInfo = await fetchInstaProfInfo(inputValue);
        if (!profileInfo) {
          setIsLoading(false)
          alert("Please enter a valid profile username");
        } else {
          const saveResult = await saveInstaProfInfo(profileInfo);
          if (saveResult) {
            navigate("/instagramDashboard");
          } else {
            setIsLoading(false)
            navigate("/instagram"); // Adjust as needed
          }
        }
        setShowToast(false);
      }
    }
  };

  function handle(){
    console.log("clikcedjnsdjhh")
  }
  const steps = [
    { icon: Images.step1, description: 'Enter your youtube channel, instagram or tiktok account username in search field.' },
    { icon: Images.step2, description: 'Make sure you entered correct link or username of your social media account.' },
    { icon: Images.step3, description: 'Hit the search button you will be redirected to the dashboard.' },
  ]

  return (
    <>
      <Container className="text-center mt-4 mb-4" fluid>
        <h1 className="mb-4 toolInfoHeading">
          Grow your 
          {platform === "youtube" ? " YouTube " : platform === "tiktok" ? " TikTok " : " Instagram "} 
          Account
        </h1>
        <p>Get free Subscribers, Likes, and Views</p>
        <p>Social boost is a website where you can get organic users</p>
      </Container>
    
      <StepsComponent steps={steps} />
      
      <Container className=" mb-3 p-0 h-auto box-shadow flex-vertical bg-white">
        <p 
        style={{width: '100%', fontWeight: 'bold', fontSize: '1.1em'}}
        className="text-center text-white bg-primary p-1"
        >
          Search 
          {platform === "youtube" ? " YouTube " : platform === "tiktok" ? " TikTok " : " Instagram "}
          channel Link / ID
        </p>
      {/* <div className="p-1"> */}
        <Form.Control
          className="p-2"
          type="text"
          placeholder={`e.g. UC-H_I6hG2SumoeILxfdSjTw `}
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value); setShowToast(false);}}
          />
      {/* </div> */}
        <Button variant="primary" className="m-2" onClick={fetchInfo} disabled={isLoading}>
          Search {isLoading ? <Spinner animation="border" size="sm" /> : ''}
        </Button>
        
        {/* <div class="outer">
          <div class="button1">
            <div class="text" onClick={fetchInfo}>Search <img src={Images.search}/></div>
          </div>
        </div> */}

        {platform === "youtube" ? (
          <a href="https://www.youtube.com/account_advanced" className="mb-2">
            Find My Youtube Channel Id
          </a>
        ) : platform === "tiktok" ? (
          <a href="https://www.youtube.com/account_advanced" className="mb-2">
            Find My Tiktok Username
          </a>
        ) : (
          <a href="https://www.youtube.com/account_advanced" className="mb-2">
            Find My Instagram Username
          </a>
        )}

        <Alert variant="danger" show={showToast}>
          Please Enter Valid {platform === "youtube" ? "YouTube" : "TikTok"}{" "}
          Channel Link or ID
        </Alert>
      </Container>
      <TopBtn />
    </>
  );
};

export default GenericToolInfo;
