import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row ,Table} from 'react-bootstrap';
import  { useState ,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';
import axios from "axios";
import { faTrash , faEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import ReactPaginate from 'react-paginate';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import {Bar,Doughnut,Line} from 'react-chartjs-2';


// layout 

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function UserManagementAdmin() {
  
  

  const [deletedUserId, setDeletedUserId] = useState(null);
  const [blockUser, setBlockedUser] = useState(null) ;


  const columns = [
    {
      name: '', // Nom de la nouvelle colonne
      cell: row => (
          <div style={{ textAlign: 'center' }}>
              <FontAwesomeIcon
                  icon={faTrash}
                  /*onClick={() => deleteUser(row.id, row.firstname)}*/
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
      selector: row => row.firstname,
      
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
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Address</span>, 
      selector: row => row.address,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.address}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>City</span>, 
      selector: row => row.city,
      cell: row => <div style={{fontSize: '15px ' }}>{row.city}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Gender</span>, 
      selector: row => row.gender,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.gender}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>phone</span>, 
      selector: row => row.status,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.phone}</div> 

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
      const response = await axios.post('http://localhost:9091/user/', formData);
      console.log('User added successfully:', response.data);
      handleCloseModal();
      console.log("ABC")
    } catch (error) {
      console.error('Error adding user:', error);
    }      
  };

 

//company: 
const columnn = [
  {
    name: '', // Nom de la nouvelle colonne
    cell: row => (
        <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
                icon={faTrash}
                /*onClick={() => deleteUser(row.id, row.firstname)}*/
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
    name: <span style={{ fontWeight: 'bold',color: 'darkblue' ,fontSize: '16px '}}> Name</span>, 
    selector: row => row.name,
    
    cell: row => <div style={{ fontSize: '15px ' }}>{row.name}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>phone</span>, 
    selector: row => row.lastName,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.phone}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Email</span>, 
    selector: row => row.email,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.email}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Address</span>, 
    selector: row => row.address,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.address}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>field</span>, 
    selector: row => row.city,
    cell: row => <div style={{fontSize: '15px ' }}>{row.field}</div> 

  },
  
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>city</span>, 
    selector: row => row.status,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.city}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Need</span>, 
    selector: row => row.status,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.need}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Description</span>, 
    selector: row => row.status,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.description}</div> 

  }
];



  /*
  const [dataaa, setdataaa] = useState(dataa);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newDataa = data.filter(row => {
      return row.firstName.toLowerCase().includes(searchTerm);
    });
    setRecords(newDataa);
  }








  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newData = data.filter(row => {
      return row.firstName.toLowerCase().includes(searchTerm);
    });
    setRecords(newData);
  }
*/
const [editing, setEditing] = useState(false);
const [editId, setEditId] = useState(null);


const [formValues, setFormValues] = useState({
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  gender: '',
  status: '',

});


const handleEdit = async (id) => {
  try {
    const response = await axios.put(`http://localhost:9091/user/${id}`);
    console.log(id)
    console.log(response.data)
    setFormValues(response.data);
    setEditing(true);
    setEditId(id);



  } catch (error) {
    console.error(error);
  }
};








  
const [company, setCompany] = useState([]);
const [Challenged, setChallenged] = useState([]);
const [selectedRows, setSelectedRows] = useState([]);




useEffect(() => {
  const fetchUsers = async () => {
    
      const response = await axios.get("http://localhost:9091/user/getallsuperadmin");
      setChallenged(response.data);

  };
  
  fetchUsers();
}, [deletedUserId]);


 // Suppression d'un utilisateur cÃ´tÃ© client
 const deleteUser = (id, name) => {
  if (window.confirm(`Are you sure you want to delete ${name}`)) {
    fetch("http://localhost:9091/user/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data);
      });
  } else {
  }
};
  













const handleCheckboxChange = (selectedId) => {
  const updatedSelection = selectedRows.includes(selectedId)
    ? selectedRows.filter((id) => id !== selectedId)
    : [...selectedRows, selectedId];

  setSelectedRows(updatedSelection);
};


useEffect(() => {
  const fetchUsers = async () => {

      const response = await axios.get("http://localhost:9091/user/getallthenya");
      setCompany(response.data);
      console.log(response.data)
     // setTotalItems(data.totalCount);
    
  };
  
  fetchUsers();
}, [deletedUserId,blockUser]);


const [searchTerm, setSearchTerm] = useState('');
const [users, setUsers] = useState(Challenged);

function handleFilterr(event) {
  const searchTerm = event.target.value.toLowerCase();
  setSearchTerm(searchTerm);

  const newData = company.filter(row => {
    return row.name && row.name.toLowerCase().includes(searchTerm); // Ajouter une vérification pour la propriété name
  });
  setUsers(newData); // Modifier setUserss en setUsers
}


const [userId, setUserId] = useState(null);  
const [ischecked, setischecked] = useState();  

const [showModal, setShowModal] = useState(false);
const [showModal2, setShowModal2] = useState(false);
const [showModal3, setShowModal3] = useState(false);

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);

const handleOpenModal2 = () => setShowModal2(true);
const handleCloseModal2 = () => setShowModal2(false);

const handleOpenModal3 = () => setShowModal3(true);
const handleCloseModal3 = () => setShowModal3(false);


const handleDeleteSelected = async () => {
  try {
    await axios.delete(`http://localhost:9091/user/:id`, { data: { ids: selectedRows } });
    // Rest of the code...
  } catch (error) {
    console.log(error);
  }
};




  const [genderFilter, setGenderFilter] = useState('all');

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    if (genderFilter === 'all') {
      return true;
    } else {
      return user.gender === genderFilter;
    }
  });

/////////////////////////////////////////////////////////////////////////
const handleDeleteUser = async (id) => {
  try {
    // Effectuer la requÃªte DELETE vers l'API backend
    const response = await axios.delete(`http://localhost:9091/user/deleteUser/${id}`);
    setDeletedUserId(id);

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


const handleBlockUser = async (id) => {
  try {
    console.log("handle"+id)
    await axios.put(`http://localhost:9091/user/block/${id}`);
console.log("id block"+id) ;
    setBlockedUser(blockUser+1) ;
    console.log(blockUser+1) ;
    

  }
  catch (error) {
    console.log(error);
  }
}











/////////////////////////////////////////////////////////////////////////////
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

    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 2;
    const pageCount = Math.ceil(company.length / usersPerPage);
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };

  
    const [currentPage2, setCurrentPage2] = useState(0);
    const usersPerPage2 = 3;
    const pageCount2 = Math.ceil(Challenged.length / usersPerPage2);
  
    const handlePageChange2 = ({ selected }) => {
      setCurrentPage2(selected);
    };

  
    



 /////////////////////////////////////////////////////////////////////// 
  return (

    <AppLayout variant={4} title="UserManagementAdmin" rootClass="layout-3">

      <section className="nk-banner nk-banner-collab">
      
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-banner-content">
      <div className='container' >
    


      </div>
  
      </div>
      <div className='container ' >
     
      

        
            <div className=' mt-5' >
       
          <div className=' mt-3 text-center'>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase  text-white fw-semibold mb-2 mx-5" style={{ background: 'hsl(120, 70%, 80%)', border: '1px solid #4CAF50' }} onClick={handleOpenModal}>Add</button>
          <input type="text " className='mx-8 ' onChange={handleFilterr} style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>
        
        </div>
          <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
            
            <div className="table-responsive rounded-4 ">
          
            <table  style={{ backgroundColor: 'white' ,borderCollapse: 'collapse', width: '100%' }}  >
        <thead>
          <tr >
          <th style={{ border: '1px solid grey', padding: '8px' }}>  </th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>  first Name</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}> last Name</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>phone</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>email</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>gender</th>
      
            <th style={{ border: '1px solid grey', padding: '8px' }}>status</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>Block</th>

          </tr>
        </thead>
        <tbody  >
          {filteredUsers.slice(currentPage2 * usersPerPage2, (currentPage2 + 1) * usersPerPage2).map((user) => (
            <tr key={user._id} className="table-row ">
              <td  style={{ border: '1px solid grey', padding: '8px' }}>
<th>
 <Button className='mx-1'   onClick={handleOpenModal3}>
    <FontAwesomeIcon icon={faEdit}  style={{ cursor: 'pointer' }}
                  size="xs"/>
  </Button> 
  <Button className="btn btn-danger"

    onClick={() => handleDeleteUser(user._id)}>
    <FontAwesomeIcon icon={faTrash}  style={{ cursor: 'pointer' }}
                  size="xs" />
  </Button>
  
  <Button className='mx-1'  variant="secondary" onClick={() => handleBlockUser(user._id)}>
  <FontAwesomeIcon icon={faBan} style={{ cursor: 'pointer' }} size="xs" />
</Button>
  
  
   </th>
</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.firstname}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.lastname}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.phone}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.email}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.gender}</td>  
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.status}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.block ? "Yes" : "No"}</td>
              

              <tr>

</tr>

            </tr>
          ))}
        </tbody>


      </table>
      <label>
          <input
            type="radio"
            name="genderFilter"
            value="all"
            checked={genderFilter === 'all'}
            onChange={handleGenderFilterChange}
          />
          All
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            name="genderFilter"
            value="male"
            checked={genderFilter === 'male'}
            onChange={handleGenderFilterChange}
          />
          Male
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            name="genderFilter"
            value="female"
            checked={genderFilter === 'female'}
            onChange={handleGenderFilterChange}
          />
          Female
        </label>

   
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount2}
          onPageChange={handlePageChange2}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      </div>
        </div>
        
          
</div>

               <div className='container mt-5'>
            
                 <div className=' '>
        
                    <div className='container text-center '>
                     <div className=' mt-3'>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase  text-white fw-semibold mb-2 mx-5" style={{ background: 'hsl(120, 70%, 80%)', border: '1px solid #4CAF50' }} onClick={handleOpenModal2}>Add</button>
           <input type="text mx-1 " className='mx-8' onChange={handleFilterr}  style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>
 
         </div>
         </div>
           <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
             
             <div className="table-responsive rounded-4 ">
             <table  style={{ backgroundColor: 'white' ,borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
          <th style={{ border: '1px solid grey', padding: '8px' }}></th>
            <th style={{ border: '1px solid grey', padding: '8px' }}> Name</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}> phone</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>email</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>field</th>
    
            <th style={{ border: '1px solid grey', padding: '8px' }}>need</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>description</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>Block</th>


          </tr>
        </thead>
        <tbody>
          {users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage).map((user) => (
            <tr key={user._id} className="table-row">
              <td style={{ border: '1px solid grey', padding: '8px' }}>
              {/* <td>{user.profile}</td> */}
              <th >
 <Button className='mx-1'  >
    <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }}
                  size="xs" />
  </Button> 
  <Button className="btn btn-danger"

    onClick={() => handleDeleteUser(user._id)}>
    <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }}
                  size="xs"/>
  </Button> 
  <Button className='mx-1'  variant="secondary" onClick={() => handleBlockUser(user._id)}>
  <FontAwesomeIcon icon={faBan} style={{ cursor: 'pointer' }} size="xs" />
</Button>
  
  </th>
  </td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.phone}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.email}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.field}</td>
             
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.need}</td>

              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.description}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{user.block ? "Yes" : "No"}</td>



            

             

              <tr>

    
  


</tr>

            </tr>
          ))}
        </tbody>


      </table>
      


             </div>
               
           </div>
           
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      </div>
      <style>
        {`
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }

        .pagination__link {
          margin: 0 4px;
          padding: 6px 12px;
          background-color: #f2f2f2;
          border: 1px solid #e6e6e6;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }

        .pagination__link:hover {
          background-color: #e6e6e6;
        }

        .pagination__link--disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .pagination__link--active {
          background-color: #007bff;
          color: #fff;
        }

        .pagination__ellipsis {
          margin: 0 4px;
          font-size: 14px;
          color: #333;
        }
        `}
      </style>
         </div> 
         </div>
        
        
         </div>

       
         <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
             <Form.Group controlId="gender">
            <Form.Label>gender</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>status</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
        
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






        <Modal show={showModal2} onHide={handleCloseModal2}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter  name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control-sm"
            />
          </Form.Group>
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
             <Form.Group controlId="field">
            <Form.Label>field</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your field"
              name="field"
              value={formData.field}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
        
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
              <Button variant="secondary" onClick={handleCloseModal2}  size="sm">
                Cancel
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>






         
        <Modal show={showModal3} onHide={handleCloseModal3}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
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
             <Form.Group controlId="gender">
            <Form.Label>gender</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>status</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-control-sm"
            /> </Form.Group>
        
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