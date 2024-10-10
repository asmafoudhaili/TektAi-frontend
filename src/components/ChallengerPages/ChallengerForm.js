import React, { useState } from "react";
import axios from 'axios';
import PageOneChallenger from "./PageOneChallenger";
import PageThreeChallenger from "./PageThreeChallenger";
import PageFourChallenger from "./PageFourChallenger";
import PageFiveChallenger from "./PageFiveChallenger";
import PageSixChallenger from "./PageSixChallenger";
import PageTwoChallenger from "./PageTwoChallenger";
import NioSection from "../NioSection/NioSection";
import MultiStepChallenger from "./MultiStepChallenger";

function ChallengerForm() {
  const [page, setPage] = useState("PageOneChallenger");
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone : '',
    email: '',
    password: '',
    confirmPassword: '',

    gender: '',
    country : '',
    address: '',
    status: '',
    securityQuestions: ['', '', ''],
    role:"challenger",

  });

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

 

  

  const nextPage = (page) => {
    setPage(page);
  };
  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("PageOneChallenger");
        break;
      case "2":
        setPage("PageTwoChallenger");
        break;
      case "3":
        setPage("PageThreeChallenger");
        break;
      case "4":
        setPage("PageFourChallenger");
        break;
      case "5":
        setPage("PageFiveChallenger");
        break;
      case "6":
        setPage("PageSixChallenger");
        break;
      default:
        setPage("PageOneChallenger");
    }
  };
  

  const handleNextButtonClick = (pageName) => {
    nextPage(pageName);
  };
  const submitForm = async (formData) => {
    try {
      const response = await axios.post('/your-backend-route', formData);
      console.log('Response from backend:', response.data);
      // Optionally, you can handle success behavior such as redirecting the user or showing a success message.
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, such as displaying an error message to the user.
    }
  };
  return (
    <NioSection className="bg-purple-100" masks={["shape-18"]}  >
        <MultiStepChallenger page={page}  />
        {page === "PageOneChallenger" && (
    <PageOneChallenger
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageTwoChallenger" && (
    <PageTwoChallenger
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageThreeChallenger" && (
    <PageThreeChallenger
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageFourChallenger" && (
    <PageFourChallenger
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageFiveChallenger" && (
    <PageFiveChallenger
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageSixChallenger" && (
    <PageSixChallenger
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

      </NioSection>


  );
}

export default ChallengerForm;