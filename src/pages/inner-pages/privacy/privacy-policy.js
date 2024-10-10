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
                <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
              </ol>
            </nav>
            <h2>Privacy Policy</h2>
          </div>
          <hr className="mt-5 mb-0" />
        </div>
        <NioSection.Content>
          <Row className="g-gs pt-3">
            <Col lg={3}>
              <div className="nk-entry-sidebar">
                <ul className="nk-list-link nk-list-link-page flush">
                  <li className="active">
                    <Link to="#" className="fs-16">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={9}>
      <div className="nk-entry-wrap pt-3 ps-lg-5">
        <div className="nk-entry">
          <div className="pb-5" id="privacy-policy">
            <h5>Information Collection</h5>
            <p className="fs-16">We collect personal and non-personal information to improve our services.</p>
          </div>
          <div className="pb-5">
            <h5>Use of Information</h5>
            <p className="fs-16">We use collected data to provide, maintain, and improve our services.</p>
          </div>
          <div className="pb-5">
            <h5>Data Security</h5>
            <p className="fs-16">We implement security measures to protect user data from unauthorized access.</p>
          </div>
          <div className="pb-5">
            <h5>Third-Party Services</h5>
            <p className="fs-16">We may use third-party services that collect information used to identify users.</p>
          </div>
          <div className="pb-5">
            <h5>Changes to Policy</h5>
            <p className="fs-16">We reserve the right to update our privacy policy without prior notice.</p>
          </div>
          <div className="pb-5">
            <h5>Cookies</h5>
            <p className="fs-16">We use cookies to improve user experience and track usage patterns.</p>
          </div>
          <div className="pb-5">
            <h5>Opt-Out</h5>
            <p className="fs-16">Users can opt-out of certain data collection and processing activities.</p>
          </div>
          <div className="pb-5">
            <h5>Data Retention</h5>
            <p className="fs-16">We retain user data as long as necessary for the purposes outlined in this policy.</p>
          </div>
          <div className="pb-5">
            <h5>User Rights</h5>
            <p className="fs-16">Users have the right to access, update, and delete their personal information.</p>
          </div>
          <div className="pb-5">
            <h5>Compliance</h5>
            <p className="fs-16">We comply with applicable data protection laws and regulations.</p>
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