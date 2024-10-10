import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { Flag } from 'react-flag-kit';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list'; // Import countries object directly
import {  useGoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";
// layout 
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';
import zxcvbn from "zxcvbn"; // You may need to install this library
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Importer les icônes de l'œil

// components 
import { NioButton, NioToaster, NioCard, NioBrand, NioField ,NioSection} from '../../../components';

export default function Signup() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('US');
  const onChange = () => {} ; 
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleChangeCaptcha = (value) => {
    setIsCaptchaValid(!!value); // Met à jour l'état avec la validité du captcha
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangeLanguage = (countryCode) => {
    setSelectedLanguage(countryCode);
  };
  

  const handleClose = () => {
    setOpen(false);
  };
  const [phoneNumber, setPhoneNumber] = useState('');

  const StyledButton = styled.button`
    background-color: #0073e6;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: ${isCaptchaValid ? 'pointer' : 'not-allowed'};
    flex: 1;

    &:hover {
      background-color: ${isCaptchaValid ? 'darkblue' : '#0073e6'};
    }

    &:focus {
      outline: none;
    }
  `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px; /* Ajoutez la marge en haut */
`;
  const { register,getValues, handleSubmit, reset,watch, 
    
    
    formState: { errors , isValid } } = useForm({


    'mode': 'onBlur',
    defaultValues: {
      firstname: '',
      lastname: '',
      phone : '',
      email: '',
      password: '',
      confirmPassword: '',

      gender: '',
      country : '',
      address: '',
      status: '',
      securityQuestions: ['', '', ''],
      role:"challenger",
    }
  });
  
 const password = watch('password');
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };
 
  const allCountryNames = Object.values(countries).map(country => country.name);
  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer le mot de passe
  const [passwordError, setPasswordError] = useState(null); // Initialiser à null
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Inverser l'état de l'affichage du mot de passe
  };


  const [showPassword1, setShowPassword1] = useState(false); // État pour afficher ou masquer le mot de passe

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword1) => !prevShowPassword1); // Inverser l'état de l'affichage du mot de passe
  };











  const onSubmit = async (data) => {
    try {

      data.country = selectedCountry;
      data.phone=phoneNumber;



      const forgetdata = {
      
        email: data.email,
       
      };
      const response = await axios.post('http://localhost:9091/user/CodeVerif', forgetdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data)

      console.log('Response from server:', response.data);

      if (response.status === 200) {
        // Save the form data in local storage
        localStorage.setItem('formData', JSON.stringify(data));
        localStorage.setItem('resetEmail', data.email);
        // Set show success state to true
        setShowSuccess(true);
  
        // Navigate to verification page
        navigate('/auth/code-forget');
      } else {
        // Handle other status codes if needed
        console.error('Password reset request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };
  useEffect(() => {
    if (errors.email && errors.password &&  errors.confirmPassword) {
      // show error message
      setShowError(true);

      // hide error message after 3 seconds
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [errors.email, errors.password   , errors.confirmPassword]);
  

  
  const login = useGoogleLogin({
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
    <NioSection className="bg-purple-100" style={{ marginTop: '-70px' }} masks={["shape-18"]}  >
    <AuthLayout1 title="Signup" rootClass="layout-1" >
      
      {showSuccess && (
        <NioToaster
          variant="success"
          title="Success"
          message='You Have Successfully Signup'
        />
      )}
      {showError && (
        <NioToaster
          variant='error'
          title='Error'
          message='Please Fill Required Fields'
        />
      )}
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" >
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-3">
            {/* <NioBrand
                logo="s2"
                variant="dark"
                imageRoot="../images/"
                size="150px"
              />            */}
               </div>
            <h3 className="title mb-2" >Sign up to your account</h3>
            <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
  <Row className="gy-4"  >
    
    <Col xs={12} md={6} >
      <NioField  htmlFor="firstname">
        <NioField.Input
          id="firstname"
          placeholder="Enter Your First Name"
          errors={errors.firstname}
          {...register("firstname", {
            required: "Field is required",
           
          })}
        />
      </NioField>
    </Col>
    <Col xs={12} md={6}>
      <NioField  htmlFor="lastname">
        <NioField.Input
          id="lastname"
          placeholder="Enter Your Last Name"
          errors={errors.lastname}
          {...register("lastname", {
            required: "Field is required",
           
          })}
        />
      </NioField>
    </Col>
   
    <Col xs={12} md={6}>
      <NioField  htmlFor="gender">
        <Form.Control
          as="select"
          id="gender"
          custom
          {...register("gender", {
            required: "Field is required"
          })}
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Control>
      </NioField>
    </Col>
    <Col xs={12} md={6}>
      <NioField  htmlFor="status">
        <Form.Control
          as="select"
          id="status"
          custom
          {...register("status", {
            required: "Field is required"
          })}
        >
       <option value="">Select your status</option>
                        <option value="Data-Scientist">Data-Scientist</option>
                        <option value="Developer">Developer</option>
                        <option value="Teacher">Teacher</option> 
                        <option value="Suspended">Searcher</option> 
                        <option value="Student">Student</option>
        </Form.Control>
      </NioField>
    </Col>


    <div>   </div>
    <div>   </div>

    <Row>
    <Col xs={12} md={6}>
  <div style={{ width: '107%' }}>
    <ReactFlagsSelect
      countries={Object.keys(countries)}
      customLabels={allCountryNames}
      selectedSize={20}
      optionsSize={14}
      onSelect={handleChangeCountry}
      selected={selectedCountry}
      placeholder="Select a country"
      inputStyle={{
        height: "55px",
        width: "150%",
        borderTopRightRadius: "10px",
        paddingLeft: "45px",
        '::placeholder': {  // Style du placeholder
          color: 'red',     // Couleur du placeholder
          fontStyle: 'italic',  // Style de police
          fontWeight: 'bold',   // Poids de la police
          fontSize: '14px'      // Taille de la police
          /* Ajoutez d'autres styles CSS au besoin */
        }
      }}
    />
  </div>
</Col>

  
                
  <Col xs={12} md={6}>
    <div style={{ width: '100%' }}>
      <PhoneInput
        placeholder="        Enter phone number"
        value={phoneNumber}
        inputStyle={{
          height: "52px",
          width: "114%",
          borderTopRightRadius: "10px",
          paddingLeft: "45px"
        }}
        onChange={handlePhoneNumberChange}
        country={selectedCountry}
        onCountryChange={handleCountryChange}
      />
    </div>
  </Col>
</Row>



<Col xs={12}>
  <NioField htmlFor="email">
    <NioField.Input
      type="email"
      id="email"
      placeholder="Enter Your Email"
      errors={errors.email}
      {...register("email", {
        required: "Field is required",
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: "Invalid email address"
        }
      })}
    />
  </NioField>
</Col>
<Col xs={12} md={6}>
      <NioField htmlFor="password">
        <div style={{ position: 'relative' }}>
          <NioField.Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              }

              },
              onChange: () => {
                // Update the error message dynamically based on password length
                const passwordLength = getValues('password').length;
                if (passwordLength < 6) {
                  setPasswordError('Password must be at least 6 characters long');
                } else {
                  setPasswordError(null); // Réinitialiser l'erreur à null en cas de longueur valide
                }
              },
            })}
          />
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeSlash /> : <Eye />} {/* Afficher l'icône de l'œil ou de l'œil barré */}
          </div>
        </div>
        {passwordError && <div style={{ fontSize: '12px', color: 'red' }}>{passwordError}</div>}
      
      </NioField>
    </Col>
    <Col xs={12} md={6}>
      <NioField htmlFor="password">
      <div style={{ position: 'relative' }}>

          <NioField.Input
            type={showPassword1 ? 'text' : 'password'}
                   id="password"
                   placeholder="confirm Password"
                    errors={errors.confirmPassword}
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                  />


<div
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeSlash /> : <Eye />} {/* Afficher l'icône de l'œil ou de l'œil barré */}
          </div>
        </div>
                </NioField>
               
              </Col>
  </Row>
  <div className="pt-4"   style={{ marginTop: '-80px' }}>
           <ButtonContainer>
              <StyledButton 
                variant="outlined" 
                onClick={handleClickOpen}
              >
                Sign Up To Your Account
              </StyledButton>
            </ButtonContainer>
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Subscribe</DialogTitle>
<DialogContent>
  <DialogContentText>
Please answer the security questions  </DialogContentText>
  {Array.from({ length: 3 }).map((_, index) => (
    <Col key={index} xs={12}  style={{ marginBottom: '20px' }}>
      <NioField  htmlFor={`question${index + 1}`}>
      <p>{["What is your mother's maiden name?", "What is the name of your first pet?", "In what city were you born?"][index]}</p>

        <NioField.Input
          id={`question${index + 1}`}
          placeholder={`Enter your answer to Question ${index + 1}`}
          errors={errors.securityQuestions && errors.securityQuestions[index]}
          {...register(`securityQuestions[${index}]`, { required: "Answer is required" })}
        />
        
      </NioField>
    </Col>
    
  ))}
  <ReCAPTCHA
                  sitekey="6Ldl_IopAAAAAGqFfTC7gEmxqOhoLnPidP96OeGN"
                  onChange={handleChangeCaptcha} // Met à jour l'état du captcha
                />
</DialogContent>


      <DialogActions>
        <Col xs={12}>
        <div className="form-group">
                  <NioButton label="Sign Up To Your Account" className={`btn-block btn-indigo ${!isValid ? 'disabled' : ''}`} type="submit" disabled={!isCaptchaValid || buttonPressed} />
                </div>
        </Col>
      </DialogActions>
    </Dialog>
  </div>
</Form>

          <div className="pt-4 text-center">
            <div className="small overline-title-sep">
              <span className="bg-white px-2 text-uppercase text-base">or register with</span>
            </div>
          </div>
         
          <div className="pt-4">
            <NioButton
              onClick={() => login()}
              label="Sign Up With Google"
              img="../images/icon/a.png"
              className="border border-lighter text-nowrap text-dark w-100"
            />
          </div>
          
        </NioCard.Body>
      </NioCard>
    </AuthLayout1></NioSection>
  )
}
