import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import FileUploader from '../FileUpload/FileUpload';
const PageOne = ({ formData, setFormData, onButtonClick }) => {
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [problematicError, setproblematicError] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
 
  
  const handleStartDateChange = (newValue) => {
    console.log("Start Date:", newValue); // Log the start date value
    const formattedDate = newValue ? newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : '';
    setFormData((prevData) => ({
      ...prevData,
      startDate: formattedDate,
    }));

    // Check if start date is before current date
    const currentDate = dayjs();
    if (newValue && newValue.isBefore(currentDate, 'day')) {
      setStartDateError('Start date cannot be before the current date');
    } else {
      setStartDateError('');
    }
  };

  const handleEndDateChange = (newValue) => {
    console.log("End Date:", newValue); // Log the end date value
    const formattedDate = newValue ? newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : '';
    setFormData((prevData) => ({
      ...prevData,
      endDate: formattedDate,
    }));

    // Check if end date is before start date
    if (newValue && formData.startDate && newValue.isBefore(formData.startDate, 'day')) {
      setEndDateError('End date cannot be before the start date');
    } else {
      setEndDateError('');
    }
  };

  // Convert formData.startDate and formData.endDate to Day.js objects if they are not already
  const startDate = formData.startDate ? dayjs(formData.startDate) : dayjs();
  const endDate = formData.endDate ? dayjs(formData.endDate) : dayjs();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = () => {
    setIsImageUploaded(true);
    console.log("Image uploaded:", isImageUploaded);
  };
  const handleFileUpload = () => {
    setIsFileUploaded(true);
    console.log("File uploaded:", isFileUploaded);
  };

  const handleNext = () => {
    // Validate title and description fields
    if (!formData.title.trim()) {
      setTitleError('Title is required');
      return;
    } else {
      setTitleError('');
    }

    if (!formData.description.trim()) {
      setDescriptionError('Description is required');
      return;
    } else {
      setDescriptionError('');
    }
    if (!formData.problematic.trim()) {
      setproblematicError('Problematic is required');
      return;
    } else {
      setproblematicError('');
    }
    if (!formData.startDate) {
      setStartDateError('Start date is required');
    } else {
      setStartDateError('');
    }

    if (!formData.endDate) {
      setEndDateError('End date is required');
    } else {
      setEndDateError('');
    }
    // Proceed to the next step
    onButtonClick('pagetwo');
  };

  console.log("Title:", formData.title);
  console.log("Description:", formData.description);
  console.log("Is Image Uploaded:", isImageUploaded);
  console.log("Is File Uploaded:", isFileUploaded);

  return (
    
    <main className="pt5 black-80 center">
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ width: "auto" }}>
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
            <Col xs={12}>
              <NioField label="Title" htmlFor="title">
                <NioField.Input
                  id="title"
                  name="title"
                  placeholder="Enter your competition title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </NioField>
              {titleError && <span className="text-danger">{titleError}</span>}
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label">Description</label>
                  <span>
                    <span id="char-count">0</span>/ <span id="char-max" data-char-max="255">255</span>
                  </span>
                </div>
                <div className="form-control-wrap">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Brief description of the competition"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              {descriptionError && <span className="text-danger">{descriptionError}</span>}
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label">Problematic</label>
                  <span>
                    <span id="char-count">0</span>/ <span id="char-max" data-char-max="255">255</span>
                  </span>
                </div>
                <div className="form-control-wrap">
                  <textarea
                    className="form-control"
                    name="problematic"
                    placeholder="Brief description of the Problematic "
                    value={formData.problematic}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              {problematicError && <span className="text-danger">{problematicError}</span>}
            </Col>
            <Col lg={12}>
            <Row>
          <Col lg={6}>
          <NioField label="Start Date" htmlFor="Title">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <StaticDateTimePicker value={startDate} onChange={handleStartDateChange} />
              </DemoContainer>
            </LocalizationProvider>
            {startDateError && <span className="text-danger">{startDateError}</span>}
            </NioField>
          </Col>
          
          <Col lg={6}>
          <NioField label="End Date" htmlFor="Title">      
                <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <StaticDateTimePicker value={endDate} onChange={handleEndDateChange} />
              </DemoContainer>
            </LocalizationProvider>
            {endDateError && <span className="text-danger">{endDateError}</span>}
            </NioField>
          </Col>
        </Row>
        </Col>
            <Col lg={6}>
            <NioField label="Choose your competion cover image " htmlFor="Title">
              <ImageUploader onUpload={handleImageUpload} />
              </NioField>

            </Col>
            <Col lg={6}>
            <NioField label="upload the data set " htmlFor="Title">
              <FileUploader onUpload={handleFileUpload} />
              </NioField>

            </Col>
            
            <Col lg={12} className="d-flex justify-content-end">
              <div className="form-group">
                <NioButton
                  onClick={handleNext}
                  label=">>"
                  className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ width: "100%", backgroundColor: '#664DE5', border: 'none', color: 'white' }}
                  disabled={!formData.title.trim() || !formData.description.trim() ||!formData.problematic.trim() ||!isImageUploaded}
                />
              </div>
            </Col>
            
          </Row>
        </NioCard.Body>
      </NioCard>
    </main>
  );
};

export default PageOne; 