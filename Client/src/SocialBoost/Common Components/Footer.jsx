import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to handle user comments or suggestions here
    alert('Thank you for your feedback!');
  };

  return (
    <footer className="footer text-light py-5">
      <Container>
        <Row>
          <Col md={6}>
            <h3>Quick Links</h3>
            <div className="d-flex align-items-center mt-5">
              <ul className="list-unstyled">
                <li><a href="#" className='text-white'>Home</a></li>
                <li><a href="#" className='text-white'>How It Works</a></li>
                <li><a href="#" className='text-white'>Features</a></li>
                <li><a href="#" className='text-white'>About Us</a></li>
                <li><a href="#" className='text-white'>Contact</a></li>
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <h3>Comments & Suggestions</h3>
            <p>We'd love to hear from you!</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your comments or suggestions here"
                />
              </Form.Group>
              <Button type="submit" variant="outline-warning" className='mt-2'>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        &copy; {new Date().getFullYear()} Your Social Boost
      </div>
    </footer>
  );
}

export default Footer;
