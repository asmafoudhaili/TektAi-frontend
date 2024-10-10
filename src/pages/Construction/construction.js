import React, { useState } from 'react';
import axios from 'axios';

const CreateChallengePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create a FormData object to send form data, including the file
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('file', file); // Add the file to FormData

      // Send form data to the backend with the JWT token included in the Authorization header
      const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
      const response = await axios.post('http://localhost:9091/challenge', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
        }
      });

      // Handle backend response (e.g., display success message)
      console.log('Challenge created:', response.data);
      alert('Challenge created successfully!');
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error('Error creating challenge:', error);
      setError('Error creating challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Challenge</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>Upload Dataset (Excel file):</label>
          <input type="file" accept=".xls, .xlsx" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading}>Create Challenge</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateChallengePage;
