import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import Confetti from 'react-confetti';
// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';
import TestimonialContent from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/TestimonialContent';
import Browsechallenge from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/Browsechallenge';
import Mychallenge from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/Mychallenge';
import Favorite from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/Favorite';
import Team from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/Team';



// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BSSubscription/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import Popup from '../../../components/Alert/Popup';
function Index() {
  
  return (
    
    <AppLayout variant={15} title="ChallengedHome" rootClass="layout-11">


<NioSection className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">
<div className="nk-banner-wrap">

        {/* <Popup /> */}
          <Container>
          <Popup/>

          <Row className="align-items-center justify-content-center">
              <Col lg={12} >
              <div className="nk-banner-content text-center">
                <TypeAnimation
      sequence={[
        'Welcome ',
        2000,
        ' عسلامة',
        2000
      ]}
      wrapper="h5"
      speed={30}
      style={{ fontSize: '6em', display: 'inline-block' }}
      repeat={Infinity}
    />
                      <h1 className="text-capitalize display-6 mb-2" > to   <span className="title-shape title-shape-3 text-white"> your dashboard </span></h1>
                  <p className="fs-20 opacity-75 mb-0" >
                  Ready To Turn Challenges Into Triumphs!
                  </p>
                  <ul className="nk-btn-group flex-wrap justify-content-center pt-5 pt-lg-7">
                    <li>
                    <NioButton href="#" label="Let's Start" className="btn btn-yellow-400 btn-xl  text-nowrap" style={{ fontSize: '20px' }} />
                    </li>
                    {/* <li >   <Link to="/auth/login">
                    <NioButton label="View as a company"className="btn btn-white text-yellow text-nowrap"/>
                    </Link>
                    </li> */}
                  </ul>
                </div>
              </Col>
            
            </Row>
          </Container>
        </div>
</NioSection>
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
      <div className="nk-banner-cover nk-frame nk-frame-three">
      <Row className="justify-content-center">
          <Col lg={10}>
            <div className="pb-5 pb-lg-7 text-center">
            <h2> Your data science   <span className="text-purple-400">skills</span>  are the  <span className="text-purple-400">key</span>   to unlocking groundbreaking solutions</h2>
            <h4>TektAI is your platform to showcase expertise, collaborate, and drive real-world impact. Every challenge is an opportunity to redefine what's possible. So, dive in, collaborate, and let's shape the future of industries together!</h4>
              <ul className="nk-btn-group justify-content-center pt-5">
              
              </ul>
            </div>
          </Col>
        </Row>
                  <div className="nk-frame-children nk-frame-children-one">
                  <img src="images/business-subscription/mask-circle-1.png" className="animate animate-shake animate-duration-10" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-two">
                    <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-three">
                  </div>
                </div>
        <NioSection.Content>
        </NioSection.Content>
      </NioSection>

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
                  <NioButton href="#" className="btn-yellow" label="See All " />
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
      
      <NioSection  className="nk-section-program bg-red-100" masks={["shape-4 d-none d-md-block"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center pb-5">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-red mb-2"> Your Favorite Challenge </span>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/Favorit" className="btn-red" label="See All Favorite " />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content className="overflow-hidden">
          <div className="mx-lg-n9">
            <div className="mx-xl-n9">
              <Favorite />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>
      <NioSection className="nk-section-program " masks={["shape-1 d-none d-md-block"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center pb-5">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-purple mb-2">Some of Your Team</span>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/Team" className="btn-indigo" label="See All" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content className="overflow-hidden">
          <div className="mx-lg-n9">
            <div className="mx-xl-n9">
              <Team />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>
    
    </AppLayout >
  )
}

export default Index;