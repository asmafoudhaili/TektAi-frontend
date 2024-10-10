import React, { useState } from "react";
import PageOne from "../../../components/PageOne/PageOne";
import PageTwo from "../../../components/PageTwo/PageTwo";
import PageThree from "../../../components/PageThree/PageThree";
import PageFour from "../../../components/PageFour/PageFour";
import { NioSection } from "../../../components";
import axios from 'axios';
import PageOnecompany from "../../../components/PageOnecompany/PageOnecompany";
import PageTwocompany from "../../../components/Pagetwocompany/PageTwocompany";
import MultiStepCompany from "../../../components/MultiStepCompany/MultiStepProgressBar";
import PageThreeCompany from "../../../components/PageThreeCompany/PageThreeCompany";
import PageFourCompany from "../../../components/PageFourCompany/PageFourCompany";
import Chatbott from "../../../chatbot";

function CompanyForm() {
  const [page, setPage] = useState("pageOneCompany");
  const [formData, setFormData] = useState({
    CompanyName: "",
    phoneNumber: "",
    emailCom: "",
    password: null,
    field: "field",
    selectedCountry: "",
    adress: "adress",
    description: "",
    role: "company",






    gender: '',
    status: '',
    firstname: "",
    lastname: "",
    email:"",
    phoneNumber1:" ",
    selectedCountry1:" ",
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
        setPage("pageOneCompany");
        break;
      case "2":
        setPage("PageTwoCompany");
        break;
      case "3":
        setPage("PageThreeCompany");
        break;
      case "4":
        setPage("PageFourCompany");
        break;
      default:
        setPage("pageOneCompany");
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
        <MultiStepCompany page={page}  />
        {page === "pageOneCompany" && (
          <PageOnecompany
            formData={formData}
            setFormData={setFormData}
            onButtonClick={handleNextButtonClick}
          />
        )}
      
       {page === "PageTwoCompany" && (
  <PageTwocompany
    formData={formData}
    setFormData={setFormData} // Pass setFormData to update the form data
    onButtonClick={handleNextButtonClick}
  />
)}


{page === "PageThreeCompany" && (
  <PageThreeCompany
    formData={formData}
    setFormData={setFormData} // Pass setFormData to update the form data
    onButtonClick={handleNextButtonClick}
  />
)}

{page === "PageFourCompany" && (
  <PageFourCompany
    formData={formData}
    setFormData={setFormData} // Pass setFormData to update the form data
    onButtonClick={handleNextButtonClick}
  />
)}
      <Chatbott />

      </NioSection>


  );
}

export default CompanyForm;