import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { NioField } from '../../../components';
import NioPagination from '../../../components/NioPagination/NioPagination';

function ListChall() {
  const [challenges, setChallenges] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // État pour contrôler l'affichage du modal
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    prizes: ''
  });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const companyId = decodedToken._id;

      const response = await axios.get(`http://localhost:9091/challenge/getcompany/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setChallenges(response.data.challenges.map(challenge => ({
        ...challenge,
        startDate: formatDate(challenge.startDate),
        endDate: formatDate(challenge.endDate),
      })));
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };
  const handleOpenUpdateForm = (challenge) => {
    setSelectedChallenge(challenge);
    setFormData({
      title: challenge.title,
      startDate: formatDateForForm(challenge.startDate),
      endDate: formatDateForForm(challenge.endDate),
      prizes: challenge.prizes
    });
    setShowUpdateModal(true);
  };
  
  

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); // Fermer le modal
    setSelectedChallenge(null); // Réinitialiser le défi sélectionné
    setFormData({
      title: '',
      startDate: '',
      endDate: '',
      prizes: ''
    }); // Réinitialiser les données du formulaire
  };

  const handleUpdateChallenge = async () => {
    try {
      // Logique de mise à jour du défi ici avec axios.put()
      // Assurez-vous de mettre à jour l'état local des défis après la mise à jour
      console.log('Updating challenge:', selectedChallenge);
      handleCloseUpdateModal(); // Fermer le modal après la mise à jour
    } catch (error) {
      console.error('Error updating challenge:', error);
      // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
    }
  };

  const handleDeleteChallenge = async (challengeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:9091/challenge/${challengeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Delete challenge response:', response.data);
      // Supprimer le défi de l'état local
      setChallenges(prevChallenges =>
        prevChallenges.filter(challenge => challenge._id !== challengeId)
      );
    } catch (error) {
      console.error('Error deleting challenge:', error);
      // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatDateForForm = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
  

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = challenges.slice(indexOfFirstItem, indexOfLastItem);

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
      <Table striped bordered hover style={{ background: 'white' }}>
        <thead>
          <tr>
            <th>Challenge </th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Number Of Participants</th>
            <th>Number of Teams</th>
            <th>Prizes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((challenge) => (
            <tr key={challenge._id}>
              <td>{challenge.title}</td>
              <td>{challenge.startDate}</td>
              <td>{challenge.endDate}</td>
              <td>{challenge.participants.length}</td>
              <td>{challenge.teams.length}</td>
              <td>{challenge.prizes}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ cursor: 'pointer', marginRight: '15px', color: 'rgb(54, 162, 235)' }}
                  size="lg"
                  onClick={() => handleOpenUpdateForm(challenge)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: 'pointer', color: 'rgb(255, 99, 132)' }}
                  size="lg"
                  onClick={() => handleDeleteChallenge(challenge._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <NioPagination
          className="pagination"
          pagination={Array(Math.ceil(challenges.length / itemsPerPage)).fill().map((_, i) => i + 1)}
          setCurrentPage={handlePageChange}
        />
      </div>
      {/* Modal pour la mise à jour du défi */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
  <Form.Label>Start Date</Form.Label>
  <Form.Control
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleInputChange}
  />
</Form.Group>




            <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate} // Utilisez la date existante ici
                onChange={handleInputChange}
            />
            </Form.Group>

            <Form.Group controlId="formPrizes">
              <Form.Label>Prizes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter prizes"
                name="prizes"
                value={formData.prizes}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateChallenge}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListChall;
