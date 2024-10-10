import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layouts 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioSection, NioIcon, NioCount, NioButton, NioCard, NioMedia, NioSubscribeField, NioBrand } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/InnerPages/AboutSolution/FaqContent/FaqContent';
import BannerContent from '../../../components/PageComponents/InnerPages/AboutSolution/BannerContent/BannerContent';

function index() {
  return (
    <AppLayout variant={4} title="About" rootClass="layout-6">

      {/*   Banner Section Start  */}
      <div className="nk-banner nk-banner-collab">
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-mask"></div>
          <Container>
            <div className="nk-section-head text-center is-theme">
              <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3" >Meet our company</span>
              <h1 className="text-black" >
                We’re<br className="d-none d-md-block " />
                <span className="text-indigo">architects of change</span>
              </h1>
            </div>
            <div className="nk-banner-slider-content">
              <BannerContent />
            </div>
          </Container>
        </div>
      </div>
      {/*  Banner Section End   */}

      {/*  Features Section Start   */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0 gx-lg-7">
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={4} suffix="m" />
                  <span className="text-indigo"> +</span>
                </div>
                <h5 className="text-capitalize">Global Customers</h5>
                <p> Serving global customers with tailored solutions for their business. </p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={600} />
                  <span className="text-indigo"> %</span>
                </div>
                <h5 className="text-capitalize">Annual Revenue</h5>
                <p> Our annual revenue reflects our success in delivering value.</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={20} />
                  <span className="text-indigo"> k</span>
                </div>
                <h5 className="text-capitalize">5 Star Reviews</h5>
                <p> Our 5-star reviews are a testament to the satisfaction and positive.</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={240} />
                  <span className="text-indigo"> %</span>
                </div>
                <h5 className="text-capitalize">Retun on Investment</h5>
                <p> Our focus on delivering a strong return on investment ensures that our.</p>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Features Section End    */}

      {/*  our-mission Section Start   */}
      <NioSection className="pb-7 pb-lg-120">
        <NioSection.Content>
          <Row className="flex-row-reverse justify-content-between align-items-center">
            <Col lg={5}>
              <div className="nk-frame mb-5 mb-lg-0" >
                <img src="images/peoples/people-5.jpg" alt="mission-cover" className="rounded-16 w-100" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="nk-section-haed pb-0">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">our mission</span>
                <h2>
                  <span className="d-inline-block d-lg-block"> We'll help <span className="text-indigo">Empower minds</span>
                  </span> to make a lasting impact
                </h2>
                <p className="fs-20">We are dedicated to fostering a collaborative space where businesses and developers converge to solve real-world problems. Our goal is to go beyond competition, creating an environment that encourages ongoing collaboration, sparks innovation, and shapes the future of data science.</p>
                <Row className="py-5">
                </Row>
                <ul className="nk-btn-group flex-wrap pt-3">
                  <li>
                    <NioButton href="#" className="btn-indigo" label="Get Started" />
                  </li>
                  <li>
                    <NioButton href="/contact-us-solution" className="btn-outline-indigo" label="Contact Us" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  our-mission Section End    */}

      {/*  our-journey Section Start   */}
      <NioSection className="nk-section-journey bg-purple-100 overflow-hidden" masks={["z-1 shape-37 d-none d-xl-block"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">timeline</span>
          <h2>Our Journey Defines Us</h2>
          <p className="fs-20">Our journey is a testament to our growth, resilience, and commitment to excellence, defining who we are today.</p>
        </NioSection.Head>
        <NioSection.Content>
          <div className="journey-contents">
            <div className="journey-item h-100" >
              <div className="circle">
                <span className="circle-dot"></span>
              </div>
              <NioCard className="card-journey journey-card">
                <div className="card-journey-content">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0">2024</h6>
                    <p className="text-indigo fs-18 text-capitalize fw-semibold ms-1">Project started</p>
                  </div>
                  <blockquote>
                    <p> In 2024, our dedicated team initiated the journey, setting the stage for the development of our groundbreaking platform that converges industry challenges with agile minds.</p>
                  </blockquote>
                </div>
              </NioCard>
            </div>
            <div className="journey-item h-100" >
              <div className="circle">
                <span className="circle-dot"></span>
              </div>
  
    
             
            </div>
          </div>
        </NioSection.Content >
      </NioSection >
      {/*   our-journey Section End    */}

      {/*  experts Section Start  */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">Team members</span>
          <h2>Meet our experts</h2>
          <p className="fs-20">Introducing our team of experts who bring a wealth of knowledge and experience to help you achieve your goals. </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-xl-0">
            <Col lg={4} md={6} >
              <div className="team-card">
                <div className="team-card-cover">
                  <img src="images/team/team1.png" alt="team-member" className="img-fluid" />
                </div>
                <div className="team-card-details">
                  <div className="info">
                    <Link to="#">
                      <h5 className="text-capitalize m-0">Mariem Ghadhab</h5>
                    </Link>
                    <span>Team Leader</span>
                  </div>
                  <NioMedia href="https://www.linkedin.com/in/mariem-ghadhab-1536ab227/" rounded icon="linkedin" className="bg-gray-100" />
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <div className="team-card">
                <div className="team-card-cover">
                  <img src="images/team/team2.png" alt="team-member" className="img-fluid" />
                </div>
                <div className="team-card-details">
                  <div className="info">
                    <Link to="#">
                      <h5 className="text-capitalize m-0">Mouadh Jied</h5>
                    </Link>
                    <span>FrontEnd developer</span>
                  </div>
                  <NioMedia href="https://www.linkedin.com/in/mouadh-jied-748346277/" rounded icon="linkedin" className="bg-gray-100" />
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <div className="team-card">
                <div className="team-card-cover">
                  <img src="images/team/team3.png" alt="team-member" className="img-fluid" />
                </div>
                <div className="team-card-details">
                  <div className="info">
                    <Link to="#">
                      <h5 className="text-capitalize m-0">Asma Foudhaili</h5>
                    </Link>
                    <span>FrontEnd developer</span>
                  </div>
                  <NioMedia href="https://www.linkedin.com/in/foudhaili-asma-ba8b8225a/" rounded icon="linkedin" className="bg-gray-100" />
                </div>
              </div>
            </Col>
            <Row className="justify-content-center">
      <Col lg={4} md={6}>
        <div className="team-card">
          <div className="team-card-cover">
            <img src="images/team/team 4.png" alt="team-member" className="img-fluid" />
          </div>
          <div className="team-card-details">
            <div className="info">
              <Link to="#">
                <h5 className="text-capitalize m-0">Med Dhia Mekni</h5>
              </Link>
              <span>BackEnd developer</span>
            </div>
            <NioMedia href="https://www.linkedin.com/in/mekni-mohamed-dhia-42b678252/" rounded icon="linkedin" className="bg-gray-100" />
          </div>
        </div>
      </Col>

      <Col lg={4} md={6}>
        <div className="team-card">
          <div className="team-card-cover">
            <img src="images/team/team 5.png" alt="team-member" className="img-fluid" />
          </div>
          <div className="team-card-details">
            <div className="info">
              <Link to="#">
                <h5 className="text-capitalize m-0">Isra Ben Hmida</h5>
              </Link>
              <span>BackEnd developer</span>
            </div>
            <NioMedia href="#" rounded icon="linkedin" className="bg-gray-100" />
          </div>
        </div>
      </Col>
    </Row>
  ;
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  experts section end   */}

      {/*  faq Section Start   */}

      {/*  faq Section End    */}

      {/*  CTA Section Start   */}
      <NioSection>
        <NioSection.Content>
          <div className="position-relative nk-cta-wrap bg-purple-100 rounded-16 is-theme p-4 p-md-7 py-6 py-md-7 overflow-hidden">
            <div className="nk-mask z-1 shape-18"  ></div>
            <Row className="justify-content-center">
              <Col xl={10}>
                <div className="nk-section-head pb-0 text-center">
                  <div className="mb-3">
                    <NioBrand logo="s2" variant="dark" />
                  <h1 className="text-black">Trust Us  <br className="d-none d-lg-block" />  join the revolution in industry-driven data science challenges.</h1>
                  <ul className="nk-btn-group pt-5 justify-content-center" >
                    <li>
                      <NioButton href="/auth/sign-up" className="btn-indigo" label="Join Our Community" />
                    </li>
                  </ul> </div>
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section End   */}

      {/*  Newsletter Section Start  */}
      <NioSection className="nk-newsletter-section pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join Us</p>
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