import React, { useState ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

// layouts
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';

// components
import { NioButton, NioField, NioToaster, NioBrand, NioCard, NioSection } from '../../../components';
import {jwtDecode} from 'jwt-decode'; // Importez jwtDecode pour décoder le JWT

export default function VerifCode2() {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Array to store each digit of the code
    const [showSuccess, setShowSuccess] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      mode: 'onBlur',
      defaultValues: {
        codeForget: '',
      },
    });
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);
  
    const onSubmit = async (data) => {
      const challengerData = JSON.parse(localStorage.getItem('challengerData'));
  
      try {
          const combinedCode = verificationCode.join('');
          const response = await axios.post('http://localhost:9091/user/VerifNewUser', {
              codeForget: combinedCode,
              email: challengerData.email,
          });
  
          if (response.status === 200) {
              // Création du compte pour le rôle "challenged" en premier
              const challengerResponse = await axios.post('http://localhost:9091/user', challengerData, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
  
              console.log('Response from server (challenger):', challengerResponse.data);
  
            
              const challengerId = challengerResponse.data.user._id; // Récupérer l'identifiant du challenger

              // Stocker l'identifiant du challenger dans le stockage local
              localStorage.setItem('challengerId', challengerId);
  
              // Mise à jour des données de la société avec l'id du challenger
              const companyData = JSON.parse(localStorage.getItem('companyData'));
              const companyDataWithChallengerId = {
                  ...companyData,
                  challengerId,
              };
              console.log("challengeridddd:",challengerId);
  
              // Ensuite, créer le compte de la société avec les données mises à jour
              const companyResponse = await axios.post('http://localhost:9091/user', companyDataWithChallengerId, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
  
              if (companyResponse.status === 201) {
                  localStorage.setItem('token', companyResponse.data.accessToken);
                  navigate('/index-company-home-page');
              } else {
                  console.error('Error:', companyResponse.data);
              }
  
              console.log('Response from server (company):', companyResponse.data);
  
              const companyId = jwtDecode(companyResponse.data.accessToken);
              const challengerToCompany = {
                  ...challengerData,
                  companyId,
              };
  
              console.log('Response from server (challenger):', challengerResponse.data);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
  
  
    const handleChange = (index, value) => {
      const updatedCode = [...verificationCode];
      updatedCode[index] = value;
      setVerificationCode(updatedCode);
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
  

  return (
    <NioSection className="bg-purple-100" masks={["shape-18"]}  >

    <AuthLayout1 title="Forgot Password" rootClass="layout-1" style={{ marginTop: '0px' }}>
      {showSuccess && (
        <NioToaster variant="success" title="Success" message="Your Password sent it to your email" />
      )}

      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" >
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-1 pb-1">
                     </div>
            <h3 className="title mb-2" style={{ marginTop: '70px' }}>Verify Your Email</h3>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4" style={{ marginTop: '30px' }}>
              {verificationCode.map((digit, index) => (
                <Col xs={3} key={index} >
                  <Form.Control
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </Col>
              ))}
              <Col xs={12}>
                <div className="form-group" style={{ marginTop: '30px' }}>
                  <NioButton type="submit" className="btn-indigo btn-block" label="Verify Code" />
                </div>
                <div style={{ padding: '60px' }}></div>
              </Col>
            </Row>
          </Form>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
    </NioSection>
  );
}
