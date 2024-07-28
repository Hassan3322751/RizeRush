import React from 'react';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import '../CSS/mobileResponsive.scss'
import { Container,Card,Row,Col } from 'react-bootstrap';

const StepsComponent = ({ steps }) => (
  <div className='flex-space-around '>
    <Row className='justify-content-center stepsDiv ml-0 mr-0 mb-4'>
      <Col md={5} xs={10} sm={8} xl={5} className="text-center card1 m-2 step">
        <h1>How to Use <b style={{ color: "orange" }}>?</b></h1>
      </Col>
      
      {steps.map((step, index) => (
        <Col key={index} xs={11} sm={10} md={5} lg={5} xl={5} className="card1 m-2 step">
          <img src={step.icon} className='stepImg' alt={`Step ${index + 1}`} />
          <p className='ml-2'>{step.description}</p>
        </Col>
      ))}
    </Row>
  </div>
);

export default StepsComponent;
