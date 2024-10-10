import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash , faEdit ,faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { FaHistory } from 'react-icons/fa'; // Assurez-vous d'importer correctement l'icône d'historique depuis la bibliothèque react-icons



function UserHistory() {
  const [history, setHistory] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fonction pour récupérer le rôle de l'utilisateur connecté
    const fetchUserRole = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:9091/user/role', {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });

            setUserRole(response.data.role);
            setIsLoggedIn(true); // Marquer l'utilisateur comme connecté une fois que le rôle est récupéré
        } catch (error) {
            console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
        }
    };

    fetchUserRole();
}, [])



  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9091/user/history', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching user history:', error);
      }
    };

    fetchUserHistory();
  }, []); 

  const deleteHistoryEntry = async (entryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:9091/user/history/${entryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedEntries = history.filter(entry => entry._id !== entryId);
        setHistory(updatedEntries);
      } else {
        console.error('Error deleting history entry:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting history entry:', error);
    }
  };


  ///////////pagination 
    
  const handlePageClick = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);

  const historyPerPage = 7;

  const offset = currentPage * historyPerPage;
  const pageCount = Math.ceil(history.length / historyPerPage);

  return (
    <>
      <div className='container '> 
        <FaHistory className="ml-2 mx-3" size={30} style={{ verticalAlign: 'middle',  color:'grey'}} /> 
        <h3 className="d-inline-block mt-2">My Histories :</h3>
 
        <div className="col-12 col-lg-12  d-flex mt-5">
          <div className="card flex-fill">
            <div className="table-responsive">
              <table className="table table-hover my-0">
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                  <tr>
                    <th className="">Action</th>
                    <th className=" ">Timestamp</th>
                    <th className=""></th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(offset, offset + historyPerPage).map((entry) => (
                    <tr key={entry._id} className="table-row">
                      <td>{entry.action}</td>
                      <td>{entry.timestamp}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: 'pointer', marginRight: '5px', color: 'rgb(255, 99, 132)' }}
                          size="lg"
                          onClick={() => deleteHistoryEntry(entry._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
         {/* Pagination */}
         <div className='text-center '>
             <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap g-3 justify-content-center justify-content-md-between pt-5 pt-lg-7 ">
                        <div className="nk-pagination-col">
                          <p>Showing: <span>{offset + 1}-{Math.min(offset + historyPerPage, history.length)} of {history.length} </span></p>
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
    </>
  );
}

export default UserHistory;
