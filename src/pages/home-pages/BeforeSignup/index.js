import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioCard, NioButton, NioMedia, NioSection } from '../../../components';

function Index() {
  return (
    <NioSection className="d-flex align-items-center justify-content-center min-vh-100">
      <NioSection.Content>
        <div className="text-center pb-7">
          <h2 className="text-capitalize display-6 mb-4">Ready to Dive In? Join <span className="title-shape title-shape-2 text-indigo">TektAI</span> Today!</h2>
        </div>
        <Row className="gy-5">
          <Col lg={6}>
            <NioCard className="border-0 bg-purple-50">
              <NioCard.Body>
                <div className="nk-feature-block-content">
                  <NioMedia size="lg" variant="purple-300 text-white" rounded icon="building-fill" className="mb-3 mb-lg-5" />
                  <h4>Are You a <span className="text-purple-300 ">Company</span> </h4>
                  <p className="fs-16 mb-4">Forge powerful collaborations with skilled developers from around the globe. Benefit from diverse perspectives and accelerate your company's growth through collaborative problem-solving.</p>
                </div>
                <NioButton href="/Company-form" className="btn-indigo mb-4" label="Create Account" />
              </NioCard.Body>
            </NioCard>
          </Col>
          <Col lg={6}>
            <NioCard className="border-0 bg-purple-50">
              <NioCard.Body>
                <div className="nk-feature-block-content">
                  <NioMedia size="lg" variant="red-300 text-white" rounded icon="user-group-fill" className="text-white mb-3 mb-lg-5" />
                  <h4>Are You a <span className="text-red-300">Challenger</span> </h4>
                  <p className="fs-16 mb-4">Your efforts deserve to be rewarded. Receive tangible rewards for your innovative solutions and stand out in a community that values and celebrates your achievements.</p>
                  <NioButton href="/ChallengerForm" className="btn-indigo mb-4" label="Create Account" />
                </div>
              </NioCard.Body>
            </NioCard>
          </Col>
        </Row>
      </NioSection.Content>
    </NioSection>
  );
}

export default Index;
