import React, { useEffect, useState } from 'react';
import '../CSS/CommonStyles.scss';
import '../CSS/home.scss';
import { Container, Tabs, Tab, Button, InputGroup, FormControl, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation, json } from 'react-router-dom';
import baseUrl from '../Common Components/baseUrl'
import axios from 'axios';

function Register() {
  const [ key, setKey ] = useState('login');
  const [ userExists, setUserExists ] = useState('');
  const [ userNotExist, setUserNotExist ] = useState('');
  const [ registrationMessage,setRegistrationMessage ] = useState('');
  const [ invalidPassMsg,setInvalidPassMsg ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const [ refrralInfo, setRefrralInfo ] = useState({
    referral: '',
    referredBy: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refrral = searchParams.get('refrralCode');
  
  useEffect(() => {
    setRefrralInfo({
      referral: refrral || '',
    });
  }, [refrral]); 

  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const [signupFormData, setSignupFormData] = useState({
    name: '',
    signupEmail: '',
    signupPassword: '',
  });

  const [loginErrors, setLoginErrors] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const [signupErrors, setSignupErrors] = useState({
    name: '',
    signupEmail: '',
    signupPassword: '',
  });

  const handleTabSelect = (selectedKey) => {
    setKey(selectedKey);
  };

  const {loginEmail,loginPassword} = loginFormData;
  const handleLogin = async (e) => {
    e.preventDefault();
    const valid = validateLoginForm();
    if (valid) {
      setLoading(true)
      try {
        const response = await axios.post(`${baseUrl()}/login`, {
          email: loginEmail,
          password: loginPassword,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
        });
        if(response.data.success){
          console.log(response)
          navigate('/');
        }
      } catch (error) {
        setLoading(false) 
        alert('There was an error logging in. Please try again.');

        if (error.response) {
          if (error.response.status === 400) {
            setUserNotExist("User not exists, Please Signup First");
            setKey('signup');
          } else if (error.response.status === 401) {
            const errorMsg = error.response.data.message;
            setInvalidPassMsg(errorMsg);
          }
        } else {
          alert('No response from server. Please try again');
        }
      }   
    }
  };

  const {name,signupEmail,signupPassword} = signupFormData;
  const handleSignup = async (e) => {
    e.preventDefault();
    const valid = validateSignupForm();
    if (valid) {
      setLoading(true)
      try {
        const response = await axios.post(`${baseUrl()}/register`, {
          name: name,
          email: signupEmail,
          password: signupPassword,
          referredBy: refrralInfo.referral ? refrralInfo.referral : undefined,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (response.data.success) {
          setRegistrationMessage('Registration Successful. Please Log In.');
          setKey('login');
          alert(response.data.message);
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error('Error during signup:', error);
        if (error.response && error.response.status) {
          if (error.response.status === 401) {
            alert(error.response.data.message);
          } else if (error.response.status === 400) {
            setUserExists(error.response.data.message)
            alert(error.response.data.message);
          } 
        } else {
          alert('An error occurred during signup, Please! try again');
        }
      }
    }
  };

  const validateLoginForm = () => {
    let valid = true;
    const newErrors = {
      loginEmail: '',
      loginPassword: '',
    };

    if (loginFormData.loginEmail.trim() === '') {
      newErrors.loginEmail = 'Email is required';
      valid = false;
    } else if (!isValidEmail(loginFormData.loginEmail)) {
      newErrors.loginEmail = 'Invalid email format';
      valid = false;
    }

    if (loginFormData.loginPassword.trim() === '') {
      newErrors.loginPassword = 'Password is required';
      valid = false;
    }

    setLoginErrors(newErrors);
    return valid;
  };

  const validateSignupForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      signupEmail: '',
      signupPassword: '',
    };

    if (signupFormData.name.trim() === '') {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (signupFormData.signupEmail.trim() === '') {
      newErrors.signupEmail = 'Email is required';
      valid = false;
    } else if (!isValidEmail(signupFormData.signupEmail)) {
      newErrors.signupEmail = 'Invalid email format';
      valid = false;
    }

    if (signupFormData.signupPassword.trim() === '') {
      newErrors.signupPassword = 'Password is required';
      valid = false;
    }

    setSignupErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Tabs
        id="controlled-tabs"
        activeKey={key}
        onSelect={handleTabSelect}
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <Tab eventKey="login" title="Login">
          {userExists && (
            <Alert variant="info">{userExists}</Alert>
          )}
          {registrationMessage && (
            <Alert variant="info">{registrationMessage}</Alert>
          )}
          <Form onSubmit={handleLogin} className='mt-5'>
            {/* Email and password fields */}
            <Form.Group className="mb-4">
              <InputGroup>
                <FormControl
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  required
                  name="loginEmail"
                  value={loginFormData.loginEmail}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      loginEmail: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {loginErrors.loginEmail && (
                <Alert variant="danger">{loginErrors.loginEmail}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <FormControl
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  required
                  name="loginPassword"
                  value={loginFormData.loginPassword}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      loginPassword: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {loginErrors.loginPassword && (
                <Alert variant="danger">{loginErrors.loginPassword}</Alert>
              )}
              {invalidPassMsg && (
                <Alert variant="info">{invalidPassMsg}</Alert>
              )}
            </Form.Group>
            {/* Remember me and forgot password */}
            <Row className="mb-4">
              <Col>
                <Form.Check type="checkbox" label="Remember me" />
              </Col>
              <Col>
                <Link to="/forgot-password">Forgot password?</Link>
              </Col>
            </Row>
            {/* Sign in button */}
            <Button type="submit" className="mb-4 w-100" disabled={loading}>
              Sign In {loading ? <Spinner animation="border" size="sm" /> : ''}
            </Button>

          </Form>
            <p className="text-center">
              Not a member?{' '}
              <button style={{border:"none", color:"blue"}}
              className='hover' onClick={()=>setKey('signup')}>
                Register {loading ? <Spinner animation="border" size="sm" /> : ''}
              </button>
            </p>
        </Tab>


        <Tab eventKey="signup" title="Register">
          {userNotExist && (
            <Alert variant="info">{userNotExist}</Alert>
          )}
          <Form onSubmit={handleSignup} className='mt-5'>
            {/* Name, email, and password fields */}
            <Form.Group className="mb-4">
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                  required
                  name="name"
                  value={signupFormData.name}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      name: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {signupErrors.name && (
                <Alert variant="danger">{signupErrors.name}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <FormControl
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  required
                  name="signupEmail"
                  value={signupFormData.signupEmail}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      signupEmail: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {signupErrors.signupEmail && (
                <Alert variant="danger">{signupErrors.signupEmail}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <FormControl
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  required
                  name="signupPassword"
                  value={signupFormData.signupPassword}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      signupPassword: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {signupErrors.signupPassword && (
                <Alert variant="danger">{signupErrors.signupPassword}</Alert>
              )}
            </Form.Group>
            {/* Terms and conditions checkbox */}
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="I have read and agree to the terms"
                required
              />
            </Form.Group>
            {/* Sign up button */}
            <Button type="submit" className="mb-4 w-100">
              Sign Up {loading ? <Spinner animation="border" size="sm" /> : ''}
            </Button>

          </Form>
            <p className="text-center">
              Already have an account ?{' '}
              <button style={{border:"none", color:"blue"}}
              className='hover' onClick={()=>setKey('login')}
              disabled={loading}>
               Login {loading ? <Spinner animation="border" size="sm" /> : ''}
              </button>
            </p>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Register;