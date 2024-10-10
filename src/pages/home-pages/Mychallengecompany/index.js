import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioSection, NioCard } from '../../../components';
import SidebarFilter from '../../../components/SidebarFilter/SidebarFilter';
import { jwtDecode } from "jwt-decode";

function Index() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const challengesPerPage = 6; // Number of challenges per page

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        setUserId(userId);
        const response = await axios.get(`http://localhost:9091/user/${userId}/challenges`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, [userId]);

  const redirectToChallengeDetails = (challengeId) => {
    navigate(`/challengeDetails/${challengeId}`);
  };

  // Pagination
  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AppLayout variant={4} title="Challenges" rootClass="layout-3">
      <NioSection className="nk-section-program bg-purple-100" masks={["shape-1 d-none d-md-block"]}>
        <div className="container-fluid">
          <Row>
            <Col lg={3} style={{ paddingTop: "50px" }}>
              <SidebarFilter />
            </Col>
            <Col lg={9}>
              <NioSection className="nk-blog-section">
                <NioSection.Head className="pb-5" space={false}>
                  <h2 className="mb-0 text-purple">My Challenges</h2>
                </NioSection.Head>
                <NioSection.Content>
                  <Row className="gy-5">
                    {currentChallenges.map(challenge => (
                      <Col md={6} lg={4} key={challenge._id}>
                        <NioCard>
                          <NioCard.Body>
                            <div className="card-image">
                              <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                            </div>
                            <h5 className="text-capitalize m-0">
                              <Link
                                className="text-dark"
                                to={`/challengeDetails/${challenge._id}`}
                                onClick={() => redirectToChallengeDetails(challenge._id)}
                              >
                                {challenge.title}
                              </Link>
                            </h5>
                            <div className="media-group pt-4 align-items-center">
                              <div className="media-text">
                                <span className="lead-text fw-normal">
                                  <p>
                                    <strong>Prize:</strong> {challenge.prize}
                                  </p>
                                  <p>
                                    <strong>Start Date:</strong> {new Date(challenge.startDate).toLocaleDateString('fr-FR')}
                                  </p>
                                  <p>
                                    <strong>End Date:</strong> {new Date(challenge.endDate).toLocaleDateString('fr-FR')}
                                  </p>
                                </span>
                              </div>
                            </div>
                          </NioCard.Body>
                        </NioCard>
                      </Col>
                    ))}
                  </Row>
                  {/* Pagination */}
                  <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap g-3 justify-content-center justify-content-md-between pt-5 pt-lg-7">
                    <div className="nk-pagination-col">
                      <p>Showing: <span>{indexOfFirstChallenge + 1}-{Math.min(indexOfLastChallenge, challenges.length)} of {challenges.length} Challenges</span></p>
                    </div>
                    <div className="nk-pagination-col">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-s1">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                              <span>Prev</span>
                            </Link>
                          </li>
                          {Array.from({ length: Math.ceil(challenges.length / challengesPerPage) }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                              <Link className="page-link" to="#" onClick={() => paginate(i + 1)} style={currentPage === i + 1 ? { background: 'purple', color: 'white', border: '1px solid purple' } : null}>
                                {i + 1}
                              </Link>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === Math.ceil(challenges.length / challengesPerPage) ? 'disabled' : ''}`}>
                            <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                              <span>Next</span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </NioSection.Content>
              </NioSection>
            </Col>
          </Row>
        </div>
      </NioSection>
    </AppLayout>
  );
}

export default Index;
