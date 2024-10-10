import { Chart } from 'chart.js';
import jsvectormapMin from 'jsvectormap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import  { useState } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';
import axios from "axios";
import { faTrash , faEdit ,faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { FaHistory } from 'react-icons/fa'; // Assurez-vous d'importer correctement l'icône d'historique depuis la bibliothèque react-icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import ReactPaginate from 'react-paginate';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar'; // Changed import statement
import { useNavigate } from 'react-router-dom';
import {  Thead, Tbody, Tr, Th, Td ,Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import {Bar,Doughnut,Line} from 'react-chartjs-2';


function ListAdmin() {




    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [company, setCompany] = useState([]);
    const [Challenged, setChallenged] = useState([]);
    const [Admin, setAdmin] = useState([]);

    const [userss, setUserss] = useState(company);
    const [deletedUserId, setDeletedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [blockUser, setBlockedUser] = useState(null) ;
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [challengers, setChallengers] = useState([]);
    const navigate = useNavigate();
    const [userHistory, setUserHistory] = useState(null);








    
const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);

const handleOpenModal2 = () => setShowModal2(true);
const handleCloseModal2 = () => setShowModal2(false);

const handleOpenModal3 = () => setShowModal3(true);
const handleCloseModal3 = () => setShowModal3(false);

const handleOpenModal4 = () => setShowModal4(true);
const handleCloseModal4 = () => setShowModal4(false);


const fetchUserHistory = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:9091/user/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Récupérer l'historique de l'utilisateur depuis la réponse
    const history = response.data.map(entry => `${entry.action} - ${entry.timestamp}`);
    // Afficher l'historique dans une popup
    alert(`Historique de l'utilisateur:\n${history.join('\n')}`);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique de l\'utilisateur :', error);
    alert("Impossible de récupérer l'historique de l'utilisateur.");
  }
};


useEffect(() => {
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');


    const response = await axios.get(`http://localhost:9091/user/getalladmin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data)
    setAdmin(response.data.users);

};
  fetchUsers();
}, [deletedUserId]);
  
 

  
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:9091/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDeletedUserId(id);

      if (response.status === 200) {
        console.log('Utilisateur supprimé avec succès.');
      } else {
        console.error('Erreur lors de la suppression de l\'utilisateur :', response.data.message);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
    }
  };



  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    role: '',
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
  
      const response = await axios.post('http://localhost:9091/user/', formData, {
        headers: {
          Authorization: `Bearer ${token}` // Ajouter le token dans les en-têtes de la requête
        }
      });
  
      console.log('User added successfully:', response.data);
      setUsers([...users, response.data.user]);
  
      handleCloseModal();
      handleCloseModal2();

  
      console.log("ABC")
    } catch (error) {
      console.error('Error adding user:', error);
    }    
  
  };
  
  const handleBlockUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:9091/user/block/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.message); 
      setBlockedUser(blockUser + 1);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === id ? { ...user, block: !user.block } : user
        )
      ); 
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
  };     
  



  //////////////////////////////update
  const [updateFormData, setUpdateFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    role: '',
    // Ajoutez d'autres champs de formulaire selon vos besoins
  });
  
  

  

  const handleOpenUpdateForm = (user) => {
    setSelectedUser(user);
    setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            role: user.role,
            gender: user.gender,
            status: user.status,
        });
    setShowModal3(true);
  };
  const handleOpenUpdateForm1 = (user) => {
    setSelectedUser(user);
    setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            role: user.role,
            gender: user.gender,
            status: user.status,
        });
    setShowModal4(true);
  };
  


  const handleSubmitUpdateForm = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local

        await axios.put(`http://localhost:9091/user/${selectedUser._id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        setUsers(users.map(user => user._id === selectedUser._id ? { ...user, ...formData } : user));
        setShowUpdateForm(false);
        handleCloseModal3();
        handleCloseModal4();

    } catch (error) {
        console.error('Error updating user:', error);
    }
};


const [filter, setFilter] = useState('all');
const [filter1, setFilter1] = useState('all');



  
  ///////////pagination 
    
  const handlePageClick = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);

  const adminPerPage = 1;

  const offset = currentPage * adminPerPage;
  const pageCount = Math.ceil(Admin.length / adminPerPage);

//////////////////recherche
const [searchValue, setSearchValue] = useState('');

const handleSearchChange = (event) => {
setSearchValue(event.target.value);
};

const filterAdmins = (admins, filter, searchValue) => {
return admins.filter(user => {
  // Filtrer par état de blocage
  if (filter === 'blocked') {
    return user.block;
  } else if (filter === 'notBlocked') {
    return !user.block;
  } else {
    return true; // Si aucun filtre n'est sélectionné, afficher tous les administrateurs
  }
}).filter(user => {
  // Filtrer par recherche dynamique
  return user.firstname.toLowerCase().includes(searchValue.toLowerCase());
});
};

// Dans votre composant, utilisez la fonction de filtrage globale pour obtenir la liste filtrée d'administrateurs
const filteredAdmin = filterAdmins(Admin, filter, searchValue);



    return (
        <>
      

      <div className=" mb-3 ">
  <div className='mt-2'style={{ display: 'flex' }} >
    <div className="form-check form-check-inline mt-2" >
      <input
        type="radio"
        className="form-check-input"
        id="all"
        value="all"
        checked={filter === 'all'}
        onChange={() => setFilter('all')}
        style={{ width: '14px', height: '14px', marginTop: '4px' }}

      />
      <label className="form-check-label" htmlFor="all">All</label>
    </div>
    <div className="form-check form-check-inline mt-2" style={{ marginLeft: '0rem' }}>
      <input
        type="radio"
        className="form-check-input"
        id="blocked"
        value="blocked"
        checked={filter === 'blocked'}
        onChange={() => setFilter('blocked')}
        style={{ width: '14px', height: '14px', marginTop: '4px' }}

      />
      <label className="form-check-label" htmlFor="blocked">Blocked</label>
    </div>
    <div className="form-check form-check-inline mt-2" style={{ marginLeft: '0rem' }}>
      <input
        type="radio"
        className="form-check-input"
        id="notBlocked"
        value="notBlocked"
        checked={filter === 'notBlocked'}
        onChange={() => setFilter('notBlocked')}
        style={{ width: '14px', height: '14px', marginTop: '4px' }}

      />
      <label className="form-check-label" htmlFor="notBlocked">Authorized</label>
    </div>
{/*recherche*/}
<div className="input-group mb-3">
  
  <input
    type="text"
    className="form-control form-control-sm rounded"
    placeholder="Search by first name"
    value={searchValue}
    onChange={handleSearchChange}
    style={{ borderRadius: '0', marginLeft: '40%' }}
  />
</div>


  </div>

  

</div>


            
        <div class="row mt-2">
            <div class="col-12 col-lg-12  d-flex">
                <div class="card flex-fill">
                <div class="card-header d-flex justify-content-between align-items-center">
               
    <div class="col-6">
        <h5 class="card-title mb-0">Admin</h5>
    </div>
    <div class="col-6 text-end">
        <FontAwesomeIcon
            icon={faUserPlus}
            style={{ cursor: 'pointer', color: '#2ecc71'  }}
            size="50px"
            onClick={handleOpenModal}
        />
    </div>
</div>




<div className="table-responsive">
    <Table className="table table-hover my-0" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <Thead>
            <Tr>
                <Th>Photo</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <Th>Gender</Th>
                <Th>Status</Th>
                <Th>Block</Th>
                <Th></Th>
            </Tr>
        </Thead>
        <Tbody>
            {filteredAdmin.slice(offset, offset + adminPerPage).map((user, index) => (
                <Tr key={user._id} className="table-row" style={{ borderBottom: '1px solid #dee2e6', padding: '10px 0' }}>
                    <Td>
                        <img src='/images/no_pdp.jpg' style={{ width: '40px', height: '35px', borderRadius: '50%' }} />
                    </Td>
                    <Td onClick={() => navigate(`/profile/${user._id}`)} style={{ cursor: 'pointer' }}>{user.firstname}</Td>
                    <Td>{user.lastname}</Td>
                    <Td>{user.phone}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.gender}</Td>
                    <Td>{user.status}</Td>
                    <Td>{user.block ? "Yes" : "No"}</Td>
                    <Td>
                        <Th>
                            <FontAwesomeIcon
                                icon={faEdit}
                                style={{ cursor: 'pointer', marginRight: '5px', color: 'rgb(54, 162, 235)' }}
                                size="lg"
                                onClick={() => handleOpenUpdateForm(user)}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ cursor: 'pointer', marginRight: '5px', color: 'rgb(255, 99, 132)' }}
                                size="lg"
                                onClick={() => handleDeleteUser(user._id)}
                            />
                            <FontAwesomeIcon
                                icon={faBan}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                                size="lg"
                                onClick={() => handleBlockUser(user._id)}
                            />
                        </Th>
                    </Td>
                </Tr>
            ))}
        </Tbody>
    </Table>
</div>

                </div>
            </div>

             {/* Pagination */}
             <div className='text-center'>
             <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap g-3 justify-content-center justify-content-md-between pt-5 pt-lg-7 ">
                        <div className="nk-pagination-col">
                          <p>Showing: <span>{offset + 1}-{Math.min(offset + adminPerPage, Admin.length)} of {Admin.length} </span></p>
                        </div>
                        <div className="nk-pagination-col">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-s1">
                              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageClick('prev')}>
                                  <div name="chevron-left" />
                                  <span className="d-none d-sm-inline-block">Prev</span>
                                </button>
                              </li>
                              <li className="page-item active">
                                <span className="page-link">{currentPage + 1}</span>
                              </li>
                              <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageClick('next')}>
                                  <span className="d-none d-sm-inline-block">Next</span>
                                  <div name="chevron-right" />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>

                      </div>        
            
        </div>
        

        
        <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter last name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className='text-center mt-5'>
            <Button className='mx-1' variant="success" type="submit" size="sm">
              Add
            </Button>
            <Button variant="secondary" onClick={handleCloseModal} size="sm">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  


        <Modal show={showModal3} onHide={handleCloseModal3}>
      <Modal.Header closeButton>
        <Modal.Title>update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitUpdateForm}>
           <Row>
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter last name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className='text-center mt-5'>
            <Button className='mx-1' variant="success" type="submit" size="sm">
              Add
            </Button>
            <Button variant="secondary" onClick={handleCloseModal3} size="sm">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  

        
        </>
        
    );
    
}

export default ListAdmin;