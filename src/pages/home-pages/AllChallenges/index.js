import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard } from '../../../components';
import BlogsContent from '../../../components/PageComponents/InnerPages/Blogs/BlogsContent/BlogsContent'; // Include BlogsContent component
import SidebarFilter from '../../../components/SidebarFilter/SidebarFilter';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function Index() {
  const navigate = useNavigate();

  const { challengeId } = useParams(); // Get the ID from the URL
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const challengesPerPage = 6; // Number of challenges per page

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9091/challenge', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Challenges:', response.data);
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
  
    fetchChallenges();
  }, [challengeId]);

  const redirectToChallengeDetails = (challengeId) => {
    navigate(`/ChallengeDetails/${challengeId}`);
  };

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const FilterPopup = () => {
    return (
      <div style={{ backgroundColor: '#fffff', border: '1px  #ccc', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #ccc', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
          <ul className="nk-tag justify-content-center pt-4">
            <li>
              <Link to="#" className="nk-tag-item">All</Link>
            </li>
            <li>
              <Link to="#" className="nk-tag-item">Newest</Link>
            </li>
            <li>
              <Link to="#" className="nk-tag-item">Closing soon</Link>
            </li>
            <li>
              <Link to="#" className="nk-tag-item">Prize</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <AppLayout variant={4} title="AllChallenges" rootClass="layout-3">
      {/* Resource Section Start */}
      <NioSection className="overflow-hidden pt-120 pt-lg-160 bg-purple-100"masks={["shape-18"]}>
        <NioSection.Content>
          <Row className="justify-content-center text-center">
            <Col lg={8} xl={6}>
              <div className="nk-section-head">
                <h2 className='text-red-400'>Welcome To The Arena</h2>
                <p className="fs-20">for both monetary rewards and opportunities to enhance your knowledge</p>
              </div>
            </Col>
            <Col lg={8}>
              <div className="nk-filter-wrap pb-5 pb-md-7">
                <div>
                  <div className="search-container">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <NioField.Input
                          icon="search before z-1"
                          placeholder="Search for Competition"
                        />
                      </div>
                      <div className="filter-icon" onClick={toggleFilter}>
                        <NioMedia
                          size="sm"
                          onClick={toggleFilter}
                          rounded
                          variant="purple-100 text-black"
                          icon="filter"
                        />
                      </div>
                    </div>
                  </div>
                  {isFilterOpen && <FilterPopup />} {/* Render FilterPopup when isFilterOpen is true */}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={8} >
              <BlogsContent /> {/* Include BlogsContent component */}
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      <div className="container-fluid">
        <Row>
          <Col md={2} style={{ paddingTop: "50px" }}>
                <SidebarFilter />
          </Col>
          <Col md={10}>
            <NioSection className="nk-blog-section" masks={["blur-1 right bottom"]}>
              <NioSection.Head className="pb-5" space={false}>
                <h2 className="mb-0">Newest</h2>
              </NioSection.Head>
              <NioSection.Content>
                <Row className="gy-5">
                  {currentChallenges.map(challenge => (
                    <Col md={6} lg={4} key={challenge.id}>
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
                            <Link className="page-link" to="#" onClick={() => paginate(i + 1)}>
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
      {/* Latest Section End */}
      {/* Newsletter Section End */}
    </AppLayout>
  );
}

export default Index;
