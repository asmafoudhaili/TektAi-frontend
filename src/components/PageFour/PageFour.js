import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioCard, NioBrand } from '../../components';
import { jwtDecode } from 'jwt-decode'; // Importez jwtDecode pour décoder le JWT
import ReCAPTCHA from "react-google-recaptcha"; // Importez le composant ReCAPTCHA
import { useNavigate } from 'react-router-dom';  // Importez useNavigate pour la redirection

const PageFour = ({ formData, onButtonClick }) => {
  const [userId, setUserId] = useState(null); // State pour stocker l'ID de l'utilisateur
  const [isCaptchaValid, setIsCaptchaValid] = useState(false); // State pour vérifier la validité du captcha
  const [contractAccepted, setContractAccepted] = useState(false); // State to track if contract is accepted
  const handleContractChange = (e) => {
    setContractAccepted(e.target.checked);
  };
  const navigate = useNavigate();  // Utilisez useNavigate pour la redirection

  useEffect(() => {
    // Récupérez le token JWT depuis le local storage
    const token = localStorage.getItem('token');
    console.log('token:', token);

    // Vérifiez si le token existe
    if (token) {
      // Décodage du token pour obtenir l'ID de l'utilisateur
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id); // Stockez l'ID de l'utilisateur dans le state
      console.log(decodedToken._id);
    }
  }, []); // Exécutez ce bloc de code une seule fois après le rendu initial du composant

  const handleCaptchaChange = (value) => {
    setIsCaptchaValid(!!value);
  };

  const handleSubmit = async () => {
    console.log('Submitting form...');

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      console.log('Sending request to server...');
      const response = await fetch('http://localhost:9091/challenge/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData, // Envoyer toutes les données du formulaire, même si elles sont incomplètes
          userId: userId,
        }),
      });

      console.log('Response received:', response);

      if (!response.ok) {
        throw new Error('Failed to create challenge');
      }
      navigate('/Allchallenges');

      // Proceed with any necessary actions after successful submission
      onButtonClick('pagefour');
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };
  const moveToPreviousPage = () => {
    onButtonClick('pagethree'); // Appeler la fonction onButtonClick du parent avec le nom de la page 'pagethree'
  };
  

  return (
    <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ width: 'auto' }}>
      <NioCard.Body>
      <div className="form-logo mb-3 text-center">
          <NioBrand logo="s2" variant="dark" imageRoot="../images/" size="150px" />
        </div>
        <div className="contract-policy" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <h4>Prize Fulfillment Clause</h4>
          <p><span style={{ fontWeight: 'bold' }}>Transparency:</span> The Company agrees to maintain transparency throughout the competition process, providing regular updates to participants regarding prize fulfillment timelines, winner selection criteria, and any changes to the competition rules or guidelines.</p>
          <p><span style={{ fontWeight: 'bold' }}>Prize Description:</span> The Company agrees to provide the designated prize to the winner(s) of the competition, as described in the competition rules and guidelines. The prize may be monetary or non-monetary and shall be clearly specified in the competition details provided by the Company.</p>
          <p><span style={{ fontWeight: 'bold' }}>Monetary Prize: </span> In the event that the prize is monetary, the Company agrees to pay the designated prize amount of to the winner(s) within 30 days of the competition's conclusion and the determination of the winner(s). Payment shall be made in the form of check, wire transfer, etc..</p>
          <p><span style={{ fontWeight: 'bold' }}>Non-Monetary Prize:</span> If the prize is non-monetary, the Company agrees to provide the designated prize item, experience, or service to the winner(s) within 30 days of the competition's conclusion and the determination of the winner(s). The Company shall ensure that the non-monetary prize is delivered or made available to the winner(s) in accordance with the competition rules and guidelines.</p>
          <p><span style={{ fontWeight: 'bold' }}>Prize Value: </span> The Company acknowledges that the prize, whether monetary or non-monetary, has a designated value as specified in the competition rules and guidelines. The Company agrees to provide a prize of equivalent value to the winner(s) as promised.</p>
          <p><span style={{ fontWeight: 'bold' }}>Payment Guarantee:</span> The Company hereby guarantees that the prize, whether monetary or non-monetary, will be awarded to the winner(s) as specified in the competition details. The Company acknowledges that failure to fulfill this obligation may result in legal action and financial penalties.</p>
          <p><span style={{ fontWeight: 'bold' }}>Alternative Dispute Resolution: </span>In the event of any dispute regarding the prize payment or fulfillment, the Participant(s) and the Company agree to attempt to resolve the dispute through mediation or arbitration before pursuing legal action. Both parties shall mutually agree on a neutral third party to facilitate the alternative dispute resolution process.</p>
          <p><span style={{ fontWeight: 'bold' }}>Legal Recourse: </span>In the event of any dispute regarding the prize payment or fulfillment, the Participant(s) reserve the right to pursue legal action to enforce the terms of this agreement and recover the prize or its equivalent value owed.</p>

          </div>
  
          {/* Privacy Policy Checkbox */}
         

          <div className="row " style={{ marginTop: '15px' }}>
  <div className="col-auto">
  <input
              type="checkbox"
              id="contractAccepted"
              checked={contractAccepted}
              onChange={handleContractChange}
            />
  </div>
  <div className="col">
  <label htmlFor="contractAccepted" style={{ fontWeight: 'bold' }}>I accept all the prize fulfillment clause</label>
  </div>
</div>

        <Row className="g-gs">
          <Col lg={12} className="d-flex justify-content-center">
            <div className="form-group">
              {/* Ajoutez le composant ReCAPTCHA ici */}
              <ReCAPTCHA
                sitekey="6Ldl_IopAAAAAGqFfTC7gEmxqOhoLnPidP96OeGN"
                onChange={handleCaptchaChange}
              />
              <div style={{ marginTop: '20px' }}>
                <NioButton
                  onClick={handleSubmit}
                  label="Submit"
                  className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ width: '100%', backgroundColor: '#664DE5', border: 'none', color: 'white' }}
                  disabled={!isCaptchaValid || !contractAccepted } // Désactivez le bouton si le captcha n'est pas valide
                />
              </div>
           
            </div>
          </Col>
          <  Col className="d-flex justify-content-start">
            <div className="form-group">
              <NioButton
                onClick={moveToPreviousPage}
                label="<<"
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{ width: '100%', backgroundColor: '#664DE5', border: 'none', color: 'white' }}
              />
            </div>
          </Col>
        </Row>
      </NioCard.Body>
    </NioCard>
  );
};

export default PageFour;
