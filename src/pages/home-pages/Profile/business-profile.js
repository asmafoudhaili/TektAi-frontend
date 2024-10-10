import React, { useState, useEffect, useContext } from 'react';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import axios from 'axios';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NioSection, NioButton, NioMedia, NioField } from '../../../components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list';
import ReactFlagsSelect from 'react-flags-select';
import { SocketContext } from '../../../context/SocketProvider/SocketProvider';

export default function Profil({ onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const { connectedUser, setConnectedUser } = useContext(SocketContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  
  /*const [data, setData] = useState({

    
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    status: '',
    country: '',
    imageUser: 'images/no_pdp.jpg',
    role: '',
    
  });*/
  const navigate = useNavigate();

  /*useEffect(() => {
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
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phone: userData.phone,
          status: userData.status,
          country:userData.country,
          imageUser: userData.imageUser || 'images/no_pdp.jpg', // If imageUser is empty, use default image
          role: userData.role,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);*/

  const handleImageUserChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setConnectedUser(prevData => ({
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
      const response = await axios.put('http://localhost:9091/user/profile', connectedUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Profile updated successfully:', response.data);
     // onUpdate(data); // Utilisation de onUpdate pour mettre à jour les données utilisateur
      window.location.reload(true); // Actualiser la page
      navigate('/profile');

    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Si l'erreur est une 'PayloadTooLargeError'
        // Afficher un message d'erreur dans l'interface utilisateur
        alert("The image size is too large. Please choose a smaller image.");
      } else {
        console.error('Error updating profile:', error);
      }
      console.error('Error updating profile:', error);
    }
  };
  
  const handlePhoneNumberChange = (value) => {
    setConnectedUser(prevData => ({
      ...prevData,
      phone: value.toString(), // Convertir en chaîne de caractères
    }));
  };
  
  
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleCountryChange = (value) => {
    setConnectedUser(prevData => ({
      ...prevData,
      country: value,
    }));
  };
 

  

 
  const allCountryNames = Object.values(countries).map(country => country.name);

  return (
    <AppLayout variant={4} title="Profil" rootClass="layout-10">

      <NioSection className="bg-purple-100" masks={["shape-18"]} style={{ height: '300px' }}>
        <Container>
          <Row className="justify-content-center">
            
          </Row>
        </Container>
      </NioSection>

      <NioSection className="nk-section-player">
        <NioSection.Content>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="nk-video">
                  <div className="nk-video-inner">
                    <div className="nk-video-content">
                      <div className="nk-video-img nk-frame text-center">
                        <div className="nk-video-counter bg-white shadow-xl rounded-4 p-5">
                          <Container>
                            <Row>
                            <Col lg={12}>
                            <input
                    type="file"
                    id="profile-image-input"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageUserChange}
                  />
                  <label htmlFor="profile-image-input">
                    <div 
                      className="position-relative"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{ cursor: 'pointer' }}
                    >
                     <img
  src={connectedUser.imageUser}
  alt="Profile"
  className={`img-fluid rounded-circle`}
  style={{
    width: '200px',
    border: '3px solid indigo', // Set border color to indigo
    zIndex: '1',
    transition: 'filter 0.3s ease-in-out',
    filter: isHovered ? 'brightness(50%)' : 'brightness(100%)'
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
                
</Col>

                            </Row>
                            <Row className="mb-4 justify-content-center">
                              <Col style={{ textAlign: 'center' }}>
                                <h4 className="text-capitalize  text-indigo">
                                 {connectedUser.firstname} 

                                 {connectedUser.Lastname} 
                                </h4>
                                <p className=" text-indigo">
                                  <NioMedia size="sm" icon="mail" className="me-2 text-indigo" /> {connectedUser.email}
                                </p>
                                < p className=" text-indigo">
                                  <NioMedia size="sm" icon="mobile" className="me-2 text-indigo" /> {connectedUser.phone}
                                </p>
                                <p className=" text-indigo">
                                  <NioMedia size="sm" icon="location" className="me-2 text-indigo" /> {connectedUser.country}
                                </p>
                              </Col>
                            </Row>
                            {connectedUser.role === 'challenger' && ( 

                            <Row className="mb-4">
                              <Col>
                                <Form>
                                  <Row className="mb-4">
                                    <Col sm={6}>
                                      <NioField label="First Name" htmlFor="title">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter your first name"
                                          value={connectedUser.firstname}
                                          onChange={(e) => setConnectedUser(prevData => ({ ...prevData, firstname: e.target.value }))}
                                        />
                                      </NioField>
                                    </Col>
                                    <Col sm={6}>
                                      <NioField label="Last Name" htmlFor="title">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter your last name"
                                          value={connectedUser.lastname}
                                          onChange={(e) => setConnectedUser(prevData => ({ ...prevData, lastname: e.target.value }))}
                                        />
                                      </NioField>
                                    </Col>
                                  </Row>
                                  <Row className="mb-4">
                                    <Col sm={6}>
                                      <NioField label="Status" htmlFor="title">
                                        <Form.Control
                                          as="select"
                                          custom
                                          value={connectedUser.status}
                                          onChange={(e) => setConnectedUser(prevData => ({ ...prevData, status: e.target.value }))}
                                        >
                                          <option value="">Select your status</option>
                                          <option value="Data-Scientist">Data Scientist</option>
                                          <option value="Developer">Developer</option>
                                          <option value="Teacher">Teacher</option>
                                          <option value="Searcher">Searcher</option>
                                          <option value="Student">Student</option>
                                        </Form.Control>
                                      </NioField>
                                    </Col>
                                    <Col sm={6}>
                                      <NioField label="Email" htmlFor="title">
                                        <input
                                          type="email"
                                          className="form-control"
                                          placeholder="Enter your email"
                                          value={connectedUser.email}
                                          onChange={(e) => setConnectedUser(prevData => ({ ...prevData, email: e.target.value }))}
                                        />
                                      </NioField>
                                    </Col>
                                  </Row>
                                  <Row className="mb-4">
                                    <Col sm={6}>
                                      <NioField label="Phone" htmlFor="title">
                                        <div style={{ width: '100%' }}>
                                          <PhoneInput
                                            placeholder={connectedUser.phone}
                                            inputStyle={{
                                              height: '52px',
                                              width: '100%',
                                              borderTopRightRadius: '10px',
                                              paddingLeft: '45px',
                                            }}
                                            onChange={handlePhoneNumberChange}
                                          />
                                        </div>
                                      </NioField>
                                    </Col>
                                    <Col sm={6}>
                                      <NioField label="Country" htmlFor="title">
                                        <div style={{ width: '100%' }}>
                                          <ReactFlagsSelect
                                            customLabels={allCountryNames}
                                            countries={Object.keys(countries)}
                                            selected={connectedUser.country}
                                            selectedSize={20}
                                            optionsSize={14}
                                            onSelect={handleCountryChange}
                                            placeholder="Select a country"
                                            inputStyle={{
                                              height: '52px',
                                              width: '100%',
                                              borderTopRightRadius: '10px',
                                              paddingLeft: '45px',
                                            }}
                                          />
                                        </div>
                                      </NioField>
                                    </Col>
                                  </Row>
                              
                                  <Row>
                                    <Col style={{ marginTop: '20px' }}>
                                      <div className="d-flex justify-content-center mb-2">
                                        <NioButton onClick={updateProfile} className="btn-indigo me-2" label="Edit profile" />
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </Col>
                            </Row>
                            )}
                            {connectedUser.role === 'company' && (

 <Row className="mb-4">
                              <Col>
                                <Form>
                                  <Row className="mb-4">
                                    <Col sm={6}>
                                      <NioField label="Company Name" htmlFor="title">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter your first name"
                                          value={connectedUser.firstname}
                                          onChange={(e) => setConnectedUser(prevData => ({ ...prevData, firstname: e.target.value }))}
                                        />
                                      </NioField>
                                    </Col>
                                  
                                  
                                   
                                    <Col sm={6}>
                                      <NioField label="Email" htmlFor="title">
                                        <input
                                          type="email"
                                          className="form-control"
                                          placeholder="Enter your email"
                                          value={connectedUser.email}
                                          onChange={(e) => setConnectedUser(prevData => ({ ...prevData, email: e.target.value }))}
                                        />
                                      </NioField>
                                    </Col>
                                  </Row>
                                  <Row className="mb-4">
                                    <Col sm={6}>
                                      <NioField label="Phone" htmlFor="title">
                                        <div style={{ width: '100%' }}>
                                          <PhoneInput
                                            placeholder={connectedUser.phone}
                                            inputStyle={{
                                              height: '52px',
                                              width: '100%',
                                              borderTopRightRadius: '10px',
                                              paddingLeft: '45px',
                                            }}
                                            onChange={handlePhoneNumberChange}
                                          />
                                        </div>
                                      </NioField>
                                    </Col>
                                    <Col sm={6}>
                                      <NioField label="Country" htmlFor="title">
                                        <div style={{ width: '100%' }}>
                                          <ReactFlagsSelect
                                            customLabels={allCountryNames}
                                            countries={Object.keys(countries)}
                                            selected={connectedUser.country}
                                            selectedSize={20}
                                            optionsSize={14}
                                            onSelect={handleCountryChange}
                                            placeholder="Select a country"
                                            inputStyle={{
                                              height: '52px',
                                              width: '100%',
                                              borderTopRightRadius: '10px',
                                              paddingLeft: '45px',
                                            }}
                                          />
                                        </div>
                                      </NioField>
                                    </Col>
                                  </Row>
                              
                                  <Row>
                                    <Col style={{ marginTop: '20px' }}>
                                      <div className="d-flex justify-content-center mb-2">
                                        <NioButton onClick={updateProfile} className="btn-indigo me-2" label="Edit profile" />
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </Col>
                            </Row>
                            )}
                          </Container>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          
        </NioSection.Content>
      </NioSection>

    </AppLayout>
  );
}