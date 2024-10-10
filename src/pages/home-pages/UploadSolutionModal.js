import { Modal, Button, Upload, message } from 'antd';
import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CountdownTimer from './timer'; // Assuming the timer.js file is located at '../timer'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UploadSolutionModal = ({ visible, onCancel, onUpload }) => {
  const { challengeId } = useParams();
  const [presentationValue, setpresentation] = useState(null);
    const [codeSourceValue, setcodeSource] = useState(null);
    const [datasetValue, setdataset] = useState(null);
    const [rapportValue, setrapport] = useState(null);
    const [demoValue, setdemo] = useState(null);
    const [outputValue, setOutputValue] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [output, setOutput] = useState(null);

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

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Sélectionnez le premier fichier du tableau des fichiers sélectionnés
  };
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

  useEffect(() => {
    // Appel de l'API pour rÃ©cupÃ©rer la valeur de output
    const fetchOutputValue = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/challenge/output/${challengeId}`); // Remplace YOUR_PORT par le port de ton serveur
        setOutputValue(response.data.outputValue);
      } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration de la valeur de output:', error);
      }
    };

    fetchOutputValue();
  }, []);
  

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
    } catch (error) {
        console.error('Error uploading PDF file:', error);
    }
};


  return (
    <Modal
      visible={visible}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faStopwatch} style={{ fontSize: '24px', marginRight: '10px' }} />
          <span>Remaining time to upload your solution:</span>
        </div>
      }
      onCancel={onCancel}
    >
      <CountdownTimer initialTime={timeRemaining} /> 

      <div>
                            <div className="form-group mt-4">
                            <div className="container mt-3">
  <div className="row">
    <div className="col-md-8"> {/* Utilisez col-md-8 pour l'input */}
      <input 
        type="number" 
        step="0.01" // Pour autoriser les décimales
        placeholder="Output Value (Float)" 
        className="form-control"
        value={output} // Vous pouvez utiliser l'état output pour lier cet input
        onChange={(e) => setOutput(parseFloat(e.target.value))} // Met à jour l'état output avec la nouvelle valeur
      />
    </div>
    <div className="col-md-4">
  <button 
    onClick={() => handleSaveScore(challengeId, output)} // Appel de la fonction handleSaveScore avec les paramètres requis
    className="btn btn-success"
  >
    Save 
  </button>
</div>
  </div>
</div>

{presentationValue ? (
      <>
     <div className="container">
      <div className="row">
      <div className="col-md-12"> 
          <div className="input-group mb-3"> 
              <input 
                  type="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  className="form-control" 
                  accept=".ppt, .pptx"
              />
              <button 
                  onClick={handleUploadPdf} 
                  className="btn btn-indigo" 
                  style={{ width: '170px', height: '50.6px' }}
              >
                  Upload Presentation
              </button>
          </div>
      </div>
  </div>
  </div>
  </>
    ) : (
      null
    )}


    
{codeSourceValue ? (
      <>
     <div className="container ">
      <div className="row">
      <div className="col-md-12"> 
          <div className="input-group mb-3"> 
              <input 
                  type="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  className="form-control" 
                  accept=".py"
              />
              <button 
                  onClick={handleUploadPdf} 
                  className="btn btn-indigo" 
                  style={{ width: '170px', height: '50.6px' }}
              >
                  Upload Python
              </button>
          </div>
      </div>
  </div>
  </div>
  </>
    ) : (
      null
    )}


    
{demoValue ? (
      <>
     <div className="container">
      <div className="row">
      <div className="col-md-12"> 
          <div className="input-group mb-3"> 
              <input 
                  type="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  className="form-control" 
                  accept="video/*, image/*"
              />
              <button 
                  onClick={handleUploadPdf} 
                  className="btn btn-indigo" 
                  style={{ width: '170px', height: '50.6px' }}
              >
                  Upload Image ou vidÃ©o
              </button>
          </div>
      </div>
  </div>
  </div>
  </>
    ) : (
      null
    )}

    
{datasetValue ? (
      <>
     <div className="container ">
      <div className="row">
      <div className="col-md-12"> 
          <div className="input-group mb-3"> 
              <input 
                  type="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  className="form-control" 
                  accept=".csv, .json"
              />
              <button 
                  onClick={handleUploadPdf} 
                  className="btn btn-indigo" 
                  style={{ width: '170px', height: '50.6px' }}
              >
                  Upload dataset
              </button>
          </div>
      </div>
  </div>
  </div>
  </>
    ) : (
      null
    )}

        
{rapportValue ? (
      <>
     <div className="container">
      <div className="row">
      <div className="col-md-12"> 
          <div className="input-group mb-3"> 
              <input 
                  type="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  className="form-control" 
                  accept=".pdf"
              />
              <button 
                  onClick={handleUploadPdf} 
                  className="btn btn-indigo" 
                  style={{ width: '170px', height: '50.6px' }}
              >
                  Upload Rapport
              </button>
          </div>
      </div>
  </div>
  </div>
  </>
    ) : (
      null
    )}
</div>
  </div>
 


                  
    </Modal>
  );
};

export default UploadSolutionModal;
