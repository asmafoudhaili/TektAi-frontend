import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepCompany = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "pageOneCompany") {
    stepPercentage = 25;
  } else if (page === "PageTwoCompany") {
    stepPercentage = 50;
  } else if (page === "PageThreeCompany") {
    stepPercentage = 75;
  }  else if (page === "PageFourCompany") {
    stepPercentage = 100;
  }
  else {
    stepPercentage = 0;
  }
  return (
    <div className="ProgressBar">    

    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >             
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step><Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>
    
    </ProgressBar>
    </div>
  );
};

export default MultiStepCompany;