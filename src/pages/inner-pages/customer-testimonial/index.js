import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioIcon, NioSection, NioMedia, NioCard, NioSubscribeField, NioBrand } from '../../../components';

// Renommez votre composant en commençant par une majuscule
function Index() {
  const columns = [
    {
      name: <span style={{fontWeight: 'bold', color: 'lightgreen' }}>Id</span>, // Changer la couleur du texte du nom de la colonne

      selector: row => row.id,
      cell: row => <div style={{ color: 'lightgreen' }}>{row.id}</div> 
     
     
    },
    {
      name: <span style={{ fontWeight: 'bold',color: 'blue' }}>First Name</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.firstName
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>Last Name</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.lastName
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>Email</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.email
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>Address</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.address
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>City</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.city
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>Gender</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.gender
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>Status</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.status
    },
    {
      name: <span style={{fontWeight: 'bold', color: 'blue' }}>role</span>, // Changer la couleur du texte du nom de la colonne
      selector: row => row.role
    }
    // Ajoutez d'autres colonnes si nécessaire...
  ];

  const data = [
    {
      id: 1,
      firstName: 'salma',
      lastName: 'salma',
      email: 'salma@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'admin'
    },
    {
      id: 2,
      firstName: 'anna',
      lastName: 'anna',
      email: 'anna@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'admin'

    },
    {
      id: 3,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'admin'

    },
    {
      id: 4,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'admin'

    },
    {
      id: 5,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 6,
      firstName: 'salma',
      lastName: 'salma',
      email: 'salma@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 7,
      firstName: 'anna',
      lastName: 'anna',
      email: 'anna@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'


    },
    {
      id: 8,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 9,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 10,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 11,
      firstName: 'salma',
      lastName: 'salma',
      email: 'salma@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id:12,
      firstName: 'anna',
      lastName: 'anna',
      email: 'anna@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 13,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 14,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    },
    {
      id: 15,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée',
      role:'user'

    }
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newData = data.filter(row => {
      return row.role.toLowerCase().includes(searchTerm);
    });
    setRecords(newData);
  }

  return (
    <AppLayout title="About" rootClass="layout-1">
     

      <Container>
        <div className='container mt-9'>
          <div className='text-center' >
            <input type="text" onChange={handleFilter}  style={{ border: '2px solid black', borderRadius: '5px', fontWeight: 'bold' }}/>
          </div>
          <div className="border p-3 bg-gradient-16 rounded-4 ">
            <div className="table-responsive rounded-4">
              <DataTable
                columns={columns}
                data={records}
                className="table table-bordered"
                selectableRows
                fixedHeader
              />
            </div>
          </div>
        </div>
        <div className='text-center mt-3'>
          <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >Delete</button>
          <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >Add</button>
          <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >Update</button>
        </div>
      </Container>
    </AppLayout>
  );
}

export default Index;
