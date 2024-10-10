import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import CookieDisclaimer from '../../../components/CookieDisclaimer/CookieDisclaimer';
// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';
import TestimonialContent from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/TestimonialContent';
import BlogsContent from '../../../components/PageComponents/InnerPages/Blogs/BlogsContent/BlogsContent'; 
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import Browsechallenge from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/Browsechallenge';
import Mychallenge from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/Mychallenge';
function Index() {
  const [challengerLoggedIn, setChallengerLoggedIn] = useState(false);

  const handleCreateChallengeClick = () => {
    // Get the target element by its id
    const targetElement = document.getElementById('createchallenge');

    // Scroll to the target element
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }; 
  
  const handleViewAsChallenger = async () => {
    try {
      // Faites une requête GET au backend pour obtenir l'access token du challenger
      const response = await fetch('http://localhost:9091/user/getChallenger', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Utilisez la clé 'token'
        },
      });
      // Loguez le statut de la réponse
      console.log('Response status:', response.status);
      window.location.reload(true); // Actualiser la page
      // Loguez le contenu de la réponse
      const responseData = await response.json();
      console.log('Response data:', responseData);

      // Stockez l'access token dans le localStorage avec la clé 'token'
      localStorage.setItem('token', responseData.accessToken); // Utilisez la clé 'token'

      // Ouvrez la session du challenger après avoir obtenu l'access token
    } catch (error) {
      console.error('Error fetching challenger token:', error);
      // Gérez les erreurs ou les messages d'échec de connexion
    }
  };

  
  
  
  return (
    <>
    <AppLayout variant={12} title="CompanyHome" rootClass="layout-11">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">
        <div className="nk-banner-wrap">
          <Container>
            <Row className="align-items-center justify-content-center">
            <Col lg={12} >
            <div className="nk-banner-content text-center">
                  <div>
                    <TypeAnimation
      sequence={[
        'Welcome ',
        2000,
        ' عسلامة',
        2000
      ]}
      wrapper="h1"
      speed={50}
      style={{ fontSize: '6em', display: 'inline-block' }}
      repeat={Infinity}
    />
                      <h1 className="text-capitalize display-6 mb-2" > to your  <span className="title-shape title-shape-3 text-white"> company </span> dashboard</h1>
                      <h6 className="text-capitalize display" > Unleash your innovation, collaborate dynamically, and redefine the future of data science with us! </h6>
                    </div>
                    <ul className="nk-btn-group flex-wrap justify-content-center pt-5 pt-lg-7">
                    <li>
                      <NioButton onClick={handleCreateChallengeClick}  label="Let's Start" className="btn btn-yellow-400 btn-xl  text-nowrap" style={{ fontSize: '20px' }} />
                    </li>
                    <li>      <Link to="/index-challenged-home-page">

<NioButton
onClick={() => {
handleViewAsChallenger(); 
}}
label="View As Challenger"
className="btn btn-white text-yellow text-nowrap"   
/>
</Link>
</li>
                  </ul>
                  </div>
              </Col>
             
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/* Process Section Start */}
      <section id='createchallenge'>
      <NioSection className="nk-how-it-work-section  overflow-hidden">
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            <div className="nk-section-head text-center pb-7">
              <span className="d-inline-block fs-14 fw-bold text-uppercase text-indigo mb-2">our process</span>
              <h2>Let’s See How it Works</h2>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="flex-row-reverse align-items-center justify-content-between">
            <Col lg={5} >
              <div className="nk-video nk-video-s1 mb-5 mb-md-7 mb-lg-0 ">
                <div className="nk-mask shape-28 d-none d-md-block"></div>
                <div className="nk-video-inner">
                  <div className="nk-video-content">
                    <div className="nk-video-img">
                      <img src="images/business-digital/section-cover-1.jpg" alt="" className="rounded-2 w-100" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        size="lg"
                        rounded
                        icon="play-fill text-white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="text-bg-danger shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <ul className="nk-schedule d-flex flex-column gap-5 nk-schedule-s2">
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="indigo-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 1</span>
                      <div>
                        <h3 className="mb-2"> Craft Your Challenge</h3>
                        <p className="fs-16 "> Press the Button "Create Challenge" .
Fill in details about your challenge, specifying objectives, industry context, and desired outcomes. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="indigo-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 2</span>
                      <div>
                        <h3 className="mb-2">Set Performance Metrics</h3>
                        <p className="fs-16 "> Define key metrics for automated performance evaluation.
Ensure clear criteria for fair and efficient assessment.Specify the reward .</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="indigo-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 3</span>
                      <div>
                        <h3 className="mb-2"> Launch Your Challenge</h3>
                        <p className="fs-16 ">  With just a click, make your challenge visible to a global pool of talented data science developers.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="nk-btn-group justify-content-center justify-content-center pt-5 pt-lg-6">
                    <li>
                      <NioButton href="/Competion-form" label="CREATE A CHALLENGE" className="btn btn-indigo text-nowrap" />
                    </li>
</ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      </section>
      {/* Process Section End */}
      <NioSection className="nk-section-program  bg-indigo-50" masks={["shape-1 d-none d-md-block"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center pb-5">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-purple mb-2">Browse Challenge </span>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/Allchallenges" className="btn-indigo" label="See All" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content className="overflow-hidden">
          <div className="mx-lg-n9">
            <div className="mx-xl-n9">
              <Browsechallenge />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>

      <NioSection className="nk-section-program" masks={["shape-1 d-none d-md-block"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center pb-5">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-yellow mb-2"> Your Challenge </span>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/Mychallengecompany" className="btn-yellow" label="See All " />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content className="overflow-hidden">
          <div className="mx-lg-n9">
            <div className="mx-xl-n9">
              <Mychallenge />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>
      
     
    </AppLayout >
    <CookieDisclaimer/>
    </>
  )
}

export default Index;