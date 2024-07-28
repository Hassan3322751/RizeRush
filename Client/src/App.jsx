import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './SocialBoost/Main Page/Main Page.jsx';
import GenericToolInfo from './SocialBoost/Youtube Tool/YouTube Tool Info.jsx'
import YoutubeDashboard from './SocialBoost/Youtube Tool/YoutubeDashboard.jsx'
import Header from './SocialBoost/Common Components/Header.jsx';
import Register from './SocialBoost/User Info/Register.jsx';
import UserProfile from './SocialBoost/User Info/userProfile.jsx';
import AddPromotion from './SocialBoost/Youtube Tool/AddPromotion.jsx';
import EarnCredits from './SocialBoost/Youtube Tool/EarnCredits.jsx';
import ViewPromotions from './SocialBoost/Youtube Tool/ViewPromotions.jsx';
import Reffer_Earn from './SocialBoost/Common Components/Reffer_Earn.jsx'
import TermsOfService from './SocialBoost/Main Page/Terms-of-Service.jsx';
import PrivacyPoliicy from './SocialBoost/Main Page/Privacy_Policy.jsx';
import { useState,useEffect } from 'react';
import axios from 'axios';

const App = () => {
  let auth = localStorage.getItem('user')
  const [user, setUser] = useState(auth === 'true' ? true : false);

return (
  <React.Fragment>
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path='/terms-of-service' element={<TermsOfService />} />
      <Route path='/privacy_policy' element={<PrivacyPoliicy />} />
      <Route path="/register" element={<Register />} />
    {user ? (
      <>
        <Route path="/youtube" element={<GenericToolInfo platform={"youtube"}/>} />
        <Route path="/instagram" element={<GenericToolInfo platform={"instagram"} />} />
        <Route path="/tiktok" element={<GenericToolInfo platform={"tiktok"}/>} />
        <Route path='/youtubeDashboard' element={<YoutubeDashboard platform={"youtube"}/>} />
        <Route path='/instagramDashboard' element={<YoutubeDashboard platform={"instagram"}/>} />
        <Route path='/tiktokDashboard' element={<YoutubeDashboard platform={"tiktok"}/>} />
        <Route path='/add_Youtube_Promotion' element={<AddPromotion platform={'youtube'}/>} />
        <Route path='/add_Instagram_Promotion' element={<AddPromotion platform={'instagram'}/>} />
        <Route path='/add_Tiktok_Promotion' element={<AddPromotion platform={'tiktok'}/>} />
        <Route path='/earnYoutubeCredits' element={<EarnCredits platform={'youtube'}/>} />       
        <Route path='/earnInstagramCredits' element={<EarnCredits platform={'instagram'}/>} />       
        <Route path='/earnTiktokCredits' element={<EarnCredits platform={'tiktok'}/>} />       
        <Route path='/viewYoutubePromos' element={<ViewPromotions platform={'youtube'}/>} />       
        <Route path='/viewInstagramPromos' element={<ViewPromotions platform={'instagram'}/>} />       
        <Route path='/viewTiktokPromos' element={<ViewPromotions platform={'tiktok'}/>} />   
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/reffer_earn' element={<Reffer_Earn />} />
      </>
      ) : (
        <>
        <Route path='/youtube' element={<Register />} />
        <Route path="/tiktok" element={<Register />} />
        <Route path="/instagram" element={<Register />} />
        <Route path='/youtubeDashboard' element={<Register />} />
        <Route path='/instagramDashboard' element={<Register />} />
        <Route path='/tiktokDashboard' element={<Register />} />
        <Route path='/userProfile' element={<Register />} />
        <Route path='/addPromotion' element={<Register />} />
        <Route path='/earnCredits' element={<Register />} />
        <Route path='/viewPromotions' element={<Register />} />       
      </>
    )}
      </Routes>
    </BrowserRouter>
  </React.Fragment>
  );
};

export default App;