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
const PageTwoChallenger = ({ formData, setFormData, onButtonClick }) => {
  const allCountryNames = Object.values(countries).map(country => country.name);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const handlePhoneNumberChange1 = (value) => {
    setPhoneNumber1(value);
  };
  const [phoneNumber1, setPhoneNumber1] = useState('+216525444');

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


  const handleNext = () => {
    // Valider les champs nécessaires
    if (!formData.phoneNumber1?.trim()) {
      // Afficher un message d'erreur si le numéro de téléphone est vide après suppression des espaces
      setPhoneNumberError('Phone number is required');
      return;
    } else {
      setPhoneNumberError('');
    }
  
    if (!formData.selectedCountry1) {
      // Afficher un message d'erreur si le pays n'est pas sélectionné
      setCountryError('Country is required');
      return;
    } else {
      setCountryError('');
    }
  
    // Si tout est valide, passer à l'étape suivante
    onButtonClick('PageThreeChallenger');
  };
  
  return (
    




    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '70px' }}  >
      
   
    <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto  " >
      <NioCard.Body>
        <div className="nk-form-card-head text-center pb-5">
        
          <h3 className="title mb-2"  style={{ marginTop: '70px' }}  >Sign up to your account</h3>
          <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
        </div>

          
         

              
           <Row  style={{ marginTop: '70px' }}>

            

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
          <Col lg={12} className="d-flex justify-content-end" style={{ marginTop: '70px' }}>
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

export default PageTwoChallenger;