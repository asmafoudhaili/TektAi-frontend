import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioButton, NioCard, NioIcon,NioMedia, NioSection } from '../../../components';
import FeaturesContent from '../../../components/PageComponents/Homepages/BusinessDigital/FeaturesContent/FeaturesContent';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Modal from '../modalterms';
import CreateTeamDialog from '../modalteam';
import InviteMembersDialog from '../modalinvite';
import { Form, Input, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment ,faArrowLeft, faArrowRight ,faStopwatch ,faCheck,faTimesCircle  } from '@fortawesome/free-solid-svg-icons';
import Heart from "react-heart"
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../../context/SocketProvider/SocketProvider';

import UploadSolutionModal from '../UploadSolutionModal'
function ChallengeDetails({ onParticipate }) {
  const {socket, connectedUser} = useContext(SocketContext)
  const { Option } = Select;
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [teamCreated, setTeamCreated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState([]); // Déclaration de users
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showParticipationModal, setShowParticipationModal] = useState(false);

  const [presentationValue, setpresentation] = useState(null);
    const [codeSourceValue, setcodeSource] = useState(null);
    const [datasetValue, setdataset] = useState(null);
    const [rapportValue, setrapport] = useState(null);
    const [demoValue, setdemo] = useState(null);
    const [output, setOutput] = useState(null);

    const [participationType, setParticipationType] = useState(null);
    const [hasParticipated, setHasParticipated] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);


  
    const [showUploadSolutionModal, setShowUploadSolutionModal] = useState(false);
  

    useEffect(() => {
      // Vérifiez s'il y a un état de participation enregistré dans le localStorage
      const participatedState = localStorage.getItem(`hasParticipated_${challengeId}`);
      if (participatedState === 'true') {
        setHasParticipated(true);
      } else {
        setHasParticipated(false);
      }
    }, [challengeId]);
    
    useEffect(() => {
      // Récupérez les données de l'équipe depuis localStorage
      const teamCreatedState = localStorage.getItem(`teamCreated_${challengeId}`);
      const createTeamState = localStorage.getItem(`createTeamState_${challengeId}`);
    
      if (teamCreatedState) {
        const teamData = JSON.parse(teamCreatedState);
        // Mettez à jour le nom de l'équipe dans l'état
        setTeamName(teamData.teamname);
      }
    
      // Vérifiez l'état du bouton
      if (createTeamState === 'created') {
        setTeamCreated(true); // Mettez à jour l'état du bouton
      }
    
    }, [challengeId]); // Assurez-vous que challengeId est inclus dans les dépendances si c'est un paramètre externe
    
    

    useEffect(() => {
      // Vérifiez s'il y a un état de participation enregistré dans le localStorage
      const participatedState = localStorage.getItem(`hasParticipated_${challengeId}`);
      if (participatedState === 'true') {
        setHasParticipated(true);
      } else {
        setHasParticipated(false);
      }
    }, [challengeId]);
    
    useEffect(() => {
      // Récupérez les données de l'équipe depuis localStorage
      const teamCreatedState = localStorage.getItem(`teamCreated_${challengeId}`);
      const createTeamState = localStorage.getItem(`createTeamState_${challengeId}`);
    
      if (teamCreatedState) {
        const teamData = JSON.parse(teamCreatedState);
        // Mettez à jour le nom de l'équipe dans l'état
        setTeamName(teamData.teamname);
      }
    
      // Vérifiez l'état du bouton
      if (createTeamState === 'created') {
        setTeamCreated(true); // Mettez à jour l'état du bouton
      }
    
    }, [challengeId]); // Assurez-vous que challengeId est inclus dans les dépendances si c'est un paramètre externe
    
    


  useEffect(() => {
    const fetchChallengeById = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9091/challenge/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const fetchedChallenge = response.data;
        setChallenge(fetchedChallenge);
        console.log(response.data.team); 
        console.log(response.data.solo); 
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    };
  
    fetchChallengeById();
  }, [challengeId]);
  
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch teams data from an API or localStorage
        const response = await axios.get(`http://localhost:9091/challenge/team/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeams(response.data.teams); // Update teams state with fetched data
        localStorage.setItem(`teams_${challengeId}`, JSON.stringify(response.data.teams));
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
  
    fetchTeams();
  }, [challengeId]);
  


  const handleParticipate = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const response = await axios.post(
      `http://localhost:9091/challenge/${challengeId}/participate`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data.message);
    // Mettre à jour l'état local et dans le localStorage
    setHasParticipated(true);
    localStorage.setItem(`hasParticipated_${challengeId}`, 'true');

    // Vous pouvez également appeler une fonction de rappel pour effectuer des actions supplémentaires si nécessaire
    if (typeof onParticipate === 'function') {
      onParticipate(challengeId);
    } else {
      console.error('onParticipate is not a function');
    }
  } catch (error) {
    console.error('Error participating in challenge:', error);
  }
};

  

  


  const handleCreateTeamDialogOpen = () => {
    if (teamCreated === null) {
      console.log("Checking team creation status...");
    } else if (teamCreated) {
      console.log("You have already created a team for this challenge");
    } else {
      setShowCreateTeamModal(true);
    }
  };

  const handleCreateTeam = async (teamData) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:9091/team`,
        { ...teamData, challengeId: challengeId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log(response.data);
  
      // Update teams state correctly
      setTeams(prevTeams => prevTeams ? [...prevTeams, response.data.data] : [response.data.data]);
  
      // Indiquer que l'équipe a été créée
      localStorage.setItem(`teamCreated_${challengeId}`, JSON.stringify(response.data.data)); // Sauvegarder l'équipe créée
      setTeamCreated(response.data.data); // Mettez à jour teamCreated avec la nouvelle équipe créée
  
      setShowCreateTeamModal(false);
  
      // Mettez à jour l'état du bouton dans localStorage
      localStorage.setItem(`createTeamState_${challengeId}`, 'created');
      setTeamName(teamData.teamname); // Assurez-vous que teamname est la propriété correcte dans teamData
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };
  
  
  // Mettez à jour la fonction handleRemoveTeam pour qu'elle ne supprime que la teamCreated
  const handleRemoveTeam = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      // Make API call to remove the team created by the user
      const response = await axios.delete(
        `http://localhost:9091/team/${teamCreated._id}`, // Endpoint to remove teamCreated
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log(response.data);
  
      // Update local state
      setTeamCreated(false);
  
      // Remove teamCreated key from local storage
      localStorage.removeItem(`teamCreated_${challengeId}`);
    } catch (error) {
      console.error('Error removing team:', error);
    }
  };

  const handleOpenInviteModal = () => {
    setShowInviteMembersModal(true);
  };

  const handleSendInvitationEmail =  (emailList) => {
  try {

    const teamId = localStorage.getItem(`teamId_${challengeId}`);
    
    // Utilisez l'équipe créée par l'utilisateur directement
    if (!teamCreated) {
      console.error('No team created');
      return;
    }

    console.log("Attempting to send invitation email with email list:", emailList);
    console.log("Team ID:", teamCreated._id); // Ajoutez ce log pour vérifier la valeur de teamCreated._id
    console.log("Email list:", emailList); // Ajoutez ce log pour vérifier la valeur de l'email list

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

     socket.emit("invitationSent", { userId: connectedUser.id, emails: emailList, teamId: teamCreated._id, challengeId },(res)=>{
      console.log(res)
    })

    //console.log("Invitation email response:", response.data);
    //console.log(response.data.message);
  } catch (error) {
    console.error('Error sending invitation email:', error);
  }
};


  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setSelectedFile(file);

  };

  // useEffect(() => {
  //   // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
  //   const fetchOutputValue = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:9091/challenge/output/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
  //       setOutputValue(response.data.outputValue);
  //     } catch (error) {
  //       console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
  //     }
  //   };

  //   fetchOutputValue();
  // }, []);
  

  useEffect(() => {
    // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
    const fetchpresentation = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/challenge/presentation/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
        setpresentation(response.data.presentationValue);
      } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
      }
    };

    fetchpresentation();
  }, []);

  useEffect(() => {
    // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
    const fetchcodeSource = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/challenge/codeSource/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
        setcodeSource(response.data.codeSourceValue);
      } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
      }
    };

    fetchcodeSource();
  }, []);



  useEffect(() => {
    // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
    const fetchdataset = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/challenge/dataset/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
        setdataset(response.data.datasetValue);
      } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
      }
    };

    fetchdataset();
  }, []);

  useEffect(() => {
    // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
    const fetchrapport = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/challenge/rapport/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
        setrapport(response.data.rapportValue);
      } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
      }
    };

    fetchrapport();
  }, []);

  useEffect(() => {
    // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
    const fetchdemo = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/challenge/demo/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
        setdemo(response.data.demoValue);
      } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
      }
    };

    fetchdemo();
  }, []);
  
  const handleUploadPdf = async () => {
    try {
        const token = localStorage.getItem('token'); // RÃ©cupÃ©rer le token JWT
        const formData = new FormData();
        formData.append('file', selectedFile); // Utilisez 'file' comme clÃ©
        console.log(formData);
        console.log(challengeId);
        console.log("Uploading file:", selectedFile);
        const response = await axios.post(
            `http://localhost:9091/challenge/${challengeId}/solutions`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 

                }
            }
        );
        console.log(response.data.message);
        console.log("Response from upload PDF:", response.data);

    } catch (error) {
        console.error('Error uploading PDF file:', error);
    }
};

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [active, setActive] = useState(false)

   useEffect(() => {
     const fetchTimeRemaining = async () => {
       try {
         const response = await axios.get(`http://localhost:9091/challenge/${challengeId}/time-remaining`);
         setTimeRemaining(response.data);
      } catch (error) {
        console.error('Error fetching time remaining:', error);
      }
     };


     fetchTimeRemaining();

     const intervalId = setInterval(fetchTimeRemaining, 1000);

    return () => clearInterval(intervalId);


   }, []);
  const [isFavorite, setIsFavorite] = useState(false);

  const [data, setData] = useState({

    
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    status: '',
    country: '',
    imageUser: 'images/no_pdp.jpg',
    role: '',
    //favoriteChallenges:[],

    
  });
  useEffect(() => {
    // Function to fetch user data
    const fetchUserId = async () => {
      try {
       
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9091/user/getProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const fetchedUserId = response.data._id; // Récupérer l'ID de l'utilisateur depuis la réponse
        setUserId(fetchedUserId);
        // console.log('userId:',userId);
        const userData = response.data;
        
        const localIsFavorite = localStorage.getItem('isFavorite');
        if (localIsFavorite !== null) {
          setIsFavorite(JSON.parse(localIsFavorite));
        } else {
          // Si l'utilisateur a des défis aimés dans la base de données, définissez l'état en conséquence
          if (userData.likedChallenges.includes(challenge._id)) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

   
     
  // console.log("challengeId  :", challengeId);
  
  
    const handleLike = async () => {
      try {
        
        if (isFavorite) {

        await axios.delete(`http://localhost:9091/user/${userId}/unlike/${challenge._id}`);
        setIsFavorite(false); // Mettez à jour l'état pour refléter le changement
      } else {
        await axios.post(`http://localhost:9091/user/${userId}/like/${challenge._id}`);
        setIsFavorite(true); // Mettez à jour l'état pour refléter le changement

      }
      localStorage.setItem('isFavorite', JSON.stringify(!isFavorite));

        // Mettre à jour l'état ou rafraîchir la liste des défis
      } catch (error) {
        console.error('Erreur lors de la tentative de like du défi', error);
      }};


  const navigate = useNavigate();


const discussionClick = async (createdBy) => {
  navigate(`/discussion/${createdBy._id}`)}

  const handleSaveScore = async (challengeId, output) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé dans le stockage local');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:9091/challenge/score/${challengeId}`,
        { score: output },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Score ajouté avec succès au défi');
      // Gérer la réponse du serveur ici si nécessaire
    } catch (error) {
      console.error('Échec lors de l\'ajout du score au défi:', error);
      // Gérer les erreurs ici si nécessaire
    }
  };
  // Function to handle opening the Upload Solution modal
const handleOpenUploadSolutionModal = () => {
  setShowUploadSolutionModal(true);
};

// Function to handle closing the Upload Solution modal
const handleCloseUploadSolutionModal = () => {
  setShowUploadSolutionModal(false);
};

const handleUploadSolution = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    // Perform the file upload
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await axios.post(
      `http://localhost:9091/challenge/${challengeId}/solutions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log(response.data.message);
    // Close the modal after successful upload
    setShowUploadSolutionModal(false);
  } catch (error) {
    console.error('Error uploading solution:', error);
  }
};
  
  return (
    <AppLayout variant={4} title="ChallengeDetails" rootClass="layout-3">
      <NioSection className="pt-120 pt-lg-160 bg-purple-100 " masks={["shape-18"]} py={false}>
      {challenge && (
          <div style={{ backgroundColor: '#ffff', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.2)' }}>
            <NioCard.Body>
            <div className='text-start' style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
    <div>
    <NioButton
    label={<FaHeart />}
    onClick={handleLike}
    className={isFavorite ? "btn-red" : "btn-outline-red"}
    style={{ fontSize: '1.3rem' }}
  /> </div>
<div>   <NioMedia size="lg" icon="emails"  onClick={()=>discussionClick(challenge.createdBy)} variant="success-soft" className="mb-4" style={{ fontSize: '0.8rem', width: '45px', height: '45px' }} />
 </div>
 <div>
 <div>
  {challenge.team && challenge.solo ? (
    <div>
      {hasParticipated ? (
        <NioButton
          label="Upload Solution"
          onClick={handleOpenUploadSolutionModal}
       className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      ) : (
        <NioButton
          label="Participate Now"
          onClick={handleParticipate}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      )}
      {!teamCreated ? (
        <NioButton
          label="Create Team"
          onClick={handleCreateTeamDialogOpen}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      ) : (
        <NioButton
          label="Invite Members"
          onClick={() => setShowInviteMembersModal(true)}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      )}
    </div>
  ) : challenge.team ? (
    <div>
      {hasParticipated ? (
        <NioButton
          label="Upload Solution"
          onClick={handleOpenUploadSolutionModal}
                    className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      ) : (
        <NioButton
          label="Participate Now"
          onClick={handleParticipate}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      )}
      {!teamCreated ? (
        <NioButton
          label="Create Team"
          onClick={handleCreateTeamDialogOpen}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      ) : (
        <NioButton
          label="Invite Members"
          onClick={() => setShowInviteMembersModal(true)}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      )}
    </div>
  ) : (
    <div>
      {hasParticipated ? (
        <NioButton
          label="Upload Solution"
          onClick={handleOpenUploadSolutionModal}
                    className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      ) : (
        <NioButton
          label="Participate Now"
          onClick={handleParticipate}
          className="btn btn-indigo"
          style={{ fontSize: '0.8rem' }}
        />
      )}
    </div>
  )}
</div>


<UploadSolutionModal 
  visible={showUploadSolutionModal}
  onCancel={handleCloseUploadSolutionModal}
  onFileChange={handleFileChange}
  onUploadSolution={handleUploadSolution}
/>

    </div>
  </div>
</div>



              <div className="pb-5 mb-5 border-bottom">
                <Row className="align-items-center justify-content-md-between gap-0">
                  <Col md={9} lg={8}>
                    <div>
                      <h5 className="mb-2">{challenge.title}</h5>
                      <div className="d-flex gap-2 align-items-center text-indigo mb-2">
                        <p className="d-flex align-items-center gap-1 mb-0">
                          {/* <NioIcon name="award" />
                          <span className="fs-14 fw-semibold text-uppercase text-nowrap ">{challenge.prizes}</span>
                        </p> - <p className="d-flex align-items-center gap-1 mb-0"> */}
                          <NioIcon name="clock-fill" />
                          <span className="fs-14 fw-semibold text-uppercase text-nowrap ">
                            {new Date(challenge.endDate).toLocaleDateString("fr-FR")}
                          </span>
                        </p> -

                        <p className="d-flex align-items-center gap-1 mb-0">
                          <NioIcon name="user-fill" />
                          <span className="fs-14 fw-semibold text-uppercase text-nowrap ">{challenge.participantsCount}</span>
                        </p> -
                        <p className="d-flex align-items-center gap-1 mb-0">
                          <NioIcon name="user-group-fill" />
                          <span className="fs-14 fw-semibold text-uppercase text-nowrap ">{challenge.teamsCount}</span>
                        </p>
                      </div>
                    </div>
                   
                  </Col>
                </Row>
              </div>
              <div className='col-3'></div>
              <div className='col-9'>
               

              <div>
      {/* Affichez le nom de l'équipe */}
      <h5>Teams</h5>
      <ul>
        {/* Utilisez teamName pour afficher le nom de l'équipe */}
        <li>{teamName}</li>
      </ul>
    </div>
              </div>
 
             

              <CreateTeamDialog visible={showCreateTeamModal} onCancel={() => setShowCreateTeamModal(false)} onCreate={handleCreateTeam} />
              <InviteMembersDialog visible={showInviteMembersModal} onCancel={() => setShowInviteMembersModal(false)} onSendInvitation={handleSendInvitationEmail} />
            </NioCard.Body>
          </div>
        )}
        <FeaturesContent challengeData={challenge} />
        
      </NioSection>
    </AppLayout>
  );
}
export default ChallengeDetails;

