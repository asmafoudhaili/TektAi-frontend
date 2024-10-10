import React, { useState,useEffect } from 'react';
import { Col, Row,Form } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';
import {  useGoogleLogin } from '@react-oauth/google';

import axios from 'axios';

import { countries } from 'countries-list'; // Import countries object directly
const PageOneChallenger = ({ formData, setFormData, onButtonClick }) => {
  const allCountryNames = Object.values(countries).map(country => country.name);

  const handlePhoneNumberChange1 = (value) => {
    setPhoneNumber1(value);
  };
  const [phoneNumber1, setPhoneNumber1] = useState('+216525444');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [statusError, setStatusError] = useState('');

  const handleCountryChange1 = (value) => {
    setSelectedCountry1(value);
  };
  const [selectedCountry1, setSelectedCountry1] = useState('United States'); // Default to United States


  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  
    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

 

  console.log("Description:", formData.description);
  console.log("zmail:", formData.emailCom);

  const [error, setError] = useState('');



  const handleNext = () => {
    // Validate required fields
    if (!formData.firstname.trim()) {
      setFirstnameError('First name is required');
      return;
    } else {
      setFirstnameError('');
    }
  
    if (!formData.lastname.trim()) {
      setLastnameError('Last name is required');
      return;
    } else {
      setLastnameError('');
    }
  
    if (!formData.gender) {
      setGenderError('Gender is required');
      return;
    } else {
      setGenderError('');
    }
  
    if (!formData.status) {
      setStatusError('Status is required');
      return;
    } else {
      setStatusError('');
    }
  
    // Proceed to the next step
    onButtonClick('PageTwoChallenger');
  };const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Retrieve user information from Google
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
  
        // Extract relevant data from the Google response
        const { sub, name, given_name, family_name, picture, email } = res.data;
  
        // Prepare data for registration
        const userData = {
          sub,
          name,
          given_name,
          family_name,
          picture,
          email,
          role: 'challenger', // Assuming a default role for Google-registered users
          // Add any other fields you want to save in your backend
        };
  
        // Make a POST request to your backend registration endpoint
        const registerResponse = await axios.post(
          'http://localhost:9091/user/register-google',
          userData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (registerResponse.status === 201) {
          // Redirect or perform any other action upon successful registration
          navigate('/index-challenged-home-page');
        } else {
          console.error('Error during Google registration:', registerResponse.data);
          setError('An error occurred during registration.');
        }
      } catch (err) {
        console.error('Error during Google login:', err);
        setError('An error occurred during Google login.');
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  
  return (
    




    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '100px' }}  >
      
   
    <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto  "   style={{ marginTop: '50px' }} >
      <NioCard.Body>
        <div className="nk-form-card-head text-center pb-5">
        
          <h3 className="title mb-2"  style={{ marginTop: '70px' }}  >Sign up to your account</h3>
          <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
        </div>

          
          <Row className="g-gs"  style={{ marginTop: '0px' }}>
            <Col xs={12} md={6}>
              <NioField  htmlFor="firstname">
                <NioField.Input
                  id="firstname"
                  name="firstname"
                  placeholder="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </NioField>
              {firstnameError && <span className="text-danger">{firstnameError}</span>}



            </Col>



            <Col xs={12} md={6}>
              <NioField htmlFor="lastname">
                <NioField.Input
                  id="lastname"
                  name="lastname"
                  placeholder="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </NioField>
              {lastnameError && <span className="text-danger">{lastnameError}</span>}


              
            </Col>
            
            <Col xs={12} md={6} >
  <NioField htmlFor="gender">
    <Form.Control
      as="select"
      id="gender"
      custom
      value={formData.gender} 
      onChange={(e) => handleInputChange({ target: { name: 'gender', value: e.target.value } })} 
    >
      <option value="">Select your gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Form.Control> 
     {genderError && <span className="text-danger">{genderError}</span>}

  </NioField>

</Col>
<Col xs={12} md={6}>
  <NioField htmlFor="status">
    <Form.Control
      as="select"
      id="status"
      custom
      value={formData.status} 
      onChange={(e) => handleInputChange({ target: { name: 'status', value: e.target.value } })} 
    >
      <option value="">Select your status</option>
      <option value="Data-Scientist">Data-Scientist</option>
      <option value="Developer">Developer</option>
      <option value="Teacher">Teacher</option>
      <option value="Searcher">Searcher</option>
      <option value="Student">Student</option>
    </Form.Control>
    {statusError && <span className="text-danger">{statusError}</span>}

  </NioField>
</Col>

            

            



            <Col lg={12}>
            </Col>
           
          </Row>
          <Row>


          <Col lg={12} className="d-flex justify-content-end">
              <div className="form-group">
                <NioButton
                  onClick={handleNext}
                  label=">>"
                  className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ width: "100%", backgroundColor: '#664DE5', border: 'none', color: 'white' }}
                 
                />
              </div>
            
            </Col>
            
          <Col lg={12} className="d-flex justify-content-end"   style={{ marginTop: '60px' }} >

<NioButton
  onClick={() => login()}
  label="Sign Up With Google"
  img="../images/icon/a.png"
  className="border border-lighter text-nowrap text-dark w-100"
/>
</Col>
            </Row>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageOneChallenger;