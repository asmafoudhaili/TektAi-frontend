import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard } from '../../components';
import FileUpload from '../FileUpload/FileUpload';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

const PageTwo = ({ formData, setFormData, onButtonClick, onFileUpload }) => {
 // State variables to manage form inputs
 const [evaluationmetric, setEvaluationMetric] = useState(formData.evaluationmetric || '');
 const [submissionfiledescription, setSubmissionFileDescription] = useState(formData.submissionfiledescription || '');
 const [isNextDisabled, setIsNextDisabled] = useState(true);
 const [isExpertRanking, setIsExpertRanking] = useState(formData.rankingMode === 'Expert');
 const [isAutomateRanking, setIsAutomateRanking] = useState(formData.rankingMode === 'Automate');  
 const [isBothRanking, setIsBothRanking] = useState(formData.rankingMode === 'Both');
 const [isPublic, setIsPublic] = useState(true);
 const [isPrivate, setIsPrivate] = useState(false);
 const [isTeamParticipation, setIsTeamParticipation] = useState(false); // State for team participation
 const [isSoloParticipation , setIsSoloParticipation]= useState(true); 
 const [showSoloInputs, setShowSoloInputs] = useState(false);
 const [showTeamInputs, setShowTeamInputs] = useState(false);
 const [isPresentationChecked, setIsPresentationChecked] = useState(true); // Par défaut, le checkbox est coché
 const [isOutputChecked,setIsOutputChecked] = useState(true);
 const [isCodeChecked, setIsCodeChecked]= useState(true) ; 
 const [isDataSetChecked, setIsDataSetChecked]= useState(false); 
 const [isRapportChecked, setIsRapportChecked]= useState(false); 
 const [isDemoChecked, setIsDemoChecked]= useState(false) ; 
 const [maxParticipants, setMaxParticipants] = useState(formData.maxParticipants || 10);
 const [maxTeams, setMaxTeams]= useState(formData.maxTeams || 5) ; 
 const [maxTeamMembers, setMaxTeamMembers]= useState(formData.maxTeamMembers || 5) ;
 
 useEffect(() => {
  // Initialize rankingMode, visibility, and participationMode based on formData
  const { rankingMode, ispublic = true, isprivate = false, participationMode, presentation = true, output = true, code = true, dataset = false, rapport = false, demo = false, solo = true, team = false } = formData;

  setIsExpertRanking(rankingMode === 'Expert' || rankingMode === 'Both');
  setIsAutomateRanking(rankingMode === 'Automate' || rankingMode === 'Both');
  setIsBothRanking(rankingMode === 'Both');

  setIsPublic(ispublic !== undefined ? ispublic : true);
  setIsPrivate(isprivate !== undefined ? isprivate : false);

  setIsPresentationChecked(presentation !== undefined ? presentation : true);
  setIsOutputChecked(output !== undefined ? output : true);
  setIsCodeChecked(code !== undefined ? code : true);
  setIsDataSetChecked(dataset !== undefined ? dataset : false);
  setIsRapportChecked(rapport !== undefined ? rapport : false);
  setIsDemoChecked(demo !== undefined ? demo : false);
  setIsSoloParticipation(solo !== undefined ? solo : true);
  setShowSoloInputs(solo); // Show solo inputs based on solo participation
  setIsTeamParticipation(team !== undefined ? team : false);
  setShowTeamInputs(team);
  // Set ranking mode to Both by default if not already set
  if (!rankingMode) {
    setIsBothRanking(true);
    setIsExpertRanking(true); // Set Expert Ranking to true by default
    setIsAutomateRanking(true); // Set Automate Ranking to true by default
  }
}, [formData]); // Include formData in dependencies


  
  // Handle input changes for evaluation metric
  const handleEvaluationMetricChange = (e) => {
    const newValue = e.target.value;
    setEvaluationMetric(newValue);
  };

  // Handle input changes for submission file description
  const handleSubmissionFileDescriptionChange = (e) => {
    const newValue = e.target.value;
    setSubmissionFileDescription(newValue);
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    onFileUpload(file);
  };

  
  const handleExpertRankingChange = (e) => {
    const newValue = e.target.checked;
    setIsExpertRanking(newValue);
    // Uncheck Both when Expert is checked
    setIsBothRanking(false);

  };
  
  const handleAutomateRankingChange = (e) => {
    const newValue = e.target.checked;
    setIsAutomateRanking(newValue);
    // Uncheck Both when Automate is checked
    setIsBothRanking(false);

  };
  
  const handleBothRankingChange = (e) => {
    const newValue = e.target.checked;
    setIsBothRanking(newValue);
    // Uncheck Expert and Automate when Both is checked
    setIsExpertRanking(false);
    setIsAutomateRanking(false);
  };
  
  
  const handlePublicChange = (e) => {
    const newValue = e.target.checked;
    setIsPublic(newValue);
    // If "Public" is selected, deselect "Private"
    if (newValue) {
      setIsPrivate(false);
    }
  };
  
  const handlePrivateChange = (e) => {
    const newValue = e.target.checked;
    setIsPrivate(newValue);
    // If "Private" is selected, deselect "Public"
    if (newValue) {
      setIsPublic(false);
    }
  };

   // Handle checkbox changes for team participation
   const handleTeamParticipationChange = (e) => {
    const newValue = e.target.checked ; 
    setIsTeamParticipation(newValue);
    setShowTeamInputs(newValue); // Toggle the visibility of team inputs
  };

  const handleMaxTeamsChange = (event) => {
    const value= event.target.value ;
    setMaxTeams(value) ; 
  }
  const handleMaxTeamsMembersChange = (event) => {
    const value= event.target.value ; 
    setMaxTeamMembers(value) ; 
  }

  const handleSoloParticipationChange = (e) => {
    const newValue = e.target.checked;
    setIsSoloParticipation(newValue);
    setShowSoloInputs(newValue); // Toggle the visibility of solo inputs
  };

  const handleMaxParticipantsChange = (event) => {
    const value = event.target.value;
    console.log("New max participants value:", value);
    setMaxParticipants(value);
  };
  
  
  
  const handlePresentationChange = (e) => {
    const newValue = e.target.checked;
    setIsPresentationChecked(newValue);
  };

  const handleOutputChange = (e) => {
    const newValue = e.target.checked;
    setIsOutputChecked(newValue);
  };

  const handleCodeChange = (e) => {
    const newValue = e.target.checked ; 
    setIsCodeChecked(newValue) ; 
  }

  const handleDataSetChange = (e) => {
    const newValue = e.target.checked;
    setIsDataSetChecked(newValue);
  };
 
  const handleRapportChange =(e) => {
    const newValue = e.target.checked;
    setIsRapportChecked(newValue);
  }

  const handleDemoChange = (e) => {
    const newValue = e.target.checked;
    setIsDemoChecked(newValue);
  };

  // Handle moving to previous page
  const moveToPreviousPage = () => {
    onButtonClick('pageone');
  };

  const moveToNextPage = () => {
    // Determine the ranking mode based on isExpertRanking and isAutomateRanking
    let rankingMode = '';
    if (isExpertRanking && isAutomateRanking) {
      rankingMode = 'Both';
    } else if (isExpertRanking) {
      rankingMode = 'Expert';
    } else if (isAutomateRanking) {
      rankingMode = 'Automate';
    }
  
  
    // Update local state and formData
    setFormData({
      ...formData,
      evaluationmetric: evaluationmetric,
      submissionfiledescription: submissionfiledescription,
      rankingMode: rankingMode,
      ispublic : isPublic , 
      isprivate : isPrivate , 
      solo: isSoloParticipation, 
      maxParticipants: maxParticipants, 
      team : isTeamParticipation,
      maxTeams : maxTeams ,
      maxTeamMembers : maxTeamMembers ,
      presentation: isPresentationChecked,
      output: isOutputChecked,
      code: isCodeChecked,
      dataset: isDataSetChecked,
      rapport: isRapportChecked,
      demo: isDemoChecked,
    });
  
    console.log("rankingMode:", rankingMode);
    console.log("public:", isPublic);
    console.log("private:", isPrivate);
    console.log("solo:", isSoloParticipation); 
    console.log("maxParticipants:", maxParticipants);
    console.log("team:", isTeamParticipation); 
    console.log("max teams :", maxTeams); 
    console.log("max team members", maxTeamMembers); 
    console.log("presentation:", isPresentationChecked);
    console.log("output:", isOutputChecked);
    console.log("code:", isCodeChecked);
    console.log("dataset:", isDataSetChecked);
    console.log("rapport:", isRapportChecked);
    console.log("demo:", isDemoChecked);
  
    onButtonClick('pagethree');
  };
  
  
  
  

  

  const blue = {
    100: '#daecff',
    200: '#b6daff',
    300: '#66b2ff',
    400: '#3399ff',
    500: '#007fff',
    600: '#0072e5',
    700: '#0059B2',
    800: '#004c99',
  };
  const purple = {
    100: '#664DE5',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `,
  );

  const StyledInput = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 100%; /* Set width to 100% to fill the available space */
    text-align: left; /* Align text to the left */

    &:hover {
      border-color: ${purple[100]};
    }

    &:focus {
      border-color: ${purple[100]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? purple[100] : purple[100]};
    }

    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content:  flex-start;;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;

    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? purple[100] : purple[100]};
      border-color: ${theme.palette.mode === 'dark' ? purple[100] : purple[100]};
      color: ${grey[50]};
    }

    &:focus-visible {
      outline: 0;
    }

    &.increment {
      order: 1;
    }
  `,
  );

  const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
      <div style={{ alignSelf: 'flex-start' }}>
        <BaseNumberInput
          slots={{
            root: StyledInputRoot,
            input: StyledInput,
            incrementButton: StyledButton,
            decrementButton: StyledButton,
          }}
          slotProps={{
            incrementButton: {
              children: <AddIcon fontSize="small" />,
              className: 'increment',
            },
            decrementButton: {
              children: <RemoveIcon fontSize="small" />,
            },
          }}
          {...props}
          ref={ref}
        />
      </div>
    );
  });

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
          <Col lg={6}>
             {/* Challenge settings section */}
             <div className='text-center' style={{ marginBottom: '1rem' }}>
              <h5>Challenge settings</h5>
            </div>
            <div className="form-label-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Ranking Mode</label>
            </div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isAutomateRanking} color="secondary" onChange={handleAutomateRankingChange} />}
                label="Automate Ranking"
              />
              <FormControlLabel
                control={<Checkbox checked={isExpertRanking} color="secondary" onChange={handleExpertRankingChange} />}
                label="Expert Ranking"
              />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Experts from the company review challenger work</span>
            </FormGroup>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <div className="form-label-group">
                <label className="form-label">Visibility</label>
              </div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isPublic} color="secondary" onChange={handlePublicChange} />}
                  label="Public"
                />
                <span style={{ fontSize: '0.75rem', color: 'gray' }}>Any one can see the challenge</span>
                <FormControlLabel
                  control={<Checkbox checked={isPrivate} color="secondary" onChange={handlePrivateChange} />}
                  label="Private"
                />
                <span style={{ fontSize: '0.75rem', color: 'gray' }}>A participation Link will be sent to you and you can share it with people and only challenger with participation link can participate</span>
              </FormGroup>
            </div>
            <div className='text-center' style={{ marginBottom: '1rem' }}>
              <h5>Team settings</h5>
            </div>
            <div className="form-label-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Participation Mode</label>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'gray' }}>If the two mode are checked , a challenger can participate with or without a team </span>

           
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="secondary" checked={isSoloParticipation} onChange={handleSoloParticipationChange} />}
                label="Solo participation"
              />
              {showSoloInputs && (
  <>
    <div className="form-label-group">
      <label className="form-label">Max number of participants </label>
    </div>
    <div className='text-start'>
      <TextField
        type="number"
        aria-label="Max Participants"
        value={maxParticipants}
        onChange={handleMaxParticipantsChange}
        inputProps={{ min: 2, max: 10000000 }}
      />
    </div>
  </>
)}
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>A challenger participate without a team</span>
              <FormControlLabel
                control={<Checkbox color="secondary" checked={isTeamParticipation} onChange={handleTeamParticipationChange} />}
                label="Team participation"
              />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>A challenger participate with a team </span>
            </FormGroup>
            {showTeamInputs && (
              <>
                <label className="form-label">Max number of team participate</label>
                <div className='text-start'>
                  <TextField type="number" aria-label="Max Teams" value={maxTeams} onChange={handleMaxTeamsChange} inputProps={{min: 1, max:10000000 }}/>
                </div>
                <label className="form-label">Max number of team member</label>
                <div className='text-start'>
                  <TextField type="number" aria-label="Max Members In A Team" value={maxTeamMembers} onChange={handleMaxTeamsMembersChange} inputProps={{min: 1, max: 10000000 }}/>
                </div>
              </>
            )}
          </Col>
          <Col lg={6}>
            <div className='text-center'>
              <h5>Submission solution Settings </h5>
            </div>
            <FormGroup>
              <FormControlLabel control={<Checkbox  checked={isPresentationChecked} color="secondary"  onChange={handlePresentationChange} />} label="Presentation" />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Challenger should provide a presentation or score description  </span>
              <FormControlLabel control={<Checkbox checked={isOutputChecked} color="secondary" onChange={handleOutputChange} />} label="Output( Float accuracy)" />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Description for Output</span>
              <FormControlLabel control={<Checkbox checked={isCodeChecked} color="secondary" onChange={handleCodeChange} />} label="Code Source" />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Challenger should provide Code Source ( .zip or .rar +ReadMefile)</span>
              <FormControlLabel control={<Checkbox checked={isDataSetChecked} color="secondary" onChange={handleDataSetChange} />} label="Dataset" />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Challenger should provide the new dataset</span>
              <FormControlLabel control={<Checkbox checked={isRapportChecked} color="secondary" onChange={handleRapportChange} />} label="Rapport" />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Challenger should provide a rapport</span>
              <FormControlLabel control={<Checkbox checked={isDemoChecked}color="secondary" onChange={handleDemoChange}/>} label="Demo" />
              <span style={{ fontSize: '0.75rem', color: 'gray' }}>Challenger should provide a demo (format mp4)</span>
            </FormGroup>
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

export default PageTwo;