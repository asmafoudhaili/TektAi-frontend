import React, { useState, useEffect } from 'react';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import { Col, Form, Row,Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import{NioButton,NioSection} from '../../../components';
import ReactFlagsSelect from 'react-flags-select';

//import 'react-flags-select/css/react-flags-select.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list'; // Import countries object directly
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCardText,
  MDBTypography,
} from 'mdb-react-ui-kit';

export default function EditProfile({ toggleEditMode, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const [formType, setFormType] = useState('personal');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  
  const [data, setData] = useState({

    
    companyFirstName: '',
    companyEmail: '',
    companyPhone: '',
    companyCountry: '',
    imageUser: 'images/no_pdp.jpg',
    challengerFirstName: '',
    challengerLastName: '',
    challengerStatus: '',
    challengerCountry: '',
    challengerPhone: '',
    challengerEmail: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9091/user/getProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setData(prevData => ({
          ...prevData,
          companyFirstName: userData.companyFirstName,
          companyEmail: userData.companyEmail,
          companyPhone: userData.companyPhone,
          companyCountry:userData.companyCountry,
          imageUser: userData.imageUser || 'images/no_pdp.jpg', // If imageUser is empty, use default image
          challengerFirstName: userData.challengerFirstName,
          challengerLastName: userData.challengerLastName,
          challengerStatus: userData.challengerStatus,
          challengerEmail: userData.challengerEmail,
          challengerPhone: userData.challengerPhone,
          challengerCountry: userData.challengerCountry
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const handleImageUserChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData(prevData => ({
        ...prevData,
        imageUser: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:9091/user/profile', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Profile updated successfully:', response.data);
      onUpdate(data); // Utilisation de onUpdate pour mettre à jour les données utilisateur
      toggleEditMode(); // Toggle edit mode
      navigate('/Profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const handlePhoneNumberChange = (value) => {
    setData(prevData => ({
      ...prevData,
      phone: value.toString(), // Convertir en chaîne de caractères
    }));
  };
  
  
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleCountryChange = (value) => {
    setData(prevData => ({
      ...prevData,
      country: value,
    }));
  };
  const handleCompanyPhoneNumberChange = (value) => {
    setData(prevData => ({
      ...prevData,
      companyPhone: value.toString(),
    }));
  };

  const handleCompanyCountryChange = (value) => {
    setData(prevData => ({
      ...prevData,
      companyCountry: value,
    }));
  };

  const switchForm = () => {
    setFormType(formType === 'personal' ? 'company' : 'personal');
  };
  const allCountryNames = Object.values(countries).map(country => country.name);
  return (
   <section className="nk-banner nk-banner-collab">
      <div className="nk-banner-wrap position-relative bg-purple-100">
        <div className="nk-mask"></div>
        <div className="nk-banner-content">
          <Container fluid>
            <MDBContainer className="py-5 h-100">
            <Row className="justify-content-center align-items-center h-100">
                <MDBCol lg="9" xl="10">
                  <div className="rounded-top text-white d-flex flex-row " style={{ height: '400px' }}>
                    <div className="ms-5 mt-5 d-flex flex-column" style={{ width: '300px' }}>
                        <label htmlFor="profile-image-input">
                          <div 
                            className="position-relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ cursor: 'pointer' }}
                          >
                            <MDBCardImage
                              src={data.imageUser}
                              alt="Generic placeholder image"
                              className={`img-fluid rounded-circle border border-dark border-3 ${isHovered ? 'image-hover' : ''}`}
                              fluid
                              style={{ width: '200px', zIndex: '1', marginRight: '200px', transition: 'filter 0.3s ease-in-out',filter: isHovered ? 'brightness(50%)' : 'brightness(100%)' // Adjust brightness on hover
                            }}
                            />
                             <div className="image-text" style={{ 
                              position: 'absolute', 
                              top: '50%', 
                              left: '50%', 
                              transform: 'translate(-50%, -50%)',
                              fontSize: '16px',
                              color: 'white',
                              display: isHovered ? 'block' : 'none' // Show only on hover
                            }}>
                              Edit Photo
                            </div>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="profile-image-input"
                          style={{ display: 'none' }}
                          accept="image/*"
                          onChange={handleImageUserChange}
                        />
                        <div className="d-flex justify-content-center mb-2 ">
                          <NioButton onClick={updateProfile} href="/Profile" className="btn-indigo me-2" label="Save" />
                          <NioButton onClick={toggleEditMode} label="Cancel" className="btn-outline-indigo ms-2" />
                        </div>
                      </div>
                      <div className="ms-3 mt-5 d-flex flex-column w-100">
                        
<NioSection.Content>
{formType === 'personal' && ( 
          <Row className=" gy-5 justify-content-lg-between">
            <Col lg={10} >                          <MDBCard className="mb-4">
                            <MDBCardBody>
                              <MDBRow>
                                <MDBCol sm="6">
                                  <MDBCardText>First Name</MDBCardText>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    value={data.challengerFirstName}
                                    onChange={(e) => setData(prevData => ({ ...prevData, firstname: e.target.value }))}
                                  />
                                </MDBCol>
                                <MDBCol sm="6">
                                  <MDBCardText>Last Name</MDBCardText>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your last name"
                                    value={data.challengerLastName}
                                    onChange={(e) => setData(prevData => ({ ...prevData, lastname: e.target.value }))}
                                  />
                                </MDBCol>
                              </MDBRow>
                              <hr />
                              <MDBRow>
                                <MDBCol sm="6">
                                  <MDBCardText>Email</MDBCardText>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={data.challengerEmail}
                                    onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))}
                                  />
                                </MDBCol>
                                <MDBCol sm="6">
                                  <MDBCardText>Status</MDBCardText>
                                  <Form.Control
                                    as="select"
                                    custom
                                    value={data.challengerStatus}
                                    onChange={(e) => setData(prevData => ({ ...prevData, status: e.target.value }))}
                                  >
                                    <option value="">Select your status</option>
                                    <option value="Data-Scientist">Data Scientist</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Searcher">Searcher</option>
                                    <option value="Student">Student</option>
                                  </Form.Control>
                                </MDBCol>
                              </MDBRow>
                              <hr />
                              <MDBRow>
                                <MDBCol sm="6">
                                  <MDBCardText>Phone</MDBCardText>
                                  <div style={{ width: '100%' }}>
                                    <PhoneInput
                                      placeholder={data.challengerPhone}
                                      inputStyle={{
                                        height: "52px",
                                        width: "100%",
                                        borderTopRightRadius: "10px",
                                        paddingLeft: "45px"
                                      }}
                                      onChange={handlePhoneNumberChange}
                                      country={selectedCountry}
                                      onCountryChange={handleChangeCountry}
                                    />
                                  </div>
                                </MDBCol>
                                <MDBCol sm="6">
                                  <MDBCardText>Country</MDBCardText>
                                  <div style={{ width: '100%' }}>
                                    <ReactFlagsSelect
                                      customLabels={allCountryNames}
                                      countries={Object.keys(countries)} // Display flags for all available countries
                                      selected={data.challengerCountry} // Set selected country from user data
                                      selectedSize={20}
                                      optionsSize={14}
                                      onSelect={handleCountryChange}
                                      placeholder="Select a country"
                                      inputStyle={{
                                        height: "52px",
                                        width: "100%",
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
                                  </div>
                                </MDBCol>
                              </MDBRow>
                            </MDBCardBody>
                          </MDBCard>
                        </Col>
                        </Row>  
                        )}
                        {formType === 'company' && (
                        <Row className="gy-5 justify-content-lg-between">
                          <Col lg={10}>
                            <MDBCard className="mb-4">
                              <MDBCardBody>
                                <MDBRow>
                                  <MDBCol sm="6">
                                    <MDBCardText>Company Name</MDBCardText>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter company name"
                                      value={data.companyFirstName}
                                      onChange={(e) => setData(prevData => ({ ...prevData, companyName: e.target.value }))}
                                    />
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText>Country</MDBCardText>
                                    <div style={{ width: '100%' }}>
                                      <ReactFlagsSelect
                                        customLabels={allCountryNames}
                                        countries={Object.keys(countries)}
                                        selected={data.companyCountry}
                                        selectedSize={20}
                                        optionsSize={14}
                                        onSelect={handleCompanyCountryChange}
                                        placeholder="Select a country"
                                        inputStyle={{
                                          height: '52px',
                                          width: '100%',
                                          borderTopRightRadius: '10px',
                                          paddingLeft: '45px',
                                          '::placeholder': {
                                            color: 'red',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                          },
                                        }}
                                      />
                                    </div>
                                  </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="6">
                                    <MDBCardText>Phone</MDBCardText>
                                    <div style={{ width: '100%' }}>
                                      <PhoneInput
                                        placeholder={data.companyPhone}
                                        inputStyle={{
                                          height: '52px',
                                          width: '100%',
                                          borderTopRightRadius: '10px',
                                          paddingLeft: '45px',
                                        }}
                                        onChange={handleCompanyPhoneNumberChange}
                                        country={data.companyCountry}
                                      />
                                    </div>
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText>Email</MDBCardText>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter company email"
                                      value={data.companyEmail}
                                      onChange={(e) => setData(prevData => ({ ...prevData, companyEmail: e.target.value }))}
                                    />
                                  </MDBCol>
                                </MDBRow>
                              </MDBCardBody>
                            </MDBCard>
                          </Col>
                        </Row>
                      )}
                    </NioSection.Content>
                    <div className="d-flex justify-content-center mb-2">
                      <NioButton onClick={switchForm} label={formType === 'personal' ? 'Company Info' : 'Personal Info'} className="btn-outline-indigo ms-2" />
                      </div>
                  </div>
                </div>
              </MDBCol>
            </Row>
          </MDBContainer>
          </Container>
        </div>
      </div>
    </section>
  )

                                      }  


