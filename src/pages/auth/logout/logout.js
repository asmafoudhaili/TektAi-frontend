import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        // Retrieve the access token from local storage
        const token = localStorage.getItem('token');
        console.log('Retrieved Token:', token); // Log the retrieved token

        // Include the authorization header with the retrieved token
        await axios.post('http://localhost:9091/user/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Clear the token from local storage
        localStorage.removeItem('token');

        // Redirect to the home page or any other desired location
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle error as needed
      }
    }

    // Call the logout function when the component mounts
    logout();
  }, [navigate]);

  // No need to render anything since we're redirecting immediately
  return null;
}
