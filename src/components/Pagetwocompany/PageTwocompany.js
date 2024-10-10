import React, { useState,useEffect } from 'react';
import { Col, Row,Form } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';

import axios from 'axios';

import { countries } from 'countries-list'; // Import countries object directly
const PageTwocompany = ({ formData, setFormData, onButtonClick }) => {
  const allCountryNames = Object.values(countries).map(country => country.name);

  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [emailError, setemailError] = useState('');

  const handlePhoneNumberChange1 = (value) => {
    setPhoneNumber1(value);
  };
  const [phoneNumber1, setPhoneNumber1] = useState('+216525444');

  const handleCountryChange1 = (value) => {
    setSelectedCountry1(value);
  };
  const [selectedCountry1, setSelectedCountry1] = useState('United States'); // Default to United States

  const handleEmailChange = (e) => {
    const { value } = e.target;
    // Perform validation check for email field
    if (!value.includes('@')) {
      setemailError('Email is not valid');
    } else {
      setemailError('');
    }
    setFormData((prevData) => ({ ...prevData, email: value }));
  };
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





  const handleNext = () => {
   
   
    // Validate title and description fields
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
  
    if (!formData.phoneNumber1?.trim()) {
      // Afficher un message d'erreur si le numéro de téléphone est vide après suppression des espaces
      setPhoneNumberError('Phone number is required');
      return;
    } else {
      setPhoneNumberError('');
    }
  
  
    if (!formData.email.trim()) {
      setemailError('Email is required');
      return;
    } else {
      setemailError('');
    }
    if (!formData.selectedCountry1) {
      // Afficher un message d'erreur si le pays n'est pas sélectionné
      setCountryError('Country is required');
      return;
    } else {
      setCountryError('');
    }
  
  
    // Proceed to the next step
    onButtonClick('PageThreeCompany');
  };
  return (
    




    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '70px' }}  >
      
   
    <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto  " >
      <NioCard.Body>
        <div className="nk-form-card-head text-center pb-5">
        
          <h3 className="title mb-2"  style={{ marginTop: '70px' }}  >Sign up to your account</h3>
          <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
        </div>

          
          <Row className="g-gs">
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
            <Col xs={12} >
              <NioField  htmlFor="email">
                <NioField.Input
                  id="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                />
                              {emailError && <span className="text-danger">{emailError}</span>}

              </NioField>
            </Col>
            <Col xs={12} md={6}>
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

  </NioField>
  {genderError && <span className="text-danger">{genderError}</span>}

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

  </NioField>
  {statusError && <span className="text-danger">{statusError}</span>}

</Col>

            

            <Col xs={12} md={6}>

            <ReactFlagsSelect
  countries={Object.keys(countries)}
  customLabels={allCountryNames}
  selectedSize={20}
  optionsSize={14}
  onSelect={(code) => handleInputChange({ target: { name: 'selectedCountry1', value: code } })}
  selected={formData.selectedCountry1}
  placeholder="Select a country"
  inputStyle={{
    height: "55px",
    width: "150%",
    borderTopRightRadius: "10px",
    paddingLeft: "45px",
    '::placeholder': {
      color: 'red',
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: '14px'
    }
  }}
/>
{countryError && <span className="text-danger">{countryError}</span>}

</Col>
<Col xs={12} md={6}>

<PhoneInput
  placeholder="Enter phone number"
  value={formData.phoneNumber1 }
  inputStyle={{
    height: "52px",
    width: "100%",
    borderTopRightRadius: "10px",
    paddingLeft: "45px"
  }}
  onChange={(value) => handleInputChange({ target: { name: 'phoneNumber1', value: value } })}
/>
{phoneNumberError && <span className="text-danger">{phoneNumberError}</span>}

</Col>




            <Col lg={12}>
            </Col>
           
          </Row>
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
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageTwocompany;