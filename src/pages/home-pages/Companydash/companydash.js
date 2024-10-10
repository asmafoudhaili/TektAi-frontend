import React, { useState, useEffect } from "react";
import { NioSection } from "../../../components";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppLayout from "../../../layouts/AppLayout/AppLayout";
import ListChall from "./listchall";
import ListParticipants from "./listparti";
import Evaluation from "./evaluation";

function CompanyDash() {
  const [showChallenges, setShowChallenges] = useState(true); // Mettez true pour afficher les challenges par défaut
  const [showParticipants, setShowParticipants] = useState(false);
  const [showFiles, setShowFiles]=useState(false);

  const handleShowChallenges = () => {
    setShowChallenges(true);
    setShowParticipants(false);
    setShowFiles(false);

  };

  const handleShowParticipants = () => {
    setShowChallenges(false);
    setShowFiles(false);
    setShowParticipants(true);
  };

  const handleShowFiles = () => {
    setShowFiles(true);
    setShowChallenges(false);
    setShowParticipants(false);
  }

  useEffect(() => {
    // Simuler le chargement initial en mettant en place l'affichage des challenges
    setShowChallenges(true);
    setShowParticipants(false);
    setShowFiles(false);
  }, []); // Dépendance vide pour exécuter une seule fois après le rendu initial

  return (
    <AppLayout variant={4} title="Company Dashboard" rootClass="layout-1">
      <NioSection className="bg-purple-100" masks={["shape-18"]}>
        <NioSection className="pt-120 pt-lg-180">
          <div className="nk-block-head md">
            <div className="nk-section-head pb-0">
              <nav>
                <ol className="breadcrumb mb-3 mb-md-4">
                  <li className="breadcrumb-item">
                    <a href="/index-company-home-page">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Company Dashboard
                  </li>
                </ol>
              </nav>
            </div>
            <hr className="mt-5 mb-0" />
          </div>
          <NioSection.Content>
            <Row className="g-gs pt-3">
              <Col lg={3}>
                <div className="nk-entry-sidebar">
                  <ul className="nk-list-link nk-list-link-page flush">
                    <li className={showChallenges ? "active" : ""}>
                      <Link to="#" className="fs-16" onClick={handleShowChallenges}>
                        List Of My Challenges
                      </Link>
                    </li>
                    <li className={showParticipants ? "active" : ""}>
                      <Link to="#" className="fs-16" onClick={handleShowParticipants}>
                        List Of Participants
                      </Link>
                    </li>
                    <li className={showFiles ? "active" : ""}>
                       <Link to="#" className="fs-16" onClick={handleShowFiles}>
                        Evaluation
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="fs-16">
                        Payment Management
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={9}>
                <div className="nk-entry-wrap pt-3 ps-lg-5">
                  {showChallenges && <ListChall />}
                  {showParticipants && <ListParticipants />}
                  {showFiles && <Evaluation />}
                </div>
              </Col>
            </Row>
          </NioSection.Content>
        </NioSection>
      </NioSection>
    </AppLayout>
  );
}

export default CompanyDash;
