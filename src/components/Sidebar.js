import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import NioBrand from './NioBrand/NioBrand';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUserShield, faChartBar ,faBars,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FaHistory, FaBars } from 'react-icons/fa';

function Sidebar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [isOpen, setIsOpen] = useState(false);
const toggle =()=>setIsOpen(!isOpen);
  
  
  
    useEffect(() => {
      const fetchUserRole = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get('http://localhost:9091/user/role', {
                  headers: {
                      Authorization: `Bearer ${token}`
                    }
              });
  
              setUserRole(response.data.role);
              setIsLoggedIn(true); 
          } catch (error) {
              console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
          }
      };
  
      fetchUserRole();
  }, [])


    const navigate = useNavigate();

    return (
        <div class="container">
        <div class="row flex-nowrap">
            <div class=" col-10 px-sm-6 px-0 bg-purple-300"  >
                <div class="d-flex flex-column align-items-center align-items-sm-start pb-3 mb-md-0 me-md-auto  pt-2 text-black min-vh-100 mt-3">
                <NioBrand logo="s2" variant="dark" imageRoot="../images/" size="150px" />
                {/* <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none">
                <img  className=' mx-2' src='/images/no_pdp.jpg' style={{ widTh: '40px', height: '35px', borderRadius: '50%' }} />
                      <strong class="fs-5 d-none d-sm-inline">Super Admin Dashboard</strong>
                </a> */}
                    <ul class="nav nav-pills flex-column mb-sm-auto  mb-0 align-items-center align-items-sm-start mt-5" id="menu">
                        <li class="nav-item">
                            <a  class="nav-link d-flex align-middle px-0" onClick={() => { navigate("/App2"); }}>
                            <FontAwesomeIcon icon={faChartBar} className="fs-4 me-2" />
                            <i class="fs-4 bi-house"></i> <span class="ms-0 d-none d-sm-inline">Statistics</span>
                            </a>
                        </li>
                      
                        <li>
                            <a onClick={() => { navigate("/listeUsers"); }} class="nav-link px-0 align-middle d-flex">
                            <FontAwesomeIcon icon={faList} className="fs-4 me-2" />
                             <i class="fs-4 bi-table"></i> <span class="ms-0 d-none d-sm-inline">list Users</span></a>
                        </li>
                        {isLoggedIn && userRole === 'superAdmin' && (
                <li>
                <a onClick={() => { navigate("/ListAdmin"); }} class="nav-link px-0 align-middle d-flex">
                <FontAwesomeIcon icon={faUserShield} className="fs-4 me-2" />
                <i class="fs-4 bi-people"></i> <span class="ms-0 d-none d-sm-inline">Admins</span> </a>
            </li>
                      )}
                     
                        <li>
                            <a onClick={() => { navigate("/SuperAdminHistory"); }} class="nav-link px-0  d-flex">
                            <FaHistory className="fs-4 me-2" />
                            <i class="fs-4 bi-people"></i> <span class="ms-0 d-none d-sm-inline">My History</span> </a>
                        </li>
                    </ul>
                    <hr style={{ margin: '30px auto', borderTop: '2px solid #ccc' ,width: '90%'}}/>
                    <div class="dropdown pb-4">
                        
                        <ul>
                        <div className="container-fluid p-0 mt-3">
            <button className=" nav-link px-0 align-middle" >
            <FontAwesomeIcon icon={faSignOutAlt} className="fs-4 me-2" onClick={() => {
                            navigate("/");
                        }} />

                <span className="fs-5" onClick={() => {
                            navigate("/");
                        }}>FrontOffice</span>
            </button>
               
            </div>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
}

export default Sidebar;