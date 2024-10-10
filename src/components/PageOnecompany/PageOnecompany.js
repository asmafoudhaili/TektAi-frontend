import React, { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Importer les icônes de l'œil
import { useForm } from 'react-hook-form'; // Importer useForm depuis react-hook-form

import { countries } from 'countries-list'; // Import countries object directly
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';
const PageOnecompany = ({ formData, setFormData, onButtonClick }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm(); // Initialiser React Hook Form

  
  
  const [descriptionError, setDescriptionError] = useState('');
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Définissez la variable showPassword à l'aide du hook useState
  const [passwordError, setPasswordError] = useState(''); // Définissez la variable passwordError à l'aide du hook useState
  const [phoneNumberError, setPhoneNumberError] = useState(''); // State for phone number error

  const [companyNameError, setCompanyNameError] = useState('');
  const [emailComError, setEmailComError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const password = watch('formData.password');
  const [countryError, setCountryError] = useState('');


  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  
    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);
  const [showPassword1, setShowPassword1] = useState(false); // État pour afficher ou masquer le mot de passe
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowPassword1(!showPassword1);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, confirmPassword: value });
  
    if (value !== formData.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(""); // Clear the error message if passwords match
    }
  };
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States
  const allCountryNames = Object.values(countries).map(country => country.name);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEmailChange = (e) => {
    const { value } = e.target;
    // Perform validation check for email field
    if (!value.includes('@')) {
      setEmailComError('Email is not valid');
    } else {
      setEmailComError('');
    }
    setFormData((prevData) => ({ ...prevData, emailCom: value }));
  };
  
  const handleNext = () => {
    if (!formData.description.trim()) {
      setDescriptionError('Description is required');
      return;
    } else {
      setDescriptionError('');
    }
    if (!formData.phoneNumber.trim()) {
      setPhoneNumberError('Phone number is required'); // Set error message for phone number
      return;
    } else {
      setPhoneNumberError('');
    }

    if (!formData.CompanyName.trim()) {
      setCompanyNameError('Company Name is required');
      return;
    } else {
      setCompanyNameError('');
    }

    if (!formData.emailCom.trim()) {
      setEmailComError('Email is required');
      return;
    } else {
      setEmailComError('');
    }
    if (!formData.selectedCountry) {
      // Afficher un message d'erreur si le pays n'est pas sélectionné
      setCountryError('Country is required');
      return;
    } else {
      setCountryError('');
    }

    if (!formData.password.trim()) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }
    
    onButtonClick('PageTwoCompany');
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError(null);
    }
  };
  console.log("emailcompany:", formData.emailCom);

  return (
    


    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '100px' }}  >
      
   
    <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto  " >
      <NioCard.Body>
        <div className="nk-form-card-head text-center pb-5">
        
          <h3 className="title mb-2"  style={{ marginTop: '70px' }}  >Sign up to your account</h3>
          <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
        </div>

          
          <Row className="g-gs">
            <Col xs={12} md={6}>
              <NioField  htmlFor="CompanyName">
                <NioField.Input
                  id="CompanyName"
                  name="CompanyName"
                  placeholder=" CompanyName"
                  value={formData.CompanyName}
                  onChange={handleInputChange}
                />
              </NioField>
              {companyNameError && <span className="text-danger">{companyNameError}</span>}

            </Col>
               
           
            <Col xs={12}  md={6}>
              <NioField  htmlFor="emailCom">
                <NioField.Input
                  id="emailCom"
                  name="emailCom"
                  placeholder="email"
                  value={formData.emailCom}
                  onChange={handleEmailChange}
                />
              </NioField>
              {emailComError && <span className="text-danger">{emailComError}</span>}


            </Col>
         


            <Col xs={12} md={6}>
            <ReactFlagsSelect
  countries={Object.keys(countries)}
  customLabels={allCountryNames}
  selectedSize={20}
  optionsSize={14}
  onSelect={(code) => handleInputChange({ target: { name: 'selectedCountry', value: code } })}
  selected={formData.selectedCountry}
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
  placeholder="phone number"
  value={formData.phoneNumber}
  inputStyle={{
    height: "52px",
    width: "100%",
    borderTopRightRadius: "10px",
    paddingLeft: "45px"
  }}
  onChange={(value) => handleInputChange({ target: { name: 'phoneNumber', value: value } })}
/>
</Col>


<Col xs={12} >
              <NioField  htmlFor="description">
                <NioField.Input
                  id="description"
                  name="description"
                  placeholder="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </NioField> 
                           {descriptionError && <span className="text-danger">{descriptionError}</span>}

            </Col>
         
            
            <Col xs={12} md={6}>
        <NioField htmlFor="password">
          <div style={{ position: 'relative' }}>
            <NioField.Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="password"
              value={formData.password}
              onChange={handlePasswordChange}

            />
            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </div>
          </div>
          {passwordError && <div style={{ fontSize: '12px', color: 'red' }}>{passwordError}</div>}

        </NioField>
      </Col>
      <Col xs={12} md={6}>
        <NioField htmlFor="confirmPassword">
          <div style={{ position: 'relative' }}>
            <NioField.Input
              type={showPassword1 ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange} // Use the new handler here
              />
            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showPassword1 ? <EyeSlash /> : <Eye />}
            </div>
          </div>
          {passwordError && <div style={{ fontSize: '12px', color: 'red' }}>{passwordError}</div>}

        </NioField>
      </Col>
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
          </Row>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageOnecompany;