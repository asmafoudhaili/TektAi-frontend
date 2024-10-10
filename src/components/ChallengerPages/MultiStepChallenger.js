import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepChallenger = ({ page}) => {
  let stepPercentage = 0;
  if (page === "PageOneChallenger") {
    stepPercentage = 16.67;
  } else if (page === "PageTwoChallenger") {
    stepPercentage = 33.33;
  } else if (page === "PageThreeChallenger") {
    stepPercentage = 50;
  } else if (page === "PageFourChallenger") {
    stepPercentage = 66.67;
  } else if (page === "PageFiveChallenger") {
    stepPercentage = 83.33;
  } else if (page === "PageSixChallenger") {
    stepPercentage = 100;
  } else {
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

export default MultiStepChallenger;
