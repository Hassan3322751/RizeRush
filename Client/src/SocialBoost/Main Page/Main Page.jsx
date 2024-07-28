import React, { useEffect, useState } from 'react';
import Images from '../Images/images';
import StepsComponent from '../Common Components/StepsComponent';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import '../CSS/mobileResponsive.scss'
import '../CSS/tabResponsive.scss'
import '../CSS/pcResponsive.scss'
import Aos from 'aos';
// import 'aos/dist/aos.css';
import Footer from '../Common Components/Footer';
import { Container, Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BenefitsCard from '../Common Components/BenefitsCard';

const MainPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const benefits = [
    { icon: Images.organic, title: 'Organic Traffic', text: 'Our platform helps you attract genuine, organic traffic to your social media accounts, ensuring that your posts reach real users.' },
    { icon: Images.insurance_agent, title: 'Real Users', text: 'We prioritize real users over bots or fake accounts, ensuring that your social media engagement is authentic and meaningful.' },
    { icon: Images.shield, title: 'Secure', text: 'We take your privacy and security seriously. Your information is safe with us, and we use secure payment methods for any transactions.' },
    { icon: Images.timer, title: 'Fast', text: 'With our platform, you can see results quickly. Boost your social media posts and start seeing increased engagement in no time.' },
    { icon: Images.list, title: 'Multiple Platforms', text: 'Our platform supports multiple platforms, making it convenient for you to manage all your social media profiles in one place.' },
    { icon: Images.correct, title: 'Expert Support', text: 'Our dedicated team is always ready to help you with any questions or concerns. Get expert support and guidance when you need it.' },
  ];
  const steps = [
    { icon: Images.create_account, description: 'Sign up for an account on our platform to get started. It\'s quick, easy, and free.' },
    { icon: Images.earn, description: 'Earn credits by liking, sharing, and interacting with other users\' content. The more active you are, the more credits you can earn.' },
    { icon: Images.spend_money_wallet, description: 'Use your earned credits to boost your own social media posts. Choose the number of likes, views, or followers you want, and watch your engagement grow.' },
  ]
  const tools = [
    { link: '/youtube', image: Images.yt, name: 'Youtube' },
    { link: '/tiktok', image: Images.tk, name: 'Tiktok' },
    { link: '/instagram', image: Images.ig, name: 'Instagram' }
  ]

  const images = [
    {
      backgroundImage: 'url(' + Images.heroBg_Crowd + ')',
      text1: 'Build your ',
      text2: 'dream',
      text3: ' project',
    },
    {
      backgroundImage: 'url(' + Images.heroBg_Insta + ')',
      text1: 'Increase ',
      text2: 'Followers, Views and Likes',
      text3: ' Organically for Social Media',
    },
    {
      backgroundImage: 'url(' + Images.heroBg1 + ')',
      text1: 'Another text for Image 3',
      text2: '',
      text3: '',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [animationClass1, setAnimationClass1] = useState('');

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newIndex = (currentImageIndex + 1) % images.length;
  //     setCurrentImageIndex(newIndex);
  //     // setAnimationClass('text-animation');
  //     // setAnimationClass1('text-animation1');
  //     // setTimeout(() => setAnimationClass(''), 500); // Remove animation class after 1 second
  //     // setTimeout(() => setAnimationClass1(''), 500); // Remove animation class after 1 second
  //   }, 3000); // Change image every 3 seconds

  //   return () => clearInterval(interval);
  // }, [currentImageIndex]);

  return (
    <div className="bgc">
  <div className="hero p-2 mb-5 flex-center">
    <div className="div1 flex-vertical heroHeading">
      <div className='first-heading'>
        <h1 className="text-center text">Build your <span className="bgBlue">dream</span> project</h1>
      </div>
      <div>
        <h2 className="text-center text"><span className="bgBlue">Increase</span> Followers, Views and Likes Organically for Social Media</h2>
      </div>
      <a href="#heh">
        <div className="scroll-downs">
          <div className="mousey">
            <div className="scroller"></div>
          </div>
        </div>
      </a>
    </div>
  </div>

      <StepsComponent steps={steps} />
    
      <h1 className="text-center mb-4 benfits-heding">Why Us ?</h1>
      <div className="whyUs-div text-center m-2">
        <Row>
          {
            benefits.map((curElm, index) => ( 
              <BenefitsCard key={index} icon={curElm.icon} title={curElm.title} text={curElm.text} />
            ))
          }
        </Row>
      </div>
      
      <div className=" p-5 flex-space-around toolsBox" id="heh">
          <h1>Let's Start</h1>
        {
          tools.map((curElm, index)=>(
                  <Link to={curElm.link} className='tools m-2 mb-3' key={index}>
                <div className="card2 m-2">
                  <img src={curElm.image} />
                  <h5>{curElm.name}</h5>
                </div>
              </Link>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;