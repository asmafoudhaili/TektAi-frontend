import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list'; // Import countries object directly
import ReCAPTCHA from "react-google-recaptcha";
import zxcvbn from "zxcvbn"; // You may need to install this library
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Importer les icônes de l'œil
// layout 
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';

// components 
import { NioButton, NioToaster, NioCard, NioBrand, NioField } from '../../../components';

export default function Signup() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States


  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  const [formData, setFormData] = useState({});


  const handlePhoneNumberChange1 = (value) => {
    setPhoneNumber1(value);
  };
  const [phoneNumber1, setPhoneNumber1] = useState('');

  const handleCountryChange1 = (value) => {
    setSelectedCountry1(value);
  };
  const [selectedCountry1, setSelectedCountry1] = useState('United States'); // Default to United States


  const [personalInfo, setPersonalInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };

  const [challengerId, setChallengerId] = useState(null); // État pour stocker l'identifiant du challenger
  
  const allCountryNames = Object.values(countries).map(country => country.name);
  const handleCheckboxChange = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };
  const { register, handleSubmit,getValues,watch, reset, formState: { errors , isValid } } = useForm({
    'mode': 'onBlur',
    defaultValues: {
      CompanyName: '',
      phone: '',
      emailCom: '',
      password: '',
      field: '',
      country : '',
      address: '',
      description: '',
      role:"company",


      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      gender: '',
      country : '',
      address: '',
      status: '',
      role:"challenger",






    }
  });
  const [buttonPressed, setButtonPressed] = useState(false);
  const password = watch('password');


  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleChangeCaptcha = (value) => {
    setIsCaptchaValid(!!value); // Met à jour l'état avec la validité du captcha
  };
  const [showPassword, setShowPassword] = useState(false); // Définissez la variable showPassword à l'aide du hook useState
const [passwordError, setPasswordError] = useState(null); // Définissez la variable passwordError à l'aide du hook useState

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); // Inversez la valeur de showPassword
};

const [showPassword1, setShowPassword1] = useState(false); // État pour afficher ou masquer le mot de passe

const togglePasswordVisibility1 = () => {
  setShowPassword1((prevShowPassword1) => !prevShowPassword1); // Inverser l'état de l'affichage du mot de passe
};


  const onSubmit = async (data) => {
   try {
      // Création du compte pour le rôle "company"
      const companyData = {
        firstname: data.CompanyName,
        lastname: data.CompanyName,

       country:data.country= selectedCountry,
       phone:data.phone=phoneNumber,
        email: data.emailCom,
        password: data.password,
        field: "data.field",
        city: data.city,
        address: "data.address",
        description: data.descriptionCom,
        role: "company", 
      challengerId: challengerId,
      };
      const challengerData = {
        firstname: data.firstname,
        lastname: data.lastname,
       
        email: data.email,
        password: data.password,
        gender: data.gender,
        country:data.country= selectedCountry1,
        phone:data.phone=phoneNumber1,
        address: data.address,
        status: data.status,
        role: "challenger"
      };

      const forgetdata = {
        email: companyData.email,
      };

      const response = await axios.post('http://localhost:9091/user/CodeVerif', forgetdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
          // Obtenez l'identifiant du challenger de la réponse
    const challengerIdFromResponse = response.data.challengerId;
    console.log("challengerId:",response.data.challengerId); 
    // Mettez à jour l'état avec l'identifiant du challenger
    setChallengerId(challengerIdFromResponse);

      console.log(data);
      console.log('Response from server:', response.data);

      if (response.status === 200) {
        // Save the form data in local storage
        localStorage.setItem('companyData', JSON.stringify(companyData));
        localStorage.setItem('challengerData', JSON.stringify(challengerData));
        // Set show success state to true
        setShowSuccess(true);
  
        // Navigate to verification page
        navigate('/auth/code-forget2');
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
    if (errors.email && errors.password) {
      // show error message
      setShowError(true);

      // hide error message after 3 seconds
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [errors.email, errors.password]);
 
  return (
    <AuthLayout title="Signup" rootClass="layout-1" >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            {showCompanyInfo ? (
              <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto"style={{ marginTop: '30px' }} >
              <NioCard.Body>
                <div className="nk-form-card-head text-center pb-5">
                  <div className="form-logo mb-3">
                    <NioBrand
                      logo="s2"
                      variant="dark"
                      imageRoot="../images/"
                      size="150px"
                    />
                  </div>
                  <h3 className="title mb-2" style={{ marginTop: '-50px' }}>Company Information</h3>
                </div>
                <Row className="gy-4">
              <Col xs={12}   >
              <input type="text" style={{ display: 'none' }} />

              <NioField  htmlFor="CompanyName">
                <NioField.Input
                  id="CompanyName"
                  placeholder="Enter Your CompanyName"
                  errors={errors.CompanyName}
                  {...register("CompanyName", {
                    required: "Field is required"
                  })}
                 
                />
              </NioField>
            </Col>

           
            <Row className="gy-4">
                  <Col xs={12} md={6}>
  <div style={{ width: '107%' }}>
    <ReactFlagsSelect
      countries={Object.keys(countries)}
      customLabels={allCountryNames}
      selectedSize={20}
      optionsSize={12}
      onSelect={handleCountryChange1} // Utilisation de handleCountryChange1 au lieu de handleChangeCountry
          selected={selectedCountry1} // Utilisation de selectedCountry1 au lieu de selectedCountry
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
        value={phoneNumber1}
        inputStyle={{
          height: "52px",
          width: "114%",
          borderTopRightRadius: "10px",
          paddingLeft: "45px"
        }}
        onChange={handlePhoneNumberChange1} // Utilisation de handlePhoneNumberChange1 au lieu de handlePhoneNumberChange
          country={selectedCountry1} // Utilisation de selectedCountry1 au lieu de selectedCountry
          onCountryChange={handleCountryChange1} // Utilisation de handleCountryChange1 au lieu de handleCountryChange
        />
    </div>
  </Col>
</Row>
            
           
            <Col xs={12}   md={6}>
              <NioField  htmlFor="description">
                <NioField.Input
                  id="description"
                  placeholder="Enter Your description"
                  errors={errors.description  }
                  {...register("description")}
                />
              </NioField>
            </Col>

            <Col xs={12}   md={6}>
              <NioField  htmlFor="emailCom">
                <NioField.Input
                  type="emailCom"
                  id="emailCom"
                  placeholder="Enter Your Email"
                  errors={errors.email}
                  {...register("emailCom", {
                    required: "Field is required",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/,
                      message: "Invalid email address"
                    }
                  })}
                />
              </NioField>
            </Col>
           

        
            <ReCAPTCHA
                  sitekey="6Ldl_IopAAAAAGqFfTC7gEmxqOhoLnPidP96OeGN"
                  onChange={handleChangeCaptcha} // Met à jour l'état du captcha
                />



      


                <Col xs={12}   >
                  <div className="form-group">
                  <NioButton label="Sign Up To Your Account" className={`btn-block btn-indigo ${!isValid ? 'disabled' : ''}`} type="submit" disabled={!isCaptchaValid || buttonPressed} />
                  </div>
                </Col>
              </Row>



             


              </NioCard.Body>
            </NioCard>
            ) : (
              <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ marginTop: '30px' }}>
                <NioCard.Body>
                  <div className="nk-form-card-head text-center pb-5">
                    <div className="form-logo mb-3">
                      <NioBrand
                        logo="s2"
                        variant="dark"
                        imageRoot="../images/"
                        size="150px"
                      />
                    </div>
                    <h3 className="title mb-2" style={{ marginTop: '-50px' }}>Personal Information</h3>
                    <p className="text">
                      Already a member?{" "}
                      <Link to="/auth/login" className="btn-link text-indigo">
                        Login
                      </Link>
                      .
                    </p>
                  </div>
                  <Row className="gy-5">  
                  <Col xs={12}   md={6}>
                    <NioField  htmlFor="firstname">
                      <NioField.Input
                        id="firstname"
                        placeholder="Enter Your First Name"
                        errors={errors.firstname}
                        {...register("firstname", {
                          required: "Field is required"
                        })}
                      
                      />
                    </NioField>
                </Col>
                <Col xs={12}   md={6}  >
                    <NioField  htmlFor="lastname">
                      <NioField.Input
                        id="lastname"
                        placeholder="Enter Your Last Name"
                        errors={errors.lastname}
                        {...register("lastname")}
                      />
                    </NioField>
                  </Col>
                  <Row className="gy-4">
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
                  <Col xs={12}   md={6}>
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
                  <Col xs={12}   md={6}>
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
                 
                  <Col xs={12}  >
                    <NioField  htmlFor="email">
                      <NioField.Input
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        errors={errors.email}
                        {...register("email", {
                          required: "Field is required",
                          pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/,
                            message: "Invalid email address"
                          }
                        })}
                      />
                    </NioField>
                  </Col>
                  <Row>
<div>.</div>
                  <Col xs={12} md={6}>
      <NioField htmlFor="password">
        <div style={{ position: 'relative' }}>
          <NioField.Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter password"
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
      </NioField>
    </Col>
    <Col xs={12} md={6}>
      <NioField htmlFor="password">
      <div style={{ position: 'relative' }}>

          <NioField.Input
            type={showPassword1 ? 'text' : 'password'}
                   id="password"
                   placeholder="Confirm password"
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
            </Row>
                </NioCard.Body>
              </NioCard>
            )}
          </div>
        </div>
        <div className="pt-4">
        <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id="showAdditionalInfo"
              checked={showCompanyInfo}
              onChange={() => setShowCompanyInfo(!showCompanyInfo)}
            />
            <label className="form-check-label" htmlFor="showAdditionalInfo">
              {showCompanyInfo
                ? " Company Information"
                : "Personal Information"}
            </label>
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
              }