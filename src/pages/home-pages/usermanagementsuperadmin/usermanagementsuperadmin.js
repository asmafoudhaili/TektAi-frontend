import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row ,Table} from 'react-bootstrap';
import  { useState } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';

import {Bar,Doughnut,Line} from 'react-chartjs-2';


// layout 

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';

export default function UserManagementSuperAdmin() {
  const columns = [
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Id</span>, 

      selector: row => row.id,
      cell: row => <div style={{ fontSize: '16px '}}>{row.id}</div> 
     
     
    },
    {
      name: <span style={{ fontWeight: 'bold',color: 'darkblue' ,fontSize: '16px '}}>First Name</span>, 
      selector: row => row.firstName,
      
      cell: row => <div style={{ fontSize: '15px ' }}>{row.firstName}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Last Name</span>, 
      selector: row => row.lastName,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.lastName}</div> 

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
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Status</span>, 
      selector: row => row.status,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.status}</div> 

    }
  ];

//company: 
const columnn = [
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Id</span>, 

    selector: row => row.id,
    cell: row => <div style={{ fontSize: '16px '}}>{row.id}</div> 
   
   
  },
  {
    name: <span style={{ fontWeight: 'bold',color: 'darkblue' ,fontSize: '16px '}}> Name</span>, 
    selector: row => row.firstName,
    
    cell: row => <div style={{ fontSize: '15px ' }}>{row.firstName}</div> 

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
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>password</span>, 
    selector: row => row.gender,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.pasword}</div> 

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


const dataa = [
  {
    id: 1,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 2,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 3,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 4,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 5,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 6,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 7,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 8,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 9,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
  {
    id: 10,
    firstName: 'salma',
    phone: 'salma',
    email: 'salma@gmail.com',
    address: 'rades',
    field: 'rades',
    pasword: '123',
    city: 'rades',
    need: 'femme',
    description: 'mariée'
  },
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
      status: 'mariée'
    },
    {
      id: 2,
      firstName: 'anna',
      lastName: 'anna',
      email: 'anna@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 3,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 4,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 5,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 6,
      firstName: 'salma',
      lastName: 'salma',
      email: 'salma@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 7,
      firstName: 'anna',
      lastName: 'anna',
      email: 'anna@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 8,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 9,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    },
    {
      id: 10,
      firstName: 'sali',
      lastName: 'sali',
      email: 'sali@gmail.com',
      address: 'rades',
      city: 'rades',
      gender: 'femme',
      status: 'mariée'
    }
  ];
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

  
  return (

    <AppLayout variant={4} title="UserManagementSuperAdmin" rootClass="layout-3">

      <section className="nk-banner nk-banner-collab">
      
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-banner-content">
      <div className='container' style={{ width: '50%', float: 'left' }}>
      <div className="border p-1 bg-gradient-18 mt-5 rounded-4">

      <div className='card' style={{ width: '100%', padding: '10px' }}>
        <Bar data={ {labels:['Janvier', 'février','mars' ,'avril'],
    datasets:[
      {
        label:"nombre d'utilisateur par mois",
        data:[150, 200 ,175 , 220],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1},],}
  }
         />
      </div>
   </div>
   <div className="border p-1 bg-gradient-18 mt-5 rounded-4">

      <div className='card' style={{ width: '100%', padding: '10px' }}>
        <Line data={ {labels:['Janvier', 'février','mars' ,'avril','mai','juin','juillet','aout'],
    datasets:[
      {
        label:"nombre d'utilisateur par mois",
        data:[150, 200 ,175 , 220,500,130,146,210,320],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1},],}
  }
         />
      </div>
   </div>
      </div>
      <div className='container ' style={{ width: '50%', float: 'left' }}>
      <div className="border p-1 bg-gradient-18 mt-5 rounded-4">

      <div className='card' style={{ width: '100%', padding: '15px' }}>
        <Doughnut data={ {labels:['company', 'challenged'],
    datasets:[
      {
        label:"company and challenged",
        data:[250, 500 ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', 
          'rgba(153, 102, 255, 0.2)',
        
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)',
       
        ],
        borderWidth: 1}, ], }
      }
         />
      </div>
      
   </div>
      </div>
      </div>
      <div className='container ' style={{ width: '50%', float: 'right' }}>
      <div className='row'>
        
      <div className='col-12 '>

        
            <div className=' mt-7 ' >
       
          <div className=' mt-3 text-center'>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger  text-white fw-semibold mb-2 mt-5  " >Delete</button>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2 mx-1" >Add</button>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2 " >Update</button>
          <input type="text  mx-1 " className='mx-8 ' onChange={handleFilter}  style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>

        </div>
          <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
            
            <div className="table-responsive rounded-4 ">
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
          </div>
          </div>
</div>

               <div className='col-6'>
            
                 <div className=' mt-5'>
        
                    <div className='container text-center '>
                     <div className=' mt-3'>
           <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger  text-white fw-semibold mb-2 mt-5  ">Delete</button>
           <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2 mx-1 " >Add</button>
           <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2 " >Update</button>
           <input type="text mx-1 " className='mx-8' onChange={handleFilter}  style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>
 
         </div>
         </div>
           <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
             
             <div className="table-responsive rounded-4 ">
               <DataTable
                 columns={columnn}
                 data={dataaa}
                 className="table table-bordered"
                 selectableRows
                 fixedHeader
               />
             </div>
               
           </div>
         </div> 
         </div>
        
        
            
         <div className=' mt-7 ' >
          
       
          <div className=' mt-3 text-center'>
            <div>
          <a className='text-left mx-12'>liste Admin</a></div>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger  text-white fw-semibold mb-2 mt-5  " >Delete</button>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2 mx-1" >Add</button>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2 " >Update</button>
          <input type="text  mx-1 " className='mx-8 ' onChange={handleFilter}  style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>

        </div>
          <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
            
            <div className="table-responsive rounded-4 ">
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
         </div>

       
      

       
          
      </section>
     

    </AppLayout >
  )
}

