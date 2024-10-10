import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';


// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// component 
import {  NioMedia} from '../../../components';

// section component

function index() {
  return (
    <AppLayout variant={8} title="Business Expenses" rootClass="layout-7">


      {/*   Banner Section Start  */}
      <section className="nk-banner nk-banner-saas bg-darker is-theme is-theme-bg">



      <section className="nk-banner nk-banner-dg-business ">
        <div className="nk-banner-wrap pb-0 ">
          <Container>
            <div className="nk-banner-content is-theme px-5 px-md-7 px-lg-0 bg-gradient py-7 py-md-120 position-relative  rounded-3 ">
              <div className="nk-mask"  ></div>
              <Row className="align-items-center justify-content-center pb-xl-3">
                <Col lg={8} xl={6}>
                <div className="nk-frame nk-frame-top" style={{ display: "flex", justifyContent: "center" ,alignItems: "center" }} >
                    <img src="images/avatar/robot.webp" alt="banner-cover" style={{ borderRadius: "50%", width: "100px", height: "100px"  , position: "absolute" , top:"-175px"}}  />

                  </div>
                  <div className="text-center">
                    <div className="nk-section-head text-center">
                      <span className="d-inline-block rounded-pill fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >Women</span>
                      <h1 className="text-capitalize mb-2" >Challenged</h1>
                      <p className="fs-18 opacity-75" >
                      With a passion for overcoming obstacles and a track record of delivering high-quality results, I'm dedicated to pushing boundaries and exceeding expectations in every project I undertake. </p>
                  <p>email</p>
                  <p>address</p>
    
                    </div>
                    
            <Col lg={6} xl={8} className="ml-lg-auto ml-xl-auto text-centre " >
              <ul className="nk-schedule nk-schedule-s2 ">
                <li className="nk-schedule-item">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded variant="success-soft" icon="check" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="d-inline-block fs-14 text-uppercase fw-semibold">step 1</span>
                      <div>
                        <h3>Challenge 1</h3>
                        <p className="fs-16 ">Sign up and create your account in just a few easy steps. Start exploring and unleashing possibilities today.</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded variant="success-soft" icon="check" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="d-inline-block fs-14 text-uppercase fw-semibold">step 2</span>
                      <div>
                        <h3>Challenge 2</h3>
                        <p className="fs-16 "> Harness the collective creativity of your team and collect brilliant ideas to drive innovation and growth. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded variant="success-soft" icon="check" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="d-inline-block fs-14 text-uppercase fw-semibold">step 3</span>
                      <div>
                        <h3>Challenge 3</h3>
                        <p className="fs-16 ">Unlock the power of data analysis to gain valuable insights and make informed decisions for your business.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
                    
                  </div>
                </Col>
              </Row>
             
            </div>
            <div>
     
    </div>
          </Container>
        </div>
      </section>

      <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2  " >Modifier</button>
</div>
      </section>
  
    </AppLayout >
  )
}

export default index;