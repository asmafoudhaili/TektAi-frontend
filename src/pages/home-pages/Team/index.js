import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioSection, NioCard, NioMedia } from '../../../components';
import SidebarFilter from '../../../components/SidebarFilter/SidebarFilter';
import { jwtDecode } from "jwt-decode";

function Index() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const teamsPerPage = 6; // Number of teams per page

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token); 
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken._id;
        console.log(userId);
        const response = await axios.get(`http://localhost:9091/user/${userId}/teams`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [userId]);

  const redirectToTeamDetails = (teamId) => {
    navigate(`/TeamDetails/${teamId}`);
  };

  // Pagination
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AppLayout variant={4} title="Teams" rootClass="layout-3">
      <NioSection className="bg-purple-100" masks={["shape-1"]}  >
        <div className="container-fluid">
          <Row>
            <Col lg={3} style={{ paddingTop: "50px" }}>
              <SidebarFilter />
            </Col>
            <Col lg={9}>
              <NioSection className="nk-blog-section">
                <NioSection.Head className="pb-5" space={false}>
                  <h2 className="mb-0 text-purple">My Teams</h2>
                </NioSection.Head>
                <NioSection.Content>
                  <Row className="gy-5">
                    {currentTeams.map(team => (
                      <Col md={6} lg={4} key={team._id}>
                        <NioCard>
                          <NioCard.Body>
                            <NioMedia size="md" rounded img={team.imageUser} />
                            <h5 className="text-capitalize m-0">
                              <Link
                                className="text-dark"
                                to={`/TeamDetails/${team._id}`}
                                onClick={() => redirectToTeamDetails(team._id)}
                              >
                                {team.teamname}
                              </Link>
                            </h5>
                            <div className="media-group pt-4 align-items-center">
                              <div className="media-text">
                                <span className="lead-text fw-normal">
                                  <p>
                                    <strong>Team Leader:</strong> {team.createdByFullName} 
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
                      <p>Showing: <span>{indexOfFirstTeam + 1}-{Math.min(indexOfLastTeam, teams.length)} of {teams.length} Teams</span></p>
                    </div>
                    <div className="nk-pagination-col">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-s1">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                              <span>Prev</span>
                            </Link>
                          </li>
                          {Array.from({ length: Math.ceil(teams.length / teamsPerPage) }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                              <Link className="page-link" to="#" onClick={() => paginate(i + 1)}>
                                {i + 1}
                              </Link>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === Math.ceil(teams.length / teamsPerPage) ? 'disabled' : ''}`}>
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
