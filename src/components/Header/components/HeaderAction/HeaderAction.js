// context
import { useLayoutUpdate,useLayout } from '../../../../context/LayoutProvider/LayoutProvider';
import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP
import ReactFlagsSelect from 'react-flags-select';
// components
import NioButton from '../../../NioButton/NioButton';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Avatar, Menu, MenuItem, Fade, IconButton } from '@material-ui/core'; // Importez Button, Avatar, Menu, MenuItem et Fade depuis '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {  Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { SocketContext } from '../../../../context/SocketProvider/SocketProvider';

export default function HeaderAction({ className, nioBtnClasses, nioToggleClasses }) {
  const { socket } = useContext(SocketContext)
  const layoutUpdate = useLayoutUpdate();
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [userData, setUserData] = useState({
    imageUser: 'images/no_pdp.jpg',
    firstname: ""
  });
  const [isLoading, setIsLoading] = useState(true); // State to track whether user data is being fetched

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };
  const allowedCountries = ['FR', 'TN', 'US', 'PT', 'ES']; // Liste des codes de pays autorisés

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) { // Check if token exists
          const response = await axios.get(`http://localhost:9091/user/getProfile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const userDataResponse = response.data;
          setUserData({
            imageUser: userDataResponse.imageUser || 'images/no_pdp.jpg', // If imageUser is empty, use default image
            firstname: userDataResponse.firstname || "Unknown", // If firstname is empty, use "Unknown"
          });
          setIsLoggedIn(true); // Set isLoggedIn to true if user data is successfully fetched
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false regardless of success or failure
      }
    };
    fetchUserData();
  }, [setUserData]); // Ajoutez setUserData comme dépendance pour mettre à jour lorsque le contexte change

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
    handleClose(); // Close the menu after logout
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les notifications non lues depuis le backend
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9091/chat/notification`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setNotifications(response.data.notifications);
        console.log('Notifications:', response.data.notifications);

      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Appeler la fonction pour récupérer les notifications dès que l'utilisateur se connecte
    fetchNotifications();
    fetchNotificationsInvi();
  }, []); // Appeler une seule fois lorsque le composant est monté

    
     const [anchorE2, setAnchorE2] = useState(null);
  
     const handleOpenMenu = (event) => {
       setAnchorE2(event.currentTarget);
     };
  
     const handleCloseMenu = () => {
      setAnchorE2(null);
     };
     const [notificationsInvi, setNotificationsInvi] = useState([]);
     const [anchorE3, setAnchorE3] = useState(null);
  
     const handleOpenMenu2 = (event) => {
       setAnchorE3(event.currentTarget);
     };
  
     const handleCloseMenu2 = () => {
      setAnchorE3(null);
     };

     const fetchNotificationsInvi = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedtoken= jwtDecode (token);
        const userId= decodedtoken._id;
        const response = await axios.get(`http://localhost:9091/notif/${userId}`,{headers: {
          'Authorization': `Bearer ${token}`,
        }},);
        console.log("response", response.data);
        setNotificationsInvi(response.data.notifications_invi);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    // Utilisez useEffect pour charger les notifications une fois que le composant est monté
    useEffect(() => {
      socket.on('invitationReceived', (notification) => {
        console.log("notification", notification);
        setNotificationsInvi((prevNotifs)=>{
          return[notification, ...prevNotifs];
        })
        console.log("notification socket",notificationsInvi);
      })
    }, [socket]); // Le tableau vide [] signifie que cela ne se déclenchera qu'une fois après le montage initial du composant
  

     const navigate = useNavigate();

const discussionClick = async (sender) => {
  navigate(`/discussion/${sender._id}`)}


  
  // Return loading indicator if user data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const isChallengedOrCompanyHomePage = () => {
    return (
      location.pathname === '/index-challenged-home-page' ||
      location.pathname === '/index-company-home-page' ||
      location.pathname === '/index-bs-subscription'

    );
  };

  const mailIconColor = isChallengedOrCompanyHomePage() ? 'white' : 'action';
  const userNameColor = isChallengedOrCompanyHomePage() ? 'white' : 'inherit'; // Change color based on the page
  return (
    <div className={className}>
    <ul className="nk-btn-group sm justify-content-center">
      {isLoggedIn ? (
        <>
 <li>
          <IconButton onClick={handleOpenMenu2}>
                <Badge badgeContent={notificationsInvi.length} color="primary">
                  <AddAlertIcon style={{ color: mailIconColor }} />
                </Badge>
              </IconButton>

            <Menu
              anchorEl={anchorE3}
              keepMounted
              open={Boolean(anchorE3)}
              onClose={handleCloseMenu2}
            >
                {notificationsInvi.map(notifications_invi => (
          <MenuItem key={notifications_invi._id} onClick={handleCloseMenu2}>
            {notifications_invi.content}
          </MenuItem>
        ))}
      </Menu>
    </li>
             

          
      

          <li>
          <IconButton onClick={handleOpenMenu}>
                <Badge badgeContent={notifications.length} color="primary">
                  <MailIcon style={{ color: mailIconColor }} />
                </Badge>
              </IconButton>

            <Menu
              anchorEl={anchorE2}
              keepMounted
              open={Boolean(anchorE2)}
              onClose={handleCloseMenu}
            >
               {notifications.map(notification => (
          <MenuItem key={notification._id} onClick={handleCloseMenu}>
                        <Link to={`/discussion/${notification.sender._id}`}> {/* Redirige vers la page de chat avec l'ID du sender */}

             <div style={{ display: 'flex', alignItems: 'center' }}>
      {notification.sender.imageUser && (
        <img
          src={notification.sender.imageUser}
          alt="User Avatar"
          style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
        />
      )}
      <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>{notification.sender.firstname}</p>
    </div>
    
    <p style={{ color: 'black' }}><b>Message</b>: {notification.message}</p>

            <p style={{ color: 'black' }}><b>Date</b>: {notification.timestamp}</p>

            </Link>

          </MenuItem>
        ))}
      </Menu>

          </li>
          <li className="d-none d-md-block">
          <Button
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={<ArrowDropDownIcon />}
                style={{ color: userNameColor }} // Apply color dynamically
              >
                {userData.firstname}
              <Avatar
                src={userData.imageUser}
                style={{
                  marginLeft: "10px"
                }}
              />
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>My account</MenuItem>
              <MenuItem component={Link} to="/CompanyDashboard" onClick={handleClose}>Company Dashboard</MenuItem>
              <MenuItem component={Link} to="/" onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </li>
        </>
      ) : (
        <li className="d-none d-md-block">
          <Link to="/auth/login">
            <NioButton
              icon="user"
              label="Sign In"
              className={nioBtnClasses}
            />
          </Link>
        </li>
      )}
      <li>
        <ReactFlagsSelect
  countries={allowedCountries}
  customLabels={{
    FR: 'French',
    TN: 'Arabic',
    US: 'English',
    PT: 'Portuguese',
    ES: 'Spanish',
  }}
  selectedSize={16}
  optionsSize={15}
  onSelect={handleChangeCountry}
  selected={selectedCountry}
  placeholder="Language"
/>
</li>
        <li className="nk-navbar-toggle">
          <NioButton
            icon='menu'
            className={nioToggleClasses}
            onClick={layoutUpdate.headerMobile}
          />
        </li>
      </ul>
    </div>
  );
}