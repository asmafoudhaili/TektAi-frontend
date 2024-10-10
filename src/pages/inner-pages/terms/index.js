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
                  <a href="/index-collaboration-tool">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Terms &amp; Conditions</li>
              </ol>
            </nav>
            <h2>Terms &amp; Conditions</h2>
          </div>
          <hr className="mt-5 mb-0" />
        </div>
        <NioSection.Content>
          <Row className="g-gs pt-3">
            <Col lg={3}>
              <div className="nk-entry-sidebar">
                <ul className="nk-list-link nk-list-link-page flush">
                  <li className="active">
                    <Link to="#" className="fs-16">Term &amp; Conditions</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={9}>
      <div className="nk-entry-wrap pt-3 ps-lg-5">
        <div className="nk-entry">
          <div className="pb-5" id="terms">
            <h5>Acceptance of Terms</h5>
            <p className="fs-16">By using the TektAI platform, you automatically agree to these terms and conditions. If you do not agree with these terms, please do not use the platform.</p>
          </div>
          <div className="pb-5">
            <h5>Use of Service</h5>
            <p className="fs-16">TektAI offers collaboration, challenge submission, and data analysis services. Users are responsible for the appropriate use of these services in accordance with applicable laws and regulations.</p>
          </div>
          <div className="pb-5">
            <h5>Registration and User Account</h5>
            <p className="fs-16">To access certain features of the platform, you must create a user account. You are responsible for the confidentiality of your login credentials and activity associated with your account.</p>
          </div>
          <div className="pb-5">
            <h5>Intellectual Property</h5>
            <p className="fs-16">All content created or submitted by users remains their intellectual property. By using the platform, you grant TektAI a limited license to use this content within the scope of its services.</p>
          </div>
          <div className="pb-5">
            <h5>User Responsibilities</h5>
            <p className="fs-16">Users agree not to use the TektAI platform for illegal, fraudulent, or harmful purposes. You are responsible for the content you post and share on the platform.</p>
          </div>
          <div className="pb-5">
            <h5>Data Privacy</h5>
            <p className="fs-16">TektAI is committed to protecting the privacy of user data. Personal information will not be shared with third parties without prior consent, except as required by law.</p>
          </div>
          <div className="pb-5">
            <h5>Modification and Termination Rights</h5>
            <p className="fs-16">TektAI reserves the right to modify, suspend, or terminate your access to the platform for non-compliance with the terms and conditions or inappropriate behavior.</p>
          </div>
          <div className="pb-5">
            <h5>Limitation of Liability</h5>
            <p className="fs-16">TektAI shall not be liable for any direct, indirect, special, or consequential damages arising from the use or inability to use the platform.</p>
          </div>
          <div className="pb-5">
            <h5>Service Availability</h5>
            <p className="fs-16">TektAI endeavors to maintain the availability and reliability of its services but does not guarantee uninterrupted access to the platform.</p>
          </div>
          <div className="pb-5">
            <h5>Applicable Law</h5>
            <p className="fs-16">These terms and conditions are governed by the applicable laws of your jurisdiction, and any dispute shall be subject to the competent courts of that jurisdiction.</p>
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