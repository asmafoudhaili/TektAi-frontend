import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// component 
import { NioButton, NioCard, NioSection, NioMedia, NioBrand, NioSubscribeField, NioIcon } from '../../../components';

// section content  
import ContactForm from '../../../components/PageComponents/SectionComponents/ContactForm/ContactForm';
import { Link } from 'react-router-dom';

function index() {
  return (
    <AppLayout variant={4} title="Contact" rootClass="layout-6">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-collab">
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-mask"></div>
            <NioSection >
        <NioSection.Content>
          <Row className=" gy-5 justify-content-lg-between">
            <Col lg={8} >
              <ContactForm />
            </Col>
            <Col lg={4}>
              <div className="card-list">
                <NioCard >
                  <NioCard.Body>
                    <NioMedia size="lg" rounded variant="indigo-soft" icon="mail" className="mb-5" />
                    <h4>Our Email</h4>
                    <p className="line-clamp-2">tektaicontact@gmail.com</p>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                  <NioMedia size="lg" rounded variant="indigo-soft" icon="mobile" className="mb-5" />
                    <h4>Phone</h4>
                    <p className="line-clamp-2">(+216) 93092411</p>
                    <p className="line-clamp-2">(+216) 92701941</p>
                  </NioCard.Body>
                </NioCard>
              </div>
              {/*  .card-list  */}
            </Col>
          </Row>
        </NioSection.Content></NioSection>
          </div>
      </section>
      {/*  Banner Section End  */}

      {/*  Contact Section Start  */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Head alignX="center">
          <h2>Our Location</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row className=" gy-5 justify-content-lg-between">
            <Col lg={8} >
            <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1,%202%20rue%20Andr%C3%A9%20Amp%C3%A8re%20-%202083%20-%20P%C3%B4le%20Technologique%20-%20El%20Ghazala.+(TektAI)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe>
            </Col>
            <Col lg={4}>
              <div className="card-list">
                <NioCard >
                  <NioCard.Body>
                    <NioMedia size="lg" rounded variant="indigo-soft" icon="location" className="mb-5" />
                    <p className="line-clamp-2">1, 2 rue André Ampère - 2083 - Pôle Technologique - El Ghazala.</p>
                    
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <NioMedia size="lg" rounded variant="indigo-soft" icon="calendar" className="mb-5" />
                    <h4>We are available </h4>
                    <p className="line-clamp-2">9:00 am -7:00 pm</p>
                    
                  </NioCard.Body>
                </NioCard>
              </div>
              {/*  .card-list  */}
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Contact section end   */}

      {/*  CTA Section Start   */}
      <NioSection>
        <NioSection.Content>
          <div className="position-relative nk-cta-wrap bg-purple-100 rounded-16 is-theme p-4 p-md-7 py-6 py-md-7 overflow-hidden">
            <div className="nk-mask z-1 shape-22"  ></div>
            <Row className="justify-content-center">
              <Col>
                <div className="nk-section-head pb-0 text-center ">
                  <NioBrand
                    logo="s2"
                    variant="dark"
                    className="mb-3" />
                  <h2 className='text-black'>
                    We Are Trusted By 5k+ Clients.
                    <br className="d-none d-lg-block" />
                    Join Them to Grow Your Business.
                  </h2>
                  <ul className="nk-btn-group pt-5 justify-content-center" >
                    <li>
                      <NioButton href="/auth/sign-up" className="btn-indigo" label="Join Our Community" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section End   */}

      {/*  Newsletter Section Start  */}
      <NioSection className="nk-newsletter-section pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-1 border-bottom border-gray-500">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join the 5000+ People That Uses Softnio Products.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={5}>
            <NioSubscribeField variant="one" />
          </Col>
        </Row>
      </NioSection>
      {/*  Newsletter Section End  */}
    </AppLayout >
  )
}

export default index;