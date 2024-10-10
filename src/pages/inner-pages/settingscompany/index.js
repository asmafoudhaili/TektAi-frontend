import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// section content 
import { NioButton, NioSection, NioSubscribeField } from '../../../components';
import ToggleButton from '../../../components/ToggleButton/ToggleButton';
function Index() {
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };
  const terms = [
    "Acceptance of Terms 1",
    "Acceptance of Terms 2",
    "Acceptance of Terms 3"
  ];
  return (
    <AppLayout variant={4} title="SettingCompany" rootClass="layout-1">

      <NioSection className="pt-120 pt-lg-180" masks={["blur-1 left top", "blur-1 right bottom"]}>
        <div className="nk-block-head md">
          <div className="nk-section-head pb-0">
            <nav>
              <ol className="breadcrumb mb-3 mb-md-4">
                <li className="breadcrumb-item">
                  <a href="/index-collaboration-tool">Profil</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Setting</li>
              </ol>
            </nav>
          </div>
          <hr className="mt-5 mb-0" />
        </div>
        <NioSection.Content>
        {terms.map((term, index) => (
        <React.Fragment key={index}>
          <Row className="g-gs pt-3">
          
            <Col lg={9}>
              <div className="nk-entry-wrap pt-3 ps-lg-5">
                <div className="nk-entry">
                  <div className="pb-5">
                    <h5>{term}</h5>
                    <p className="fs-16">By using our Service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these Terms and Conditions, you must not use the Service.</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="nk-entry-sidebar">
                <ul className="nk-list-link nk-list-link-page flush">
                  <li className="pb-5">
                    <ToggleButton checked={isToggled} onChange={handleChange} />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          {index < terms.length - 1 && (
            <hr className="mt-0 mb-0" style={{ borderTop: '1px solid #ccc' }} />
          )}
        </React.Fragment>
      ))}
        </NioSection.Content>
      </NioSection>
      {/*  Terms Section End  */}

    </AppLayout>
  )
}

export default Index;