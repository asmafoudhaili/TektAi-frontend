import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { NioField } from '../../../components';
import NioPagination from '../../../components/NioPagination/NioPagination';
import { jwtDecode } from "jwt-decode";

function Evaluation() {
  const [challenges, setChallenges] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken._id;
        const response = await axios.get(`http://localhost:9091/challenge/getFiles/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        setChallenges(response.data.participants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const filteredChallenges = challenges.filter(challenge =>
    challenge.challengeTitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownloadFile = async (downloadLink) => {
    try {
      const response = await axios.get(downloadLink, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadLink.substring(downloadLink.lastIndexOf('/') + 1));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }
  };
  
  

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
              <th>Files</th>
              <th>Acceptance</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((participantChallenge, index) => (
              <tr key={index}>
                <td>{participantChallenge.challengeTitle}</td>
                <td>{participantChallenge.participant}</td>
                <td>
                  <ul>
                  {participantChallenge.files.map((file, fileIndex) => (
  <li key={fileIndex}>
    <a href={`http://localhost:9091/challenge/downloadFile/${encodeURIComponent(file.name)}`} download>{file.name}</a>
  </li>
))}





                  </ul>
                </td>
                <td>
                  <Button size="sm" style={{ marginLeft: '2px' }} variant="success">Ok</Button>
                  <Button size="sm" style={{ marginLeft: '2px' }} variant="danger">NoOk</Button>
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

export default Evaluation;
