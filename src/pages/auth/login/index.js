import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';
import { NioBrand, NioButton, NioCard ,NioSection} from '../../../components';
import NioField from '../../../components/NioField/NioField';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import PaymentButton from '../../paiement';

export default function Login() {
  const [formErrors, setFormErrors] = useState([]);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0); // State for tracking login attempts
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setIsCaptchaValid(!!value);
  };

  const onSubmit = async (data) => {
    try {
      if (!isCaptchaValid) {
        console.log("Please verify the captcha!");
        return;
      }
  
      const response = await axios.post('http://localhost:9091/user/login', data);
      console.log('Login Response:', response);
      const accessToken = response.data.accessToken;
      console.log('Token during login:', accessToken);
  
      if (localStorage) {
        localStorage.setItem('token', accessToken);
        
        // Décoder le token pour obtenir les informations
        const decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
  
        if (decodedToken && decodedToken._id) {
          const companyId = decodedToken._id;
          localStorage.setItem('companyId', companyId);
          console.log('Company ID:', companyId);
        } else {
          console.error('Unable to decode token or companyId not found.');
        }
      } else {
        console.error('localStorage is not supported. Unable to save token and company ID.');
      }
  
      console.log(response.data.role);
      if (response.data.role === 'company') {
        navigate('/index-company-home-page');
      } else if (response.data.role === 'challenger') {
        navigate('/index-challenged-home-page');
      } else {
        navigate('/');
      }
      // Reset login attempts on successful login
      setLoginAttempts(0);
    } catch (error) {
      console.error('Login failed:', error.response.data);
      console.error('Detailed Error:', error);

      // Increment login attempts
      setLoginAttempts(prevAttempts => prevAttempts + 1);

      if (loginAttempts >= 2) {
        // Redirect to the blocked page
        navigate('/careers');
      } else {
        // Display login error
        setFormErrors([{ field: "login", message: "Login failed. Please check your credentials." }]);
      }
    }
  };

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const { email } = res.data;
        const userExistsResponse = await axios.get(
          `http://localhost:9091/user/check-google-existence?email=${email}`
        );
        if (userExistsResponse.data.exists) {
          navigate('/index-challenged-home-page');
        } else {
          console.error('User does not exist. Redirecting to registration page.');
          navigate('/registration-page');
        }
      } catch (err) {
        console.error('Error during Google sign-in:', err);
      }
    },
    onError: () => {
      console.log('Sign-in with Google Failed');
    },
  });

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

    <AuthLayout1 title="Login" rootClass="layout-1">
      <NioCard className="nk-form-card rounded-3 card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ marginTop: '-40px' }}>
        <NioCard.Body className="p-4">
          <div className="nk-form-card-head text-center pb-4">
            <div className="form-logo mb-3" >
            
            </div>
            <h3 className="title mb-2">Login to your account</h3>
            <p className="text">If you dont have an account? <Link to="/BeforeSignup" className="btn-link text-indigo" >sign-up</Link>.</p>

          </div>
          <FormProvider>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="gy-3">
                <Col xs={12}>
                  {formErrors.length > 0 && (
                    <p className="text-danger">{formErrors[0].message}</p>
                  )}
                </Col>
                <Col xs={12}>
                  <NioField htmlFor="email" label="Email">
                    <NioField.Input
                      id="email"
                      type="email"
                      htmlFor="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid Email Address"
                        }
                      })}
                      className={errors.email ? 'is-invalid' : ''}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </NioField>
                </Col>
                <Col xs={12}>
                  <NioField htmlFor="password" label="Password">
                    <NioField.Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password Is Required"
                      })}
                      icon="eye-fill after text-indigo"
                      placeholder="Enter your password"
                      className={errors.password ? 'is-invalid' : ''}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </NioField>
                </Col>
                <Col xs={12}>
                  <div className="d-flex justify-content-between align-items-center">
                    <NioField.Check id="check1" {...register("check1")}>
                      Remember Me
                    </NioField.Check>
                    <Link to="/auth/answers" className="fs-16 text-indigo">Forgot Password?</Link>
                  </div>
                </Col>
                <Col xs={12}>
                  <ReCAPTCHA
                    sitekey="6Ldl_IopAAAAAGqFfTC7gEmxqOhoLnPidP96OeGN"
                    onChange={handleCaptchaChange}
                  />
                </Col>
                <Col xs={12}>
                  <div className="form-group">
                    <NioButton
                      type="submit"
                      label="Login to Your Account"
                      className="btn-block btn-indigo"
                      disabled={!isCaptchaValid}
                    />
                  </div>
                </Col>
                <Col xs={12} className="pt-2">
                  <NioButton
                    onClick={signInWithGoogle}
                    label="Login With Google"
                    img="../images/icon/a.png"
                    className="border border-lighter text-nowrap text-dark w-100"
                  />
                </Col>
                {loginAttempts >= 2 && (
                  <Col xs={12}>
                    <p className="text-danger">You have reached the maximum login attempts. Please try again later.</p>
                  </Col>
                )}
              </Row>
            </form>
          </FormProvider>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>   
       </NioSection>

  );
}
