import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BSSubscription/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BSSubscription/TestimonialContent/TestimonialContent';
import PaymentButtonGold from '../../Paiement/paiementGold';
import PaymentButtonSilver from '../../Paiement/paiementSilver';
import PaiementButtonPlatinium from '../../Paiement/paiementPlatinium';

function index() {
  return (
    <AppLayout variant={12} title="Subscriptions" rootClass="layout-11">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">
        <div className="nk-banner-wrap">
          <Container>
            <Row className="align-items-center justify-content-lg-between position-relative">
              <Col lg={6} >
                <div className="nk-section-head text-center text-lg-start pb-5 pb-sm-7 pb-lg-0">
                  <span className="d-inline-block fs-16 fw-semibold text-danger text-uppercase mb-2" ></span>
                  <h1 className="display-6 mb-md-5" >Grow Your <br className="d-none d-lg-block" /> Business With <span className="d-lg-block"> Our Subscriptions.</span></h1>
                  <p className="fs-20 opacity-75 mb-0" >
                  Supercharge your business with our premium subscription! Unlock a world of advanced tools and exclusive features that will elevate your company's performance. Subscribe now and stay ahead of the competition!
                  </p>

                </div>
              </Col>
              <Col lg={5}>
                <div className="nk-banner-cover nk-frame nk-frame-three">
                  <img src="images/business-subscription/banner-cover-1.jpg" alt="banner-cover" className="rounded-5 overflow-hidden" />
                  <div className="nk-frame-children nk-frame-children-one">
                    <img src="images/business-subscription/mask-circle-1.png" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-two">
                    <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/* features Section Start */}
      {/* <NioSection className="nk-section-features py-7 py-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 fw-bold text-uppercase text-primary-alt mb-2">powerfull features</span>
          <h2>Discover Powerful Features</h2>
          <p className="fs-20 mb-0"> Unlock a range of powerful features designed to enhance your experience and maximize productivity. Explore now! </p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="/contact-us-solution" label="Contact Us" className="btn-outline-primary-alt text-nowrap" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-lg-7">
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="trend-up" variant="primary-alt-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Advanced Metrics Selection</h4>
                    <p className="fs-16  line-clamp-2">companies can choose from a variety of metrics beyond just accuracy, providing a deeper understanding of your data.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="emails" variant="success-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Code Visibility Control</h4>
                    <p className="fs-16  line-clamp-2">Take control of your code! Our premium subscription empowers companies to decide the visibility of their code—public for collaboration or private for exclusive use within the company.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="users" variant="warning-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Team Management</h4>
                    <p className="fs-16  line-clamp-2"> Our calendar lets you know what is happening with customer and projects so you. </p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection> */}
      {/* features Section End */}

      {/* Process Section Start */}
      {/* <NioSection className="nk-how-it-work-section bg-gray overflow-hidden">
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
                      <NioMedia size="md" rounded icon="check" variant="danger-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 1</span>
                      <div>
                        <h3 className="mb-2">Create Account</h3>
                        <p className="fs-16 "> Sign up and create your account in just a few easy steps. Join our platform and unlock a world of possibilities today. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="danger-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 2</span>
                      <div>
                        <h3 className="mb-2">Explore Metrics</h3>
                        <p className="fs-16 "> Explore and choose from a variety of metrics beyond mere accuracy. Empower your company to track and analyze specific metrics that matter most to you with our intuitive platform. Fuel your decision-making with comprehensive insights. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="danger-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 3</span>
                      <div>
                        <h3 className="mb-2">Code Control</h3>
                        <p className="fs-16 ">Maintain control over your code by choosing between public and private visibility. Ensure that your code is accessible only to your organization, providing you with the security and exclusivity you need. </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection> */}
      {/* Process Section End */}

      {/* funfact Section Start */}
      {/* <NioSection className="nk-funfact-section pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="align-items-center justify-content-between text-center text-lg-start">
            <Col lg={4}>
              <div className="nk-section-head pb-7 pb-lg-0">
                <span className="d-inline-block fs-14 fw-bold text-uppercase text-danger mb-2">our facts</span>
                <h2>We are proud of our works</h2>
              </div>
            </Col>
            <Col lg={8}>
              <Row className="gy-5 gy-md-0 justify-content-center">
                <Col sm={6} md={4} >
                  <div className="text-center">
                    <div className="mb-3">
                      <NioIcon size="lg" name="users-fill" className="text-primary" />
                    </div>
                    <div>
                      <NioCount className="h2 d-block" end={3472} />
                      <p className="fs-18 ">Happy Customers</p>
                    </div>
                  </div>
                </Col>
                <Col sm={6} md={4} >
                  <div className="text-center">
                    <div className="mb-3">
                      <NioIcon size="lg" name="grid-fill-c" className="text-info" />
                    </div>
                    <div>
                      <NioCount className="h2 d-block" end={235} decimals={2} decimal="." />
                      <p className="fs-18 ">Average Rating</p>
                    </div>
                  </div>
                </Col>
                <Col sm={6} md={4} >
                  <div className="text-center">
                    <div className="mb-3">
                      <NioIcon size="lg" name="user-check-fill" className="text-warning" />
                    </div>
                    <div>
                      <NioCount className="h2 d-block" end={2184} />
                      <p className="fs-18 ">Active Users</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection> */}
      {/* funfact Section Start */}

      {/* Customer Testimonials Section Start */}
      {/* <NioSection>
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection> */}
      {/* Customer Testimonials Section End */}

      {/* Faqs Section Start */}
      {/* <NioSection className="nk-section-faq">
        <Row className="justify-content-between">
          <Col xl={4}>
            <div className="nk-section-head pb-5 pb-xl-0">
              <span className="d-inline-block fs-14 fw-bold text-uppercase text-primary-alt mb-2">FAQS</span>
              <h2>Frequently Asked Questions</h2>
              <p className="fs-20 mb-0"> Get quick answers to common queries about our service, pricing, security, and account management in our FAQ section. </p>
              <ul className="nk-btn-group pt-5">
                <li>
                  <NioButton href="/help-center" label="Go to support center" className="btn-primary-alt text-nowrap" />
                </li>
                <li>
                  <NioButton href="/contact-us-solution" label="Contact Us" className="btn-primary-alt-soft" />
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={8} >
            <FaqContent />
          </Col>
        </Row>
      </NioSection> */}
      {/* Faqs Section End */}

      {/* Pricing Plans Section Start */}
      <NioSection className="nk-section-pricing ">
      <NioSection.Content className="position-relative z-1">
          <Row className="align-items-center">
            <Col xs={{ order: 2 }} md={6} xl={{ span: 4, order: 0 }} >
              <div className="card-pricing mb-5 mb-xl-0">
                <div className="card-pricing-heading">
                <div className="icon bg-light" style={{ width: '150px', height: '150px' }}>
                    <img src="images/bronse.png" alt="icon" />
                  </div>
                  <div className="info">
                    <h3>Bronze</h3>
                    <span className="text-base">For the beginners</span>
                  </div>
                </div>
                <div className="card-pricing-content">
                  <div className="price-tag"> $99 <span className="text-base">/user</span></div>
                  <ul className="card-pricing-info">
                    <li>
                      <p>You are allowed to create 5 challenges per month</p>
                    </li>
                  </ul>
                  <div className="card-pricing-action">


                  <PaymentButtonSilver/>       </div>
                </div>
              </div>
            </Col>
            <Col xs={{ order: 1 }} xl={{ span: 4, order: 0 }} >
              <div className="card-pricing border border-indigo card-pricing-lg mb-5 mb-xl-0">
                <div className="card-pricing-heading">
                <div className="icon bg-light" style={{ width: '150px', height: '150px' }}>
                    <img src="images/platinum.png" alt="icon" />
                  </div>
                  <div className="info">
                    <h3>Platinium</h3>
                    <span className="text-base">For the professionals</span>
                  </div>
                </div>
                <div className="card-pricing-content">
                  <div className="price-tag text-indigo"> $329 <span className="text-base">/user</span></div>
                  <ul className="card-pricing-info">
                    <li>
                      <p>You can create Unlimited number of challenges</p>
                    </li>
                    <li>
                      <p>Support System</p>
                    </li>
                  </ul>
                  <div className="card-pricing-action">
                  <PaiementButtonPlatinium/>
                                              </div>
                </div>
              </div>
            </Col>
            <Col xs={{ order: 3 }} md={6} xl={{ span: 4, order: 0 }} className="col-md-6 col-xl-4 order-3 order-xl-0" >
              <div className="card-pricing mb-5 mb-xl-0">
                <div className="card-pricing-heading">
                <div className="icon bg-light" style={{ width: '150px', height: '150px' }}>
  <img src="images/gold.png" alt="icon" />
</div>

                  <div className="info">
                    <h3>Gold</h3>
                    <span className="text-base">For the beginners</span>
                  </div>
                </div>
                <div className="card-pricing-content">
                  <div className="price-tag"> $199 <span className="text-base">/user</span></div>
                  <ul className="card-pricing-info">
                    <li>
                      <p>You are allowed to create 20 challenges per month</p>
                    </li>
                  </ul>
                  <div className="card-pricing-action">
                  <PaymentButtonGold/>                </div>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>

      </NioSection>
      {/* Pricing Plans Section End */}

      {/* Cta Section Start */}
      {/* <NioSection className="nk-section-cta pt-7 pt-lg-120">
        <NioSection.Content className="nk-cta-card card-mask card-mask-one bg-primary-alt p-5 px-md-5 py-md-7 p-lg-7 rounded-3">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="nk-section-head pb-5 text-center">
                <h2 className="text-white">Get Voucher Discount Up To 50%</h2>
                <p className="fs-20 text-white opacity-75">Put your email address and get started</p>
              </div>
            </Col>
            <Col lg={8} xl={6}>
              <NioSubscribeField
                icon="mail before"
                variant="one"
                buttontext="Get Voucher"
              />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection> */}
      {/* Cta Section End */}

    </AppLayout >
  )
}

export default index;