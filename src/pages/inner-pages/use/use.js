import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// section content 
import { NioButton, NioSection, NioSubscribeField } from '../../../components';

function index() {
  return (
    <AppLayout variant={4} title="Terms and Conditions" rootClass="layout-1">

      {/*  Terms Section Start  */}
      <NioSection className="pt-120 pt-lg-180" masks={["blur-1 left top", "blur-1 right bottom"]}>
        <div className="nk-block-head md">
          <div className="nk-section-head pb-0">
            <nav>
              <ol className="breadcrumb mb-3 mb-md-4">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Terms Of Use</li>
              </ol>
            </nav>
            <h2>Terms Of Use</h2>
          </div>
          <hr className="mt-5 mb-0" />
        </div>
        <NioSection.Content>
          <Row className="g-gs pt-3">
            <Col lg={3}>
              <div className="nk-entry-sidebar">
                <ul className="nk-list-link nk-list-link-page flush">
                  <li className="active">
                    <Link to="#" className="fs-16">Term Of Use</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={9}>
      <div className="nk-entry-wrap pt-3 ps-lg-5">
        <div className="nk-entry">
          <div className="pb-5" id="terms-of-use">
            <h5>Acceptance of Terms</h5>
            <p className="fs-16">By using our platform, you agree to comply with these Terms of Use.</p>
          </div>
          <div className="pb-5">
            <h5>Use of Service</h5>
            <p className="fs-16">Our platform is intended for lawful purposes and must not be used for illegal activities.</p>
          </div>
          <div className="pb-5">
            <h5>Registration and Accounts</h5>
            <p className="fs-16">Users must create an account to access certain features and are responsible for account security.</p>
          </div>
          <div className="pb-5">
            <h5>Intellectual Property</h5>
            <p className="fs-16">All content on the platform is protected by intellectual property laws.</p>
          </div>
          <div className="pb-5">
            <h5>User Conduct</h5>
            <p className="fs-16">Users must not engage in abusive, harmful, or disruptive behavior on the platform.</p>
          </div>
          <div className="pb-5">
            <h5>Termination</h5>
            <p className="fs-16">We reserve the right to terminate accounts for violations of these Terms of Use.</p>
          </div>
          <div className="pb-5">
            <h5>Disclaimer</h5>
            <p className="fs-16">We provide the platform "as is" and disclaim any warranties or guarantees.</p>
          </div>
          <div className="pb-5">
            <h5>Limitation of Liability</h5>
            <p className="fs-16">We are not liable for any damages arising from the use or inability to use our platform.</p>
          </div>
          <div className="pb-5">
            <h5>Changes to Terms</h5>
            <p className="fs-16">We may update these Terms of Use without prior notice.</p>
          </div>
          <div className="pb-5">
            <h5>Governing Law</h5>
            <p className="fs-16">These Terms of Use are governed by the laws of your jurisdiction.</p>
          </div>
        </div>
        {/*  .nk-entry  */}
      </div>
      {/*  .nk-entry-wrap  */}
    </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Terms Section End  */}

    </AppLayout>
  )
}

export default index;