import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';

const UserProfile = () => {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/isAuthenticated`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.success) {
          setUserName(response.data.message.name);
          setUserEmail(response.data.message.email);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Image
            src="https://via.placeholder.com/150"
            alt="User Profile"
            roundedCircle
          />
        </Col>
        <Col md={8}>
          <h2>Hi! {userName}</h2>
          <p>Email: {userEmail}</p>
          <Button variant="primary" onClick={handleLogout} disabled={loading}>
            Logout {loading ? <Spinner animation="border" size="sm" /> : ''}
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>About Me</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            pharetra, justo eget rhoncus fermentum, erat sem ultrices nisi.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
