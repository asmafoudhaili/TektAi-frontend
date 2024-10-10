import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioSection, NioCard, NioBadge, NioMedia } from '../../../components';
import Rating from '@mui/material/Rating';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode from 'jwt-decode'
import SidebarFilter from '../../../components/SidebarFilter/SidebarFilter';

function Index() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const challengesPerPage = 6; // Number of challenges per page

  const [favoriteChallenges, setFavoriteChallenges] = useState([]);

  useEffect(() => {
    const fetchFavoriteChallenges = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const decodedToken = jwtDecode(token); // Decode the token
        const userId = decodedToken._id; // Extract user ID from the decoded token
        const response = await axios.get(`http://localhost:9091/user/${userId}/favoriteChallenges`);
        setFavoriteChallenges(response.data);
      } catch (error) {
        console.error('Error fetching favorite challenges:', error);
      }
    };

    fetchFavoriteChallenges();
  }, []);

  const redirectToChallengeDetails = (challengeId) => {
    navigate(`/ChallengeDetails/${challengeId}`);
  };

  // Pagination
  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = favoriteChallenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AppLayout variant={4} title="Favorit" rootClass="layout-3">
      <NioSection className="nk-section-program bg-red-100" masks={["shape-4 d-none d-md-block"]}>
        <div className="container-fluid">
          <Row>
            {/* Sidebar goes here */}
            <Col lg={3} style={{ paddingTop: "50px" }}>
             
                  <SidebarFilter />
              
            </Col>
            <Col lg={9}>
              {/* Main content goes here */}
              <NioSection className="nk-blog-section" >
                <NioSection.Head className="pb-5" space={false}>
                  <h2 className="mb-0 text-red">Your Favorite</h2>
                </NioSection.Head>
                <NioSection.Content>
                  <Row className="gy-5">
                    {/* Render favorite challenges */}
                    {currentChallenges.map(challenge => (
                      <Col md={6} lg={4} key={challenge._id}>
                        <NioCard>
                          <NioCard.Body>
                            <div className="card-image">
                              <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                            </div>
                            <div className="card-content pt-4">
                              <NioBadge rounded className="text-bg-primary-soft mb-2 mb-md-3" label={challenge.prize} />
                              <h5 className="text-capitalize m-0">
                                <Link
                                  className="text-dark"
                                  to={`/ChallengeDetails/${challenge._id}`}
                                  onClick={() => redirectToChallengeDetails(challenge._id)}
                                >
                                  {challenge.title}
                                </Link>
                              </h5>
                              <div className="media-group pt-4 align-items-center">
                                <NioMedia size="md" rounded img="images/avatar/a.jpg" />
                                <div className="media-text">
                                  <span className="lead-text fw-normal">
                                    <p>
                                      <strong>Created By:</strong> {challenge.createdByFirstName}
                                    </p>
                                  </span>
                                  <ul className="nk-list-meta smaller">
                                    <li>{new Date(challenge.endDate).toLocaleDateString('fr-FR')}</li>
                                  </ul>
                                </div>
                              </div>
                              <hr />
                              <div className="text-end">
                                <Rating name="size-small" defaultValue={2} size="small" />
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
                      <p>Showing: <span>{indexOfFirstChallenge + 1}-{Math.min(indexOfLastChallenge, favoriteChallenges.length)} of {favoriteChallenges.length} Challenges</span></p>
                    </div>
                    <div className="nk-pagination-col">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-s1">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                              <span>Prev</span>
                            </Link>
                          </li>
                          {Array.from({ length: Math.ceil(favoriteChallenges.length / challengesPerPage) }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ?  'active' : ''}`} key={i}>
                              <Link className="page-link" to="#" onClick={() => paginate(i + 1)}>
                                {i + 1}
                              </Link>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === Math.ceil(favoriteChallenges.length / challengesPerPage) ? 'disabled' : ''}`}>
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
