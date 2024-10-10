import React, { useState, useRef } from 'react';

const base64Encode = (data) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function FileUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const isFileExcel = (file) => {
    return (
      file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (isFileExcel(selectedFile)) {
        base64Encode(selectedFile)
          .then((value) => {
            setFileSrc(value);
            setFile(selectedFile);
            setFileName(selectedFile.name);
          })
          .catch(() => {
            setFileSrc(null);
            setFile(null);
            setFileName(null);
          });
      } else {
        alert('Please select a valid Excel file with .xlsx or .xls extension.');
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } else {
      setFileSrc(null);
      setFile(null);
      setFileName(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileName(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
    onUpload(); // Inform the parent component that the file has been uploaded
  };

  return (
    <div className="mt-3 d-flex flex-column align-items-center">
      <form className="text-center">
        <div className="mb-3 d-flex align-items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="btn mx-2"
            style={{
              backgroundColor: '#664DE5',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
            }}
          >
            Choose Excel file
          </button>

          {/* Render the buttons even if no file is selected */}
          <button
            type="button"
            onClick={clearFile}
            className="btn btn-danger mx-2"
            style={{
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
            }}
            disabled={!file}
          >
            Clear file
          </button>
          <button
            type="button"
            onClick={handleFileUpload}
            className="btn btn-green-500 mx-2"
            style={{
              backgroundColor: '#664DE5',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
            }}
            disabled={!file}
          >
            Upload file
          </button>
        </div>

        {/* Render the file name and preview image if selected */}
        {file && (
          <div className="mb-3 d-flex align-items-center">
            <img src="images\icon\microsoft-excel-icon.png" alt="Excel Icon" className="mr-2" style={{ width: '20px', height: '20px' }} />
            <span>{fileName}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default FileUploader;