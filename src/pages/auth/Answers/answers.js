import React, { useState ,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

// layouts
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';

// components
import { NioButton, NioField, NioToaster, NioBrand, NioCard ,NioSection} from '../../../components';

export default function Answers() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
        email: '',
        questions: ['', '', ''],      
    },
  });

  const onSubmit = async (data) => {
    try {
      // Send a POST request to your backend endpoint to reset the password
      const response = await axios.post('http://localhost:9091/user/Answers',  data);
     

      // If request is successful (status code 200), navigate to home page or show success message
      if (response.status === 200) {
        setShowSuccess(true);
        reset();
        navigate('/auth/forgot-password');
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
    
  return (
    <NioSection className="bg-purple-100" masks={["shape-18"]}  >
    <AuthLayout1 title="Reset Password" rootClass="layout-1">
      {showSuccess && (
        <NioToaster variant="success" title="Success" message="Your password has been reset" />
      )}

      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-1 pb-1">
            </div>
            <h3 className="title mb-2">Reset Password</h3>
            <p className="text">
              Shouldn't Be Here <Link to="/auth/login" className="btn-link text-indigo">Login</Link>.
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
              <Col xs={12} >
                <NioField label="Email" htmlFor="email">
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
              <Col xs={12}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Col key={index} xs={12} >
                    <NioField label={`Question ${index + 1}`} htmlFor={`question${index + 1}`}>
                      <NioField.Input
                        id={`question${index + 1}`}
                        placeholder={`Enter your answer to Question ${index + 1}`}
                        errors={errors.questions && errors.questions[index]}
                        {...register(`questions[${index}]`)}
                      />
                      {errors.questions && errors.questions[index] && (
                        <span>{errors.questions[index].message}</span>
                      )}
                    </NioField>
                  </Col>
                ))}
              </Col>
              <Col xs={12}>
                <div className="form-group">
                  <NioButton type="submit" className="btn-indigo btn-block" label="Reset Password" />
                </div>
              </Col>
            </Row>
          </Form>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1></NioSection>
  );
}

