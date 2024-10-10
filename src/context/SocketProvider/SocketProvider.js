import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

// Create a new context
const SocketContext = createContext();

// Create a provider component
const SocketProvider = ({ children }) => {
  // Define state or any other necessary variables
  const [socket, setSocket] = useState(null);
  const [connectedUser, setConnectedUser] = useState(null);
  console.log("connectedUser context", connectedUser);
  console.log("socket context", socket);

  // Define functions or other logic as needed
  /*const updateState = (newValue) => {
    setMyState(newValue);
  };*/

  // Define the context value
  const contextValue = {
    socket,
    setSocket,
    connectedUser,
    setConnectedUser,
  };

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token){
            setConnectedUser({})
            return;
        }
        const response = await axios.get(`http://localhost:9091/user/getProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log("userData", userData)
        setConnectedUser(prevData => ({
          ...prevData,
          id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phone: userData.phone,
          status: userData.status,
          country:userData.country,
          imageUser: userData.imageUser || 'images/no_pdp.jpg', // If imageUser is empty, use default image
          role: userData.role,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  useEffect(()=>{
    const socket = io('http://localhost:9091');
    socket.on('connect', () => {
        console.log('Connected to server');
        setSocket(socket);
        if(connectedUser){
            socket.emit('register', connectedUser.id);
        }
        
      });
  },[connectedUser])

  // Render the provider with the context value and children
  return (
    <SocketContext.Provider value={contextValue}>
        {(socket && connectedUser) ? children : null}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
