import React, { useState, useEffect } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useData } from '../../../../../context/DataProvider/DataProvider';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import NioIcon from '../../../../NioIcon/NioIcon';

// components 
import {NioMedia,NioSection,NioButton} from '../../../../../components';

export default function FeaturesContent({ challengeData }) {
  const data = useData();
  const contents = data.tabs.digital.contents;
  const { challengeId } = useParams(); // Read the challengeId from the URL

  // State to manage active tab
  const [activeTab, setActiveTab] = useState(0);
  const [comments, setComments] = useState([]); // Declare comments
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 5; // Number of comments per page
  const [scores, setScores] = useState([]);

  // Handle tab click event
  const handleTabClick = async (idx, challengeId) => {
    setActiveTab(idx);
    // You can perform any additional actions here if needed
  };

  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    // Fetch scores when the component mounts
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get(`http://localhost:9091/challenge/${challengeId}/scores`);
      setScores(response.data); // Assuming the response contains an array of scores
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:9091/challenge/${challengeId}/getcommentaires`);
      setComments(response.data.comments);
      console.log(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:9091/challenge/${challengeId}/commentaire`,
        { content }, // Send the comment content directly as an object
        {
          headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('comment created:', response.data);
      alert('comment created successfully!');
      fetchComments();
      setContent('');

    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const offset = currentPage * commentsPerPage;
  const pageCount = Math.ceil(comments.length / commentsPerPage);

  // Format date to "jj-mm-yyyy hh:min"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}        ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };

  return (
    <Tab.Container className='nav-tabs-s1' defaultActiveKey={0}>
      <div className="nav-tabs-s1">
      <Nav className='nav-tabs' >
  {contents && contents.nav.map((content, idx) => (
    <Nav.Item key={idx}>
      <Nav.Link eventKey={idx} onClick={() => handleTabClick(idx, content.challengeId)}>
        <div className="media-group align-items-center">
        <NioMedia variant={content.variant} rounded icon={content.icon} style={{ fontSize: 'medium'}} />
          <div className="media-text md">
            <h5 className="title text-capitalize" style={{ fontSize: 'small' }}>{content.title}</h5>
          </div>
        </div>
      </Nav.Link>
    </Nav.Item>
  ))}
</Nav>

      </div>
      
      {/* Card display section */}
      <Tab.Content>
        {contents && contents.pane.map((pane, idx) => (
          <Tab.Pane key={idx} eventKey={idx} className={activeTab === idx ? 'active' : ''}>
            <div className="card">
              <div className="card-body">
                {/* <h5 className="card-title">{pane.title}</h5> */}
                {/* Render content based on the active tab */}
                {idx === 0 && challengeData && (
                  <>
                    <h4>Challenge Details: </h4>
                    <p>{challengeData.description}</p>
                  </>
                )}
                {idx === 1 && challengeData && (

  <>
  <h4>submission Solution Metrics: </h4>
    {challengeData.presentation && (
      <p> Presentation</p>
    )}
    {challengeData.output && (
      <p>Output</p>
    )}
    {challengeData.codeSource && (
      <p>Code Source</p>
    )}
    {challengeData.dataset && (
      <p>Dataset</p>
    )}
    {challengeData.rapport && (
      <p>Rapport</p>
    )}
    {challengeData.demo && (
      <p>Demo</p>
    )}
  </>
)}

                      {idx === 2 && challengeData && (
                  <>
                    <p>Start Date: {formatDate(challengeData.startDate)}</p>
                    <p>End Date: {formatDate(challengeData.endDate)}</p>
                  </>
                )}
               {idx === 3 && challengeData && (
  <div>
    {challengeData.isMonetaryAmount && (
      <p>Monetary Prize: {challengeData.monetaryPrize}</p>
    )}
   {idx === 3 && challengeData && (
  <div>
    {challengeData.isMonetaryAmount && (
      <p>Monetary Prize: {challengeData.monetaryPrize}</p>
    )}
    {challengeData.isUnmonetaryAmount && (
      <p>Other Gift Details: {challengeData.otherGiftDetails}</p>
    )}
    {challengeData.internship && (
      <div>
        <p>Internship:</p>
        <p>- Period: {challengeData.internshipDetails.period}</p>
        <p>- Post: {challengeData.internshipDetails.post}</p>
        <p>- Place: {challengeData.internshipDetails.place}</p>
        <p>- Salary: {challengeData.internshipDetails.salary}</p>
      </div>
    )}
    {challengeData.jobOffer && (
      <div>
        <p>Job Offer:</p>
        <p>- Period: {challengeData.jobOfferDetails.period}</p>
        <p>- Post: {challengeData.jobOfferDetails.post}</p>
        <p>- Place: {challengeData.jobOfferDetails.place}</p>
        <p>- Salary: {challengeData.jobOfferDetails.salary}</p>
      </div>
    )}
    {challengeData.freelanceOpportunity && (
      <div>
        <p>Freelance Opportunity:</p>
        <p>- Details: {challengeData.freelanceDetails.details}</p>
        <p>- Salary: {challengeData.freelanceDetails.salary}</p>
      </div>
    )}
    {/* {challengeData.otherGift && (
      <div>
        {challengeData.otherGiftDetails && (
          <p>Other Gift Details: {challengeData.otherGiftDetails}</p>
        )} */}
      </div>
    )}
  </div>
)}



                {idx === 4 && challengeData && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh' }}>
                    {/* Comments Section */}
                    <div>
                      {comments.slice(offset, offset + commentsPerPage).map((comment) => (
                        <div key={comment._id}>
                          <div style={{ display: 'flex' }}> 
                            <img src='/images/no_pdp.jpg' style={{ width: '45px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                            <p style={{ color: 'black' }}>
                              <strong style={{ color: 'black' }}>{comment.userName}</strong>
                            </p>
                          </div>   
                          <div className='mt-1'>
                            <p  style={{ fontSize: '0.9em' }}>
                              <strong>Comment: </strong>
                              {comment.content}
                            </p>
                          </div>
                          <hr/>
                        </div>
                      ))}
                      {/* Pagination */}
                      <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap g-3 justify-content-center justify-content-md-between pt-5 pt-lg-7">
                        <div className="nk-pagination-col">
                          <p>Showing: <span>{offset + 1}-{Math.min(offset + commentsPerPage, comments.length)} of {comments.length} Comments</span></p>
                        </div>
                        <div className="nk-pagination-col">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-s1">
                              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageClick('prev')}>
                                  <NioIcon name="chevron-left" />
                                  <span className="d-none d-sm-inline-block">Prev</span>
                                </button>
                              </li>
                              <li className="page-item active">
                                <span className="page-link">{currentPage + 1}</span>
                              </li>
                              <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageClick('next')}>
                                  <span className="d-none d-sm-inline-block">Next</span>
                                  <NioIcon name="chevron-right" />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      {/* Add Comment Form */}
                      <div className='mt-3'>
                        <form onSubmit={handleSubmit}>
                          <div>
                            <textarea
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              required
                              style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '10px',
                                border: '1px solid #ccc',
                                resize: 'none',
                              }}
                            />
                          </div>
                          <button type="submit" className="btn-indigo rounded w-100" disabled={loading}>
                            {loading ? 'Adding Comment...' : 'Add Comment'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {idx === 5 && challengeData && (
<NioSection.Content>
            <div className="table-responsive">
              <table className="table nk-table-crypto bg-light-alt">
                <thead>
                  <tr>
                    <td className="p-5 fw-bold text-nowrap" style={{ width: '20%', textAlign: 'center' }}>Rank</td>
                    <td className="p-5 fw-bold text-nowrap text-center" style={{ width: '35%' }}>Participant</td>
                    <td className="p-5 fw-bold text-nowrap text-center" style={{ width: '35%' }}>Score</td>
                  </tr>
                </thead>
                <tbody>
                {scores.map((score, index) => (
  <tr key={index}>
    <td className="p-5" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      {index === 0 && <img src="/images/first.png" alt="Image 1" style={{ width: '50px', height: '50px' }} />}
      {index === 1 && <img src="/images/second.png" alt="Image 2" style={{ width: '50px', height: '50px' }} />}
      {index === 2 && <img src="/images/third.png" alt="Image 3" style={{ width: '50px', height: '50px' }} />}
      {index >= 3 && index + 1}
    </td>
    <td className="p-5" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{score.fullName}</td>
    <td className="p-5" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{score.score}</td>
  </tr>
))}

                </tbody>
              </table>
            </div>
          </NioSection.Content>
            

                )}
              </div>
            </div>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
}
