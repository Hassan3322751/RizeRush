import React from 'react';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import '../CSS/mobileResponsive.scss'
import { Col, Card } from 'react-bootstrap';

const BenefitsCard = ({ icon, title, text }) => {

  console.log(icon)
  return(
    <Col xs={12} sm={12} md={6} lg={4} xl={4}>
    <Card className="p-2 benefits-card">
      <Card.Title>
        <img src={icon} className='featureIcon' alt={title} />
        {title}
      </Card.Title>
      <Card.Text className='benifits-text text-left'>{text}</Card.Text>
    </Card>
  </Col>
)
};

export default BenefitsCard;