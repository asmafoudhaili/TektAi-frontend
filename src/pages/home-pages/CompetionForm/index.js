import React, { useState } from "react";
import PageOne from "../../../components/PageOne/PageOne";
import PageTwo from "../../../components/PageTwo/PageTwo";
import PageThree from "../../../components/PageThree/PageThree";
import MultiStepProgressBar from "../../../components/MultiStepProgressBar/MultiStepProgressBar";
import PageFour from "../../../components/PageFour/PageFour";
import { NioSection } from "../../../components";
import axios from 'axios';

function CompetionForm() {
  const [page, setPage] = useState("pageone");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problematic:"",
    evaluationMetric: "",
    submissionFile: null,
    firstPlace: "",
    secondPlace: "",
    thirdPlace: "",
    otherPrize: "",
    startDate: "",
    submissionDeadline: "",
    image: null,
  });

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFileUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      submissionFile: file,
    }));
  };

  const handleImageUpload = (image) => {
    setFormData((prevData) => ({
      ...prevData,
      image: image,
    }));
  };

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        setPage("pagefour");
        break;
      default:
        setPage("1");
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
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {page === "pageone" && (
          <PageOne
            formData={formData}
            setFormData={setFormData}
            onButtonClick={handleNextButtonClick}
          />
        )}
        {page === "pagetwo" && (
          <PageTwo
            formData={formData}
            setFormData={setFormData}
            onButtonClick={handleNextButtonClick}
            onFileUpload={handleFileUpload}
          />
        )}
        {page === "pagethree" && (
          <PageThree
            formData={formData}
            setFormData={setFormData} // Pass setFormData to update the form data
            onButtonClick={handleNextButtonClick}
            onFormChange={handleFormChange} // Pass form change handler
          />
        )}
       {page === "pagefour" && (
  <PageFour
    formData={formData}
    setFormData={setFormData} // Pass setFormData to update the form data
    onButtonClick={handleNextButtonClick}
    onImageUpload={handleImageUpload}
  />
)}

      </NioSection>
  );
}

export default CompetionForm;