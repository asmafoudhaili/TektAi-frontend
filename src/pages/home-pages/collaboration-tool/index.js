import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia,NioIcon, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';

function Index() {
  const handleCreateAccountClick = () => {
    // Get the target element by its id
    const targetElement = document.getElementById('signup');

    // Scroll to the target element
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };  return (

    <AppLayout variant={4} title="TEKTAI" rootClass="layout-3">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-collab">
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-mask"></div>
          <div className="nk-banner-content">
            <Container>
              <Row className="justify-content-center">
                <Col xl={9}>
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
      style={{ fontSize: '9em', display: 'inline-block' }}
      repeat={Infinity}
    />
                      <h1 className="text-capitalize display-6 mb-2" > to <span className="title-shape title-shape-2 text-indigo">TektAI</span> Here Industry Meet <span className="text-red-400">The Brilliance Of Agile Minds</span> </h1>
                      <p className="fs-20 text-base" > Unleash your innovation, collaborate dynamically, and redefine the future of data science with us! </p>
                    </div>
                    <ul className="nk-btn-group flex-wrap justify-content-center pt-5 pt-lg-7">
                      <li>
                      <NioButton onClick={handleCreateAccountClick} className="btn-indigo" label="Let's start now" />
                      </li>
                      <li>
                        <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Brand Section Start   */}
      <NioSection className="nk-brand-section">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <h6 className="text-center fw-normal text-light mb-5" >More than 100,000+ teams are using TektAI</h6>
              <Row className="justify-content-center justify-content-lg-between text-center g-gs">
                {
                  ["a", "b", "c", "d", "e"]?.map((brand, idx) => (
                    <Col xs={4} sm={3} lg={2} key={idx}>
                      <Link to="#" className="nk-brand" >
                        <img src={`images/brands/${brand}.png`} alt="tool" className="w-auto h-24px" />
                      </Link>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Brand Section End   */}


      {/*  Feature Section Start   */}
      <NioSection className="nk-feature-section bg-purple-50">
        <NioSection.Head alignX="center">
          <h2>
            <span className="text-indigo">TektAI</span>  the dynamic intersection of industry challenges and data science brilliance! 
          </h2>
          <p className="fs-20 mb-0">Whether you're a forward-thinking company or a passionate data science developer, TektAI is your gateway to a world of innovation, collaboration, and recognition.</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-indigo" label="Let's Start" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-md-7">
            
          </Row>
        </NioSection.Content>
              </NioSection>
      {/*  Feature Section End   */}

      {/*  Products Section Start   */}
      <section id='signup'>
      <NioSection className="nk-product-section overflow-hidden pb-7 pb-lg-120">
  <NioSection.Content>
    <div className="text-center pt-7">
      <h2 className="text-capitalize display-6 mb-4">Ready to Dive In? Join <span className="title-shape title-shape-2 text-indigo">TektAI</span> Today!</h2>
    </div>
    <Row className="gy-5">
      <Col lg={6}>
        <NioCard className="border-0 bg-purple-50">
          <NioCard.Body>
            <div className="nk-feature-block-content">
              <NioMedia size="lg" variant="purple-300 text-white" rounded icon="building-fill" className="mb-3 mb-lg-5" />
              <h4>Are You a <span className="text-purple-300">Company</span> </h4>
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

      </section>
      {/*  Video Section Start   */}

      {/*  Testimonial Section Start   */}
      
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
      <div className="nk-banner-cover nk-frame nk-frame-three">
      <Row className="justify-content-center">
          <Col lg={8}>
            <div className="pb-5 pb-lg-7 text-center">
              <h2><span className="text-indigo">Join our community of bright minds</span></h2>
              <p className="fs-20 mb-0">Becoming a TektAI member is more than just a registration; it's an invitation to be a part of something transformative. Join our community today, where collaboration meets innovation, and together, we redefine the boundaries of data science.</p>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/about-solution" className="btn-indigo" label="Explore" />
                </li>
                
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
      {/*  Testimonial Section End   */}

      {/*  Integrate Section Start   */}
      <NioSection className="nk-section-int-tools bg-red-50 has-mask overflow-hidden" masks={["shape-4"]}>
        <NioSection.Head alignX="center">
          <h2 className="mb-0">Keep in touch with  <span className="text-red-400">TektAI</span>
          </h2>
        </NioSection.Head>
        <h4>We Promise: One Mail Per Month, Cancel Anytime
At TektAI, we value your time and inbox space. Rest assured, our communication is all about delivering the most important updates without overwhelming you. Here's what you can expect:</h4> 
<ul>
  <li>
<NioIcon name="check-circle text-primary" className="me-1" />
<span className="fs-18 text-dark">Be the first to know about significant developments, platform enhancements, and industry insights.</span>
</li>
<li>
<NioIcon name="check-circle text-primary" className="me-1" />
<span className="fs-18 text-dark">Dive into success stories, case studies, and inspiring journeys from both companies and developers within the TektAI community.</span>
</li>
<li>
<NioIcon name="check-circle text-primary" className="me-1" />
<span className="fs-18 text-dark">Stay informed about upcoming events, challenges, and exclusive opportunities tailored for our dynamic community.</span>
</li>
</ul>

  <NioSection.Content className="position-relative z-1">

          <Row className="justify-content-between align-items-center g-5 pt-5 pt-md-9">
          <NioSection.Content className="position-relative z-1">

<NioSection.Head alignX="center">
<NioSubscribeField variant="three" />
   </NioSection.Head>
  </NioSection.Content>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Integrate Section End  */}

      {/*  Blog Section Start   */}
      <NioSection className="nk-section-blog py-7 py-lg-120" masks={["shape-13 d-done d-md-block"]}>
        <NioSection.Head alignX="center">
          <h2>See how  <span className="text-purple-400"> TektAI </span> can help you</h2>
        </NioSection.Head>
        <NioSection.Content>
        <div className="nk-banner-cover nk-frame nk-frame-three">
        <Row className="gap g-4">
            <Col sm={6} lg={4} >
            <NioCard className="h-100">
            <NioCard.Body>
              <div className="text-center">
                <div className="mb-3 mb-md-5">
                </div>
                <div className="mb-4">
                  <h4 className="text-capitalize">Accelerate Innovation</h4>
                  <p className="fs-16 line-clamp-2 fw-medium">Empower your organization with a pool of talented data science developers ready to tackle your real-world challenges. Accelerate innovation by leveraging diverse perspectives and cutting-edge solutions tailored to your industry.</p>
                </div>
              </div>
              </NioCard.Body>
              </NioCard>
            </Col>
            <Col sm={6} lg={4} >
            <NioCard className="h-100">
            <NioCard.Body>
              <div className="text-center">
                <div className="mb-3 mb-md-5">
                </div>
                <div className="mb-4">
                  <h4 className="text-capitalize">Real-World Learning Opportunities</h4>
                  <p className="fs-16 line-clamp-2 fw-medium">TektAI offers a platform to engage in real-world challenges, providing practical experiences that go beyond traditional learning. Elevate your data science skills and build a robust portfolio with hands-on projectsOur calendar lets you know what is happening with customer and projects so you</p>
                </div>
              </div>
              </NioCard.Body>
              </NioCard>
            </Col>
            <Col sm={6} lg={4} >
            <NioCard className="h-100">
            <NioCard.Body>
              <div className="text-center">
                <div className="mb-3 mb-md-5">
                </div>
                <div className="mb-4">
                  <h4 className="text-capitalize">Networking and Collaboration</h4>
                  <p className="fs-16 line-clamp-2 fw-medium">Connect with industry leaders, fellow developers, and potential employers. TektAI is not just a platform; it's a vibrant community where networking and collaboration opportunities abound.</p>
                </div>
              </div>
              </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
                  
                  <div className="nk-frame-children nk-frame-children-two">
                    <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-three">
                  </div>
                </div>
        </NioSection.Content>
      </NioSection>
      {/*  Blog Section End  */}


      {/*  CTA Section Start   */}
      {/*<section className="position-relative py-7 py-lg-120 overflow-hidden bg-indigo is-theme">
        <div className="bg-masks bg-masks-1 d-none d-lg-block">
          <img src="images/collaboration-tool/object-2-a.png" alt="bg-mask" />
        </div>
        <div className="bg-masks bg-masks-2 d-none d-lg-block">
          <img src="images/collaboration-tool/object-2-b.png" alt="bg-mask" />
        </div>
        <div className="nk-mask shape-5"></div>
        <Container>
          <div className="nk-cta-wrap">
            <Row className="justify-content-center">
              <Col lg={8} xl={6}>
                <div className="pb-5 pb-lg-7 pb-0 text-center">
                  <h2 className="mb-0" >Not convinced you’re the one? We love to take a challenge.</h2>
                  <ul className="nk-btn-group flex-wrap justify-content-center pt-5">
                    <li>
                      <NioButton href="#" className="btn-white text-dark text-indigo" label="Start Your Free Trial" />
                    </li>
                    <li>
                      <NioButton href="/auth/login" className="btn-outline-white" label="Login to Your Account" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>/*}
      {/*  CTA Section End  */}


      {/*  NewsLetter Section Start   */}
      {/*<NioSection className="nk-section nk-newsletter-section pb-0 pt-7 pt-lg-120">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join the 5000+ People That Uses Softnio Products.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={4}>
            <NioSubscribeField variant="three" />
          </Col>
        </Row>
            </NioSection>*/}
      {/*  NewsLetter Section End   */}

    </AppLayout >
  )
}

export default Index;