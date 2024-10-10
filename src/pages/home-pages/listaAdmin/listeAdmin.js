import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row ,Table} from 'react-bootstrap';
import  { useState , useEffect  } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';
import { Button, Modal, Form } from 'react-bootstrap';

import {Bar,Doughnut,Line} from 'react-chartjs-2';
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { faTrash , faEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// layout 

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';
import { Select } from '@material-ui/core';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function UserManagementSuperAdmin() {
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [users, setUsers] = useState([]); // Déclaration de users
  const [searchTerm, setSearchTerm] = useState(''); // Déclaration de searchTerm
  
  const columns = [
    {
      name: '', // Nom de la nouvelle colonne
      cell: row => (
          <div style={{ textAlign: 'center' }}>
              <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() =>  handleDeleteUser(row.id)}
                  style={{ cursor: 'pointer' }}
                   size="lg"
              />
              <FontAwesomeIcon className='mx-2'
    icon={faEdit}
   /* onClick={() => handleEdit(row.id)}*/// Assurez-vous de dÃ©finir une fonction handleEdit appropriÃ©e
    style={{ cursor: 'pointer' }}
    size="lg"
/>
          </div>
      ),
      ignoreRowClick: true, // Ignorer le clic de la ligne pour Ã©viter de dÃ©clencher la sÃ©lection de la ligne
      allowOverflow: true,
      button: true, // Afficher comme un bouton pour une meilleure accessibilitÃ©
  },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Id</span>, 

      selector: row => row.id,
      cell: row => <div style={{ fontSize: '16px '}}>{row.id}</div> 
     
     
    },
    {
      name: <span style={{ fontWeight: 'bold',color: 'darkblue' ,fontSize: '16px '}}>First Name</span>, 
      selector: row => row.firstName,
      
      cell: row => <div style={{ fontSize: '15px ' }}>{row.firstname}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Last Name</span>, 
      selector: row => row.lastName,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.lastname}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Email</span>, 
      selector: row => row.email,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.email}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>phone</span>, 
      selector: row => row.status,
      cell: row => <a href={`https://wa.me/${row.phone}`} style={{ fontSize: '15px ' }}>{row.phone}</a>

    }
  ];


  
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
      console.log(formData);
      const response = await axios.post('http://localhost:9091/user/addAdmin', formData);
      console.log('User added successfully:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

 

  


  function CreateUserForm({ showModal, handleCloseModal }) {
    const [formData, setFormData] = useState({
      name: '',
      firstname: '', 
      lastname: '',
      phone: '',
      email: '',
      password: '',
      role: '',
      field: '',
      city: '',
      address: '',
      need: '',
      description: '',
      status: '',
      gender: '',
    });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/create-user', formData);
        const { user, accessToken, refreshToken } = response.data;
        // Stockez les tokens dans le stockage local
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // Faites quelque chose avec les donnÃ©es utilisateur si nÃ©cessaire
        console.log('Utilisateur crÃ©Ã© avec succÃ¨s:', user);
        handleCloseModal(); // Fermez le modal aprÃ¨s la crÃ©ation de l'utilisateur
      } catch (error) {
        console.error('Erreur lors de la crÃ©ation de l\'utilisateur :', error);
        // GÃ©rer les erreurs de crÃ©ation d'utilisateur
      }
    };}
  

 


/*
  const [dataaa, setdataaa] = useState(dataa);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newDataa = data.filter(row => {
      return row.firstName.toLowerCase().includes(searchTerm);
    });
    setRecords(newDataa);
  }
*/



const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:9091/user/getalladmin");
    setUsers(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

useEffect(() => {
  fetchUsers();
}, [deletedUserId]);

useEffect(() => {
  fetchUsers();
}, []);

function handleFilter(event) {
  const searchTerm = event.target.value.toLowerCase();
  setSearchTerm(searchTerm);
  
  if (searchTerm === '') {
    // Si la chaîne de recherche est vide, réinitialiser la liste des utilisateurs
    fetchUsers();
  } else {
    const newData = users.filter(row => {
      return row.firstname && row.firstname.toLowerCase().includes(searchTerm);
    });
    setUsers(newData);
  }
}
  




 // Suppression d'un utilisateur cÃ´tÃ© client

 const handleDeleteUser = async (id) => {
  try {
    // Effectuer la requÃªte DELETE vers l'API backend
    const response = await axios.delete(`http://localhost:9091/user/deleteUser/${id}`);
    setDeletedUserId(id);
    console.log(id);

    // VÃ©rifiez si la suppression a rÃ©ussi
    if (response.status === 200) {
      // Affichez un message de succÃ¨s ou effectuez toute autre action nÃ©cessaire
      console.log('Utilisateur supprimÃ© avec succÃ¨s.');
    } else {
      // Affichez un message d'erreur si la suppression a Ã©chouÃ©
      console.error('Erreur lors de la suppression de l\'utilisateur :', response.data.message);
    }
  } catch (error) {
    // GÃ©rez les erreurs ici
    console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
  }
};

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  
  return (

    <AppLayout variant={4} title="UserManagementSuperAdmin" rootClass="layout-3">

      <section className="nk-banner nk-banner-collab">
      
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-banner-content">
    
      <div className='container ' style={{ width: '50%', float: 'left' }}>
    
      </div>
      </div>
      <div className='container ' style={{ width: '50%', float: 'right' }}>
      <div className='row'>
        
      <div className='col-12 '>

        
     
          </div>
          </div>
</div>
       
         <div className=' mt-7 ' >
          
       
          <div className=' mt-3 text-center'>
            
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase  text-white fw-semibold mb-2 mx-5 "  style={{ background: 'hsl(120, 70%, 80%)', border: '1px solid #4CAF50' }}  onClick={handleOpenModal}>Add</button>
          <input type="text  " className='mx-8 ' onChange={handleFilter} style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>

        </div>
          <div className="container border p-1 bg-gradient-18 rounded-4 mt-5 ">
            
            <div className="table-responsive rounded-4 ">

            <table  style={{ backgroundColor: 'white' ,borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
          <th style={{ border: '1px solid grey', padding: '8px' }}> </th>

            <th style={{ border: '1px solid grey', padding: '8px' }}> first name</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}> last name</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>email</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>phone</th>
           
          </tr>
        </thead>
        <tbody>
  {users.map((user) => (
    <tr key={user._id} className="table-row">
      {/* <td>{user.profile}</td> */}
      <td>
        <th>
          <Button>
            <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }} size="xs" />
          </Button> 
          <Button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
            <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} size="xs" />
          </Button>
        </th>
      </td>
      <td style={{ border: '1px solid grey', padding: '8px' }}>{user.firstname}</td>
      <td style={{ border: '1px solid grey', padding: '8px' }}>{user.lastname}</td>
      <td style={{ border: '1px solid grey', padding: '8px', borderRight: '1px solid grey' }}>
        <a href={`mailto:${user.email}`} style={{ fontSize: '15px' }}>{user.email}</a>
      </td>
      <td style={{ border: '1px solid grey', padding: '8px', borderLeft: '1px solid grey' }}>
        <a href={`tel:${user.phone}`} style={{ fontSize: '15px' }}>{user.phone}</a>
      </td>
    </tr>
  ))}
</tbody>



      </table>

              
            </div>
          </div>
        </div>
         </div>
         
         <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New ADMIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <Form.Group controlId="phone">
            <Form.Label>phone</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-control-sm"
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control-sm"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control-sm"
            />
            
          </Form.Group>
         
        
          <Form.Group controlId="role">
            <Form.Label>role</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
              
              {/* Ajoutez d'autres champs de formulaire selon vos besoins */}
            <div className='text-center mt-5'>
              <Button className='mx-1' variant="success" type="submit"  size="sm">
                Add
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}  size="sm">
                Cancel
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

       
          
      </section>
     

    </AppLayout >
  )
  }