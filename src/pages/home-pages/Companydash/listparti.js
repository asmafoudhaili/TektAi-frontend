import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'; // Import de Button depuis react-bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; // Suppression de faCircle et faCircleCheck
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Correction de l'import de jwtDecode
import { NioField } from '../../../components'; // Import de NioField
import NioPagination, { NioPaginationItem } from '../../../components/NioPagination/NioPagination'; // Import de la pagination

function ListParticipants() {
  const [challenges, setChallenges] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Nombre d'éléments par page

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const decodedToken = jwtDecode(token);
    const companyId = decodedToken._id;

    axios.get(`http://localhost:9091/challenge/company/participants/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setChallenges(response.data.participantsWithChallenges);
    }).catch(error => {
      console.error('Error fetching challenges:', error);
    });
  }, []);

  const handleOpenUpdateForm = (challenge) => {
    console.log('Open update form for challenge:', challenge);
  };

  const handleDeleteChallenge = (challengeId) => {
    console.log('Delete challenge with ID:', challengeId);
  };

  const filteredChallenges = challenges.filter(challenge =>
    challenge.challengeTitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div className="search-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <NioField.Input
                icon="search before z-1"
                placeholder="Search for challenge"
                style={{ width: '400px', fontSize: '14px' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table striped bordered hover style={{ background: 'white' }}>
          <thead>
            <tr>
              <th>Challenge</th>
              <th>Participants</th>
              <th>Actions</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((participantChallenge, index) => (
              <tr key={index}>
                <td>{participantChallenge.challengeTitle}</td>
                <td>{participantChallenge.participant}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ cursor: 'pointer', marginRight: '15px', color: 'rgb(54, 162, 235)' }}
                    size="lg"
                    onClick={() => handleOpenUpdateForm(participantChallenge)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: 'pointer', marginRight: '15px', color: 'rgb(255, 99, 132)' }}
                    size="lg"
                    onClick={() => handleDeleteChallenge(participantChallenge.challengeId)}
                  />
                </td>
                <td>
                  <Button
                    size="sm"
                    style={{ marginLeft: '2px' }}
                    variant="success"
                  >
                    Accept Participation
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <NioPagination
            className="pagination"
            pagination={Array(Math.ceil(filteredChallenges.length / itemsPerPage)).fill().map((_, i) => i + 1)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default ListParticipants;
