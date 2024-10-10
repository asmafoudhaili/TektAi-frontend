import React, { useState, useRef } from 'react';

const base64Encode = (data) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ImageUploader({ onUpload }) {
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState(null);
  const fileInputRef = useRef(null);

  const isFileImage = (file) => {
    return file && file.type.split('/')[0] === 'image'; // Check if the file type is 'image'
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase(); // Get the file extension
      if (isFileImage(file) && (extension === 'png' || extension === 'jpeg' || extension === 'jpg')) {
        base64Encode(file)
          .then((value) => {
            setImageSrc(value);
            setImage(file);
            setImageName(file.name);
          })
          .catch(() => {
            setImageSrc(null);
            setImage(null);
            setImageName(null);
          });
      } else {
        alert('Please select a valid image file with .png or .jpeg extension.');
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } else {
      setImageSrc(null);
      setImage(null);
      setImageName(null);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImageName(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }
    onUpload(); // Inform the parent component that the image has been uploaded
  };

  return (
    <div className="mt-3 d-flex flex-column align-items-center">
      <form className="text-center">
        <div className="mb-3 d-flex align-items-center">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".png,.jpeg,.jpg" />
          <button type="button" onClick={handleButtonClick} className="btn mx-2" style={{ backgroundColor: '#664DE5', border: 'none', color: 'white', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Choose image
          </button>

          {/* Render the buttons even if no image is selected */}
          <button type="button" onClick={clearImage} className="btn btn-danger mx-2" style={{ border: 'none', color: 'white', padding: '0.5rem 1rem', fontSize: '0.9rem' }} disabled={!image}>
            Clear image
          </button>
          <button type="button" onClick={handleImageUpload} className="btn btn-green-500 mx-2" style={{ backgroundColor: '#664DE5', border: 'none', color: 'white', padding: '0.5rem 1rem', fontSize: '0.9rem' }} disabled={!image}>
            Upload image
          </button>
        </div>

        {/* Render the image if selected */}
        {image && (
          <div className="mb-3 d-flex align-items-center">
            <img src={imageSrc} className="mr-2" alt="Uploaded" style={{ maxWidth: '50px', maxHeight: '300px', width: 'auto', height: 'auto' }} />
            <span>{imageName}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default ImageUploader;
