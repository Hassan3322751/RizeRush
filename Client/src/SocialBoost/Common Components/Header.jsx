import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../Common Components/baseUrl'
// import Cookies from 'universal-cookie';
function Header() {
  const [isSticky, setIsSticky] = useState(false);

  const [user, setUser] = useState(false);
  // const [user, setUser] = useState(auth === 'true' ? true : false);

  useEffect(() => {
    console.log("header useffect")
    axios.get(`${baseUrl()}/isAuthenticated`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response)
        if (response.data.success) {
        setUser(true)
      } else{
        setUser(false)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  const headerRef = useRef(null);
  const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;

  useEffect(() => {
    const handleScroll = () => {
        setIsSticky(window.scrollY > 200);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY == 180 || window.scrollY < 180]);

return (
    <>
    <Navbar expand="lg" style={{boxShadow: '1px 1px 3px 2px grey'}} className={`custom-header ${isSticky ? 'position-fixed' : ''} bg-white`}>
        <Container className='headerNavBar' fluid>
            <Link to='/'>
                <Navbar.Brand style={{color: '#FF731D'}} href="#">Sociall Boost</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="m-auto ms-auto my-2 my-lg-0 text-center"
                    style={{ maxHeight: '150px' }}
                >
                    <Link to='/'>
                        <Nav.Link href='/' className='text-dark navLinks'>Home</Nav.Link>
                    </Link>
                    <Link to='/terms-of-service'>
                        <Nav.Link href='/' className='text-dark navLinks'>Terms</Nav.Link>
                    </Link>
                    <Link to='/privacy_policy'>
                        <Nav.Link href='/' className='text-dark navLinks'>Privacy</Nav.Link>
                    </Link>
                    <Nav.Link href="#action2" className='text-dark navLinks'>Tools</Nav.Link>
                    <Nav.Link href="#action4" className='text-dark navLinks'>Contact Us</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    {user ? (
                        <>
                            <Link to={"/userProfile"}>
                                <Button variant="outline-primary" >
                                    Profile
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register">
                                <Button variant="outline-primary" >
                                    Login
                                </Button>
                            </Link>
                        </>
                    )}
                </Form>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </>
)}

export default Header;