import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// config 
import config from '../../data/layout-config';

// custom hooks
import useRouteMatch from '../../hooks/useRouteMatch';

// components
import { NioBrand, NioIcon ,NioMedia} from '..';

export default function Footer({ variant = 4, children }) {

  const compClasses = classNames({
    [`${useRouteMatch("/") ? "nk-footer-landing" : "nk-footer"}`]: true,

    // bg color
    "bg-dark": useRouteMatch(["/index-crypto-profile"]),
    "bg-blue-1700": useRouteMatch(["/index-bs-analytics"]),
    "bg-gray-1200": useRouteMatch(["/index-bs-consulting", "/index-fintech"]),
    "bg-gray-1100": useRouteMatch(["/index-crypto-profile", "/index-coaching-service"]),
    "is-theme": useRouteMatch(["/index-bs-analytics", "/index-coaching-service", "/index-crypto-profile", "/index-bs-consulting", "/index-fintech"])
  });


  const socialIconClasses = classNames({

    // border radius
    "rounded-1": !useRouteMatch(["/index-crypto-profile"]),

    // bg colors
    "text-bg-purple": useRouteMatch(["/index-kids-course"]),
    "text-bg-purple": useRouteMatch(["/index-crypto-profile"]),
    "text-bg-purple": useRouteMatch(["/index-live-chat-app"]),
    "text-bg-purple": useRouteMatch(["/index-bs-management"]),
    "text-bg-purple": useRouteMatch(["/index-language-learning"]),
    "text-bg-purple": useRouteMatch(["/index-collaboration-tool", "/index-bs-solution", "/about-solution", "/features-solution", "/contact-us-solution", "/pricing-solution"]),
    "text-bg-purple": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven"]),
    "text-bg-purple": useRouteMatch(["/index-bs-digital"]),
    "text-bg-purple": !useRouteMatch(["/index-kids-course", "/index-crypto-profile", "/index-live-chat-app", "/index-bs-management", "/index-language-learning", "/index-collaboration-tool", "/index-bs-solution", "/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven", "/index-bs-digital"]),
  });

  const brandLinkClasses = classNames({
    "text-info": useRouteMatch(["/index-bs-management"]),
    "text-success-alt": useRouteMatch(["/index-live-chat-app"]),
    "text-success": useRouteMatch(["/index-bs-digital"]),
    "text-info-alt": useRouteMatch(["/index-language-learning"]),
    "text-purple": useRouteMatch(["/index-kids-course", "/index-crypto-profile"]),
    "text-primary-alt": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven"]),
    "text-indigo": useRouteMatch(["/index-collaboration-tool", "/index-bs-solution", "/about-solution", "/features-solution", "/contact-us-solution", "/pricing-solution"]),
    "text-primary": !useRouteMatch(["/index-kids-course", "/index-crypto-profile", "/index-live-chat-app", "/index-bs-management", "/index-language-learning", "/index-collaboration-tool", "/index-bs-solution", "/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven", "/index-bs-digital"])
  });


  const footerTextClasses = classNames({
    // typography
    "fs-16": useRouteMatch(["/index-kids-course"]),
    "fw-medium": useRouteMatch(["/index-kids-course"]),
    "text-capitalize": true,

    // colors
    "text-dark": !useRouteMatch(["/index-crypto-profile"]),
  });

  // variants of navbar 
  function filterDataByVariant(variantNumber) {
    return config.filter(item => item.variant === variantNumber);
  }
  const [data] = filterDataByVariant(variant)

  return (
    <footer className={compClasses}>
      {
        data.footer.variant === 1 ?
          <>
            <div className="call-to">
              <div className="nk-mask z-1 blur-6"></div>
              <Container>
                <div className="call-to-content z-1 position-relative is-theme py-7">
                  <Row className="justify-content-center">
                    <Col xl={6}>
                      <div className="call-to-info text-center">
                        <NioBrand className="mb-3" logo={data.footer.logo?.name || "s2"} variant={data.footer.logo?.variant || "dark"} />
                        <h2 className="mb-1">Create Better Build Faster</h2>
                        <p className="m-0">Everything you need to create your next unique and professional website, including impressive and ready-made pages.</p>
                        <div className="call-to-action pt-5 pt-lg-7">
                          <Link to="https://themeforest.net/user/softnio/portfolio" target="_blank" className="btn btn-primary mb-1">
                            <NioIcon name="bag-fill" className="me-2" />
                            Purchase NioLand Now
                          </Link>
                          <Link to="https://themeforest.net/user/softnio/portfolio" target="_blank">
                            <img src="/images/icon/envato.png" alt="envato" />
                            <span>Available only on Envato</span>
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
            <div className="nk-footer-landing-copyright py-3">
              <Container>
                <p className="mb-0 text-capitalize">
                  Copyright &copy; <span className="text-white">{new Date().getFullYear()}</span> NioLand. Template made by <Link to="https://softnio.com/" target="_blank" className={brandLinkClasses}>Softnio</Link>
                </p>
              </Container>
            </div>
          </>
          :
          data.footer.variant === 2 ?
            <section className={compClasses}>
              <div className="nk-footer-top">
                <Container>
                  <Row className="nk-footer-content justify-content-xl-between ">
                 
                   

                  <div class="col-6 col-md-4">
                      <Row className="justify-content-between">
                        <Col sm={8} md={7}>
                          <div className="nk-footer-info">
                            <h5 className="title text-center">Useful Link</h5>
                            <ul className="row gy-1 gy-sm-4">
                              <li className="col-12 d-flex align-items-center">
                              <div class="col text-center">
                              <a href="https://www.facebook.com/profile.php?id=61557362428057">
    <NioMedia size="sm" rounded variant="indigo-soft" icon="facebook-f" className="mb-30" />
  </a></div>
                              <div class="col">
                    <p>Facebook</p></div>
                              </li>
                              <li className="col-12 d-flex align-items-center">
                                <div class="col text-center">
                                <a href="https://github.com/TektAI24">
    <NioMedia size="sm" rounded variant="indigo-soft" icon="git" className="mb-30" />
  </a>              </div>
                              <div class="col">
                              <p>Git</p></div>
                              </li>
                              <li className="col-12 d-flex align-items-center ">
                                <div class="col text-center">
                                <a href="https://www.linkedin.com/in/tekt-ai-a538572b9/">
    <NioMedia size="sm" rounded variant="indigo-soft" icon="linkedin" className="mb-30" />
  </a>
                              </div> 
                              <div class="col">
                                <p>Linkedin</p>
                                </div>                              
                              </li>
                            </ul>
                            
                          </div>
                          
                        </Col>

                      </Row>
                    </div>
                    <div class="col-8 col-md-4 ">
                      <Row className="justify-content-between">
                        <Col sm={8} md={7}>
                          <div className="nk-footer-info">
                            <h5 className="title text-center">Contact Us</h5>
                            <ul className="row gy-1 gy-sm-4">
                              <li className="col-12 d-flex align-items-center">
                              <div class="col text-center ">
                              <NioMedia size="sm" rounded variant="indigo-soft" icon="mail" className="mb-30" />
                              </div>
                              <div class="col">
                              <p>tektaicontact@gmail.com</p></div>
                              </li>
                              <li className="col-12 d-flex align-items-center">
                                <div class="col text-center">
                              <NioMedia size="sm" rounded variant="indigo-soft" icon="mobile" className="mb-30" />
                              </div>
                              <div class="col">
                              <p>93092411</p>
                              </div>
                              </li>
                              <li className="col-12 d-flex align-items-center ">
                                <div class="col text-center">
                              <NioMedia size="sm" rounded variant="indigo-soft" icon="mobile" className="mb-30" />
                              </div> 
                              <div class="col">
                                <p>92701941</p>
                                </div>                              
                              </li>
                            </ul>
                            
                          </div>
                          
                        </Col>

                      </Row>
                    </div>
                    <div class="col-6 col-md-4">
                    <div className="nk-footer-brand-info mb-4 d-flex flex-column align-items-center">   
                     <div className="nk-footer-brand-info mb-4">
                      
      <div className="nk-footer-logo text-center ">
        <NioBrand size="130px" logo={data.footer.logo?.name} variant={data.footer.logo?.variant} />
      </div>
      <p>Your expertise, creativity, and passion are the missing pieces to our collective success</p>
                 </div> </div>  </div>
                  </Row>
                </Container>
              </div>
              <div className="nk-footer-bottom">
                <Container>
                  <Row className="nk-footer-content justify-content-between">
                    <Col lg={6} className="px-0">
                      <p className="nk-footer-copyright-text text-center text-lg-start">&copy; <span id="currentYear"> {new Date().getFullYear()} </span>
                        <Link className={brandLinkClasses} to="#" target="_blank"> TektAI</Link>. All Rights Reserved.
                      </p>
                    </Col>
                    <Col lg={6} className="px-0">
                      <ul className="nk-footer-copyright justify-content-center justify-content-lg-end">
                        <li>
                          <Link className={footerTextClasses} to="/terms-and-conditions">Terms & conditions</Link>
                        </li>
                        <li>
                          <Link className={footerTextClasses} to="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link className={footerTextClasses} to="/terms-of-use">Terms Of Use</Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </div>
            </section>
            :
            <>
              {children}
            </>
      }
    </footer >
  )
}