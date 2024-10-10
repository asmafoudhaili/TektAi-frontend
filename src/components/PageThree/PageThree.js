import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard } from '../../components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

const PageThree = ({ formData, setFormData, onButtonClick }) => {
  
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isMonetaryAmount, SetIsMonetaryAmount] = useState(formData.isMonetaryAmount || false);
  const [showMonetaryInput, setShowMonetaryInput]=useState(false); 
  const[monetaryPrize, setMonetaryPrize]= useState(formData.monetaryPrize || 100) ;
  const [isUnmonetaryAmount, SetIsUnmonetaryAmount]=useState(formData.isUnmonetaryAmount || false);
  const [showUnmonetaryAmount, setShowUnmonetaryInput]=useState(false);

  const [internship, setInternship] = useState(false);
  const [jobOffer, setJobOffer] = useState(false);
  const [freelanceOpportunity, setFreelanceOpportunity] = useState(false);
  const [otherGift, setOtherGift] = useState(false);
  const [internshipDetails, setInternshipDetails] = useState({ period: '', post: '', place: '', salary: '' });
  const [jobOfferDetails, setJobOfferDetails] = useState({ period: '', post: '', place: '', salary: '' });
  const [freelanceDetails, setFreelanceDetails] = useState({ details: '', salary: '' });
  const [otherGiftDetails, setOtherGiftDetails] = useState({gift:''});
  const [sodexoPassMulti, setSodexoPassMulti] = useState(false);
  const [sodexoPassMultiValue, setSodexoPassMultiValue] = useState('');



  useEffect(() => {
    // Déstructuration des valeurs par défaut de formData
    const {
      isMonetaryAmount = true,
      isUnmonetaryAmount = false,
      internship = false,
      internshipDetails = { period: '', post: '', place: '', salary: '' },
      jobOffer = false,
      jobOfferDetails = { period: '', post: '', place: '', salary: '' },
      freelanceOpportunity = false,
      freelanceDetails = { details: '', salary: '' },
      sodexoPassMulti = false,
      sodexoPassMultiValue = { sodexoValue: '' }, 
      otherGift = false,
      otherGiftDetails = {gift:''},
    } = formData;
  
    // Mise à jour des états avec les valeurs par défaut
    SetIsMonetaryAmount(isMonetaryAmount);
    setShowMonetaryInput(isMonetaryAmount);
    SetIsUnmonetaryAmount(isUnmonetaryAmount);
    setShowUnmonetaryInput(isUnmonetaryAmount);
    setInternship(internship);
    setInternshipDetails(internshipDetails);
    setJobOffer(jobOffer);
    setJobOfferDetails(jobOfferDetails);
    setFreelanceOpportunity(freelanceOpportunity);
    setFreelanceDetails(freelanceDetails);
    setSodexoPassMulti(sodexoPassMulti);
    setSodexoPassMultiValue(sodexoPassMultiValue);
    setOtherGift(otherGift); 
    setOtherGiftDetails(otherGiftDetails);
  }, [formData]);
  

  const handleMonetaryAmount = (e) => {
    const newValue = e.target.checked;
    SetIsMonetaryAmount(newValue);
    setShowMonetaryInput(newValue);
    setFormData({
      ...formData,
      isMonetaryAmount: newValue,
    });
    
  };
  

  const handleMontaryPrizeChange = (event) => {
    const value = event.target.value ; 
    setMonetaryPrize(value); 
  }

  const handleUnmonetaryAmount = (e) => {
    const newValue = e.target.checked;
    SetIsUnmonetaryAmount(newValue);
    setShowUnmonetaryInput(newValue);
    setFormData({
      ...formData,
      isUnmonetaryAmount: newValue,
    });
  };

  const handleInternship = (e) => {
    const newValue = e.target.checked;
    setInternship(newValue);
  
    if (!newValue) {
      // Réinitialiser les détails du stage si la case n'est pas cochée
      setInternshipDetails({ period: '', post: '', place: '', salary: '' });
    }
  
    setFormData({
      ...formData,
      internship: newValue,
      // Sauvegarder les détails du stage dans formData
      internshipDetails: newValue ? internshipDetails : {},
    });
  };
  

  const handleJobOffer = (e) => {
    const newValue = e.target.checked ; 
    setJobOffer(newValue);

    if (!newValue) {

      setJobOfferDetails({ period: '', post: '', place: '', salary: '' }) ; 
    }
      setFormData ({
        ...formData,
        jobOffer : newValue,
        jobOfferDetails : newValue ? jobOfferDetails : {},

      });
  };

  const handlefreelance = (e) => {
    const newValue = e.target.checked ; 
    setFreelanceOpportunity(newValue); 

    if (!newValue){
       
      setFreelanceDetails({details: '', salary: ''}); 
    }
    setFormData ({
      ...formData,
      freelanceOpportunity : newValue,
      freelanceDetails : newValue ? freelanceDetails : {},

    });
  };
  
  
  const handlegift = (e) => {
    const newValue = e.target.checked;
    setOtherGift(newValue);
  
    if (!newValue){
      setOtherGiftDetails({gift:''}); 
    }
    setFormData({
      ...formData,
      otherGift: newValue,
      otherGiftDetails: newValue ? otherGiftDetails :{}, 
    });
  };
  
  


  const moveToPreviousPage = () => {
    onButtonClick('pagetwo');
  };

  // Handle moving to next page
  const moveToNextPage = () => {
    // Update form data with current page inputs
    setFormData({
      ...formData,
      monetaryAmount : isMonetaryAmount , 
      monetaryPrize : monetaryPrize , 
      unmonetaryAmount : isUnmonetaryAmount , 
      internship : internship,
      internshipDetails: internship ? internshipDetails : {},
      jobOffer : jobOffer , 
      jobOfferDetails : jobOffer ? jobOfferDetails : {}, 
      freelanceOpportunity : freelanceOpportunity , 
      freelanceDetails : freelanceOpportunity ? freelanceDetails : {},
      otherGift : otherGift , 
      otherGiftDetails : otherGift ? otherGiftDetails: {} , 

    });

    console.log ("monetary amount : "  ,isMonetaryAmount) ;
    console.log ("monetary prize:", monetaryPrize); 
    console.log ("unmonetary amount : "  ,isUnmonetaryAmount) ;
    console.log ("internship : ", internship);
    console.log("internship details : ", internshipDetails);
    console.log ("job offer : ", jobOffer);
    console.log("job offer details : ", jobOfferDetails);
    console.log("freelance opp:" , freelanceOpportunity); 
    console.log("freelance details : ", freelanceDetails);
    // console.log ("sodexo pass: " , sodexoPassMulti); 
    // console.log("sodexo value:" , sodexoPassMultiValue);
    console.log("other gift:", otherGift); 
    console.log("other gift details:", otherGiftDetails); 

    // Move to next page
    onButtonClick('pagefour');
  };

  return (
    <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ width: 'auto' }}>
      <NioCard.Body>
        <div className="form-logo mb-3 text-center">
          <NioBrand
            logo="s2"
            variant="dark"
            imageRoot="../images/"
            size="150px"
          />
        </div>

        <Row className="g-gs">
          <Col lg={12}>
            <div className="text-center"><h5>Prize Type</h5></div>
            <Row className="g-gs">
              <Col lg={6} className="d-flex justify-content-center">
                <FormGroup>
                <span style={{ fontSize: '0.75rem', color: 'gray' }}>Please fill in the prize amount for the challenge.</span>
                  <FormControlLabel
                    control={<Checkbox  checked={isMonetaryAmount} color="secondary" onChange={handleMonetaryAmount}/>}
                    label="Monetary"
                  />
                  {showMonetaryInput && (
                    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      <TextField
                        label="Amount"
                        value={monetaryPrize}
                        onChange={handleMontaryPrizeChange}
                        fullWidth
                        margin="dense"
                      />
                    </div>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6} className="d-flex justify-content-center">
                <FormGroup>
                <span style={{ fontSize: '0.75rem', color: 'gray' }}>Please specify the non-monetary gift for the challenge prize (e.g., gift cards, job offers).</span>
                  <FormControlLabel
                    control={<Checkbox checked={isUnmonetaryAmount} onChange={handleUnmonetaryAmount} color="secondary" />}
                    label="Non-monetary"
                  />
                  {showUnmonetaryAmount && (
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={internship} onChange={handleInternship} color="secondary" />}
                          label="Internship"
                        />
                        {internship && (
                          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            <TextField
                              label="Period"
                              value={internshipDetails.period}
                              onChange={(e) => setInternshipDetails({ ...internshipDetails, period: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Post"
                              value={internshipDetails.post}
                              onChange={(e) => setInternshipDetails({ ...internshipDetails, post: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Place"
                              value={internshipDetails.place}
                              onChange={(e) => setInternshipDetails({ ...internshipDetails, place: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Salary"
                              value={internshipDetails.salary}
                              onChange={(e) => setInternshipDetails({ ...internshipDetails, salary: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={jobOffer} onChange={handleJobOffer} color="secondary" />}
                          label="Job Offer"
                        />
                        {jobOffer && (
                          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            <TextField
                              label="Period"
                              value={jobOfferDetails.period}
                              onChange={(e) => setJobOfferDetails({ ...jobOfferDetails, period: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Post"
                              value={jobOfferDetails.post}
                              onChange={(e) => setJobOfferDetails({ ...jobOfferDetails, post: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Place"
                              value={jobOfferDetails.place}
                              onChange={(e) => setJobOfferDetails({ ...jobOfferDetails, place: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Salary"
                              value={jobOfferDetails.salary}
                              onChange={(e) => setJobOfferDetails({ ...jobOfferDetails, salary: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={freelanceOpportunity} onChange={handlefreelance} color="secondary" />}
                          label="Freelance Opportunity"
                        />
                        {freelanceOpportunity && (
                          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            <TextField
                              label="Details"
                              value={freelanceDetails.details}
                              onChange={(e) => setFreelanceDetails({ ...freelanceDetails, details: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                            <TextField
                              label="Salary"
                              value={freelanceDetails.salary}
                              onChange={(e) => setFreelanceDetails({ ...freelanceDetails, salary: e.target.value })}
                              fullWidth
                              margin="dense"
                            />
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={otherGift} onChange={handlegift} color="secondary" />}
                          label="Other Gift "
                        />
                        {otherGift && (
                          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            <TextField
                              label="Other Gift Details"
                              value={otherGiftDetails.gift}
                              onChange={(e) => setOtherGiftDetails({...otherGiftDetails, gift: e.target.value})}
                              fullWidth
                              margin="dense"
                            />
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  )}
                </FormGroup>
                
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '2rem' }}>
          <Col className="d-flex justify-content-start">
            <div className="form-group">
              <NioButton
                onClick={moveToPreviousPage}
                label="<<"
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{ width: '100%', backgroundColor: '#664DE5', border: 'none', color: 'white' }}
              />
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="form-group">
              <NioButton
                onClick={moveToNextPage}
                label=">>"
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{ width: '100%', backgroundColor: '#664DE5', border: 'none', color: 'white' }}
                // disabled={isNextDisabled}
              />
            </div>
          </Col>
        </Row>
      </NioCard.Body>
    </NioCard>
  );
};

export default PageThree;