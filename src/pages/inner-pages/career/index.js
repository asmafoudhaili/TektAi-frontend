import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioCard, NioIcon, NioMedia, NioSection, NioSubscribeField } from '../../../components';

// section content 
import TestimonialContent from '../../../components/PageComponents/InnerPages/Careers/TestimonialContent/TestimonialContent';

function index() {

  return (
    <AppLayout variant={4} title="Careers" rootClass="layout-1" >

      {/*  Team Section Start   */}
      <section className="nk-section nk-section-teams pt-120 pt-lg-160" >
        <div className="nk-mask blur-1 left top"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} xl={6}>
            <div className="nk-section-head text-center pt-100 pt-lg-80 careers-section">
                <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >Join Us Now</span>
                <h2 >Sorry, you have made three wrong attempts.</h2>
                <p className="fs-20 mb-0" > Please verify your email or password and try again. </p>
                <p className="fs-20 mb-0" > If you need any help, don't hesitate to contact us. </p>

                <ul className="nk-btn-group justify-content-center pt-5">
                  <li>
                    <NioButton href="/auth/login" label="Try Signing-In Again" className="btn btn-primary" />
                  </li>
                  <li>
                    <NioButton href="/contact-us" label="Contact Us" className="btn btn-outline-primary" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="nk-section-content" >
          <TestimonialContent />
        </div>
      </section>
      {/*  Team Section End   */}

     
    </AppLayout >
  )
}

export default index;