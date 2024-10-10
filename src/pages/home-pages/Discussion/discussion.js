import { useState, useEffect, useRef, useContext } from 'react';
import { Container, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import './disc.css';
import { useParams } from 'react-router-dom';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioCount, NioMedia, NioIcon, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';
import { Col, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { Button, Avatar, Menu, MenuItem, Fade } from '@material-ui/core'; // Importez Button, Avatar, Menu, MenuItem et Fade depuis '@material-ui/core'
import defaultPicture from '../../../assets/images/no_pdp.jpg'
import { SocketContext } from '../../../context/SocketProvider/SocketProvider';

export default function DiscussionPage() {
  const [messages, setMessages] = useState([]);
  const [friendList, setfriendList] = useState();
  const [chatMessages, setChatMessages] = useState([]); // État pour stocker les messages du chat
  const [selectedUser, setSelectedUser] = useState(null); // État pour stocker l'utilisateur sélectionné
  const [newMessage, setNewMessage] = useState('');
  const {socket, connectedUser} = useContext(SocketContext)

  const [data, setData] = useState({ 
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    status: '',
    country: '',
    imageUser: defaultPicture,
    role: '',
    
  });

  
  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9091/user/getProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setData(prevData => ({
          ...prevData,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phone: userData.phone,
          status: userData.status,
          country:userData.country,
          imageUser: userData.imageUser || defaultPicture, 
          role: userData.role,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const chatRef = useRef(null);

  const [user, setUser] = useState(null);
  const { receiverId } = useParams(); // Récupérez l'ID de l'utilisateur à partir des paramètres de l'URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/user/${receiverId}`);
        setUser(response.data.user);
        console.log('userReceiver:', receiverId);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [receiverId]);

  

 
  useEffect(() => {

    socket.on('receive_message', (message) => {
      setNewMessage('');
      console.log("message socket", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("messages", messages);
    });

    // Nettoyer la connexion WebSocket lors du démontage du composant

  }, [socket]);
  const sendMessage = () => {
    try {
      // Créer l'objet de données à envoyer dans la requête POST
      const messageData = {
        userId: receiverId, // Assurez-vous que receiverId est défini correctement
        message: newMessage,
      };
      socket.emit('send_message', messageData);
      const token = localStorage.getItem('token');
      
      // Envoyer la requête POST au serveur
      /*const response = await axios.post('http://localhost:9091/chat', messageData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });*/
  
      // Vérifier la réponse du serveur
      /*if (response.status === 201) {
        console.log('Message sent successfully');
        // const newMessageData = response.data.message;
        // setMessages(prevMessages => [...prevMessages, newMessageData]);
        

        // Mettre à jour l'état `messages` immédiatement après l'envoi du message
        // Réinitialiser le champ de saisie après l'envoi du message
        setNewMessage('');
        setMessages([...messages, response.data.populatedMessage])

      } else {
        console.error('Failed to send message');
      }*/

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  useEffect(() => {
    const fetchMessages = async () => {

      try {
        if (receiverId) { // Vérifier si userId est défini
          console.log(receiverId);
          const token = localStorage.getItem('token');

          const response = await axios.get(`http://localhost:9091/chat/${receiverId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          console.log( 'respnse:',response.data);
          const { messages } = response.data;

           /*const messagesByUser = {};
          messages.forEach(message => {
            if (!messagesByUser[message.receiver._id]) {
              messagesByUser[message.receiver._id] = message;
            } else {
              if (message.date > messagesByUser[message.receiver._id].date) {
                messagesByUser[message.receiver._id] = message;
              }
            }
          });
          const filteredMessages = Object.values(messagesByUser);
          setMessages(filteredMessages);
          console.log("filteredMessages", filteredMessages);
          setMessages(filteredMessages);
          console.log("filteredMessages", filteredMessages);*/

          setMessages(messages);

          const friend = messages[messages.length - 1]

          if(friend.receiver._id !== receiverId ){
            const sender = friend.receiver
            const receiver = friend.sender
            const newFriend = {...friend, receiver: receiver, sender: sender }
            console.log("newFriend", newFriend)
            setfriendList(newFriend)
          }else{
            console.log("friend", friend);
            setfriendList(friend)
          }
          

        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [receiverId]);

  // Gestionnaire d'événements pour sélectionner un utilisateur
  const handleUserClick = (receiverId) => {
    setSelectedUser(receiverId);

    // Récupérer les messages de l'utilisateur sélectionné
    setChatMessages(messages[receiverId].messages);
  };


  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('send_message', {
        receiverId,
        message: newMessage.trim(),
      });
      setNewMessage('');
    }
  };

  return (
    <AppLayout variant={4} title="Profile" rootClass="layout-10">

      <section className="nk-banner nk-banner-collab">
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-auto" style={{ width: "100%" }}>
                  <NioCard.Body>
                    <Row>
                    {data.role === 'company' && ( 

                      <Col lg={5}>
                        <div className="settings-tray">
                          <span className="settings-tray--right">
                            <i className="material-icons"></i>
                            <i className="material-icons"></i>
                            <i className="material-icons"></i>
                          </span>
                        </div>
                        <div className="search-box">
                          <div className="input-wrapper">
                            <i className="material-icons"></i>
                            <input placeholder="Search here" type="text" />
                          </div>
                        </div>
                        <div>
                          {/*Object.values(messages).map((message, index) => (
                            <div key={index} className={`friend-drawer friend-drawer--onhover ${selectedUser === message.sender._id ? 'selected' : ''}`}
                              onClick={() => handleUserClick(message.sender._id)}>
                              <img className="profile-image" src={message.sender.imageUser} alt="Profile" />
                              <div className="text">
                                <h6>{`${message.sender.firstname} ${message.sender.lastname}`}</h6>
                                <p className="text-muted">{message.message}</p>
                              </div>
                              <span className="time text-muted small">{message.date}</span>
                            </div>
                          ))*/}
                           <div className={`friend-drawer friend-drawer--onhover ${selectedUser === friendList?.receiver?._id ? 'selected' : ''}`}
                              onClick={() => handleUserClick(friendList?.receiver?._id)}>
                              <img className="profile-image" src={user.imageUser || defaultPicture} alt="Profile" />
                              <div className="text">
                                <h6>{`${user.firstname}`} {`${user.lastname}`}</h6>

                                <p className="text-muted">{friendList?.message}</p>
                              </div>
                              <span className="time text-muted small">{friendList?.date}</span>
                            </div>
                          <hr />
                        </div>
                      </Col>
                    )}
                                        {data.role === 'company' && ( 

                      <Col lg={7}>
                        <div className="settings-tray">
                          <div>
                            {/*messages.map((message, index) => (
                              <div className="friend-drawer no-gutters friend-drawer--grey">
                                <img className="profile-image" src={message.receiver.imageUser} alt="Profile" />
                                <div className="text">
                                  <h6>{`${message.receiver.firstname} ${message.receiver.lastname}`}</h6>
                                </div>
                              </div>
                            ))*/}
                            <div className="friend-drawer no-gutters friend-drawer--grey">
                              <img className="profile-image" src={user.imageUser || defaultPicture } alt="Profile" />
                                <div className="text">
                                  <h6>{`${user.firstname}`}</h6>
                                </div>
                              </div>
                            <span className="settings-tray--right">
                              <i className="material-icons"></i>
                              <i className="material-icons"></i>
                              <i className="material-icons"></i>
                            </span>
                          </div>
                        </div>
                        <div className="chat-panel">
                          <div className='main-chat' ref={chatRef}>
                          {messages.map((message, index) => (
                            message.sender._id === connectedUser.id ? (
                              <div className="row no-gutters">
                                <div className="col-md-4 offset-md-9">
                                  <div className="chat-bubble chat-bubble--right">
                                    {message.message}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="row no-gutters">
                                <div className="col-md-4 offset-md-2">
                                  <div className="chat-bubble chat-bubble--left">
                                    {message.message}
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="chat-box-tray">
                              <i className="material-icons"></i>
                              <input type="text" placeholder="Type your message here..." value={newMessage} onChange={handleMessageChange} />
                              <i className="material-icons"></i>
                              <IconButton type="submit" onClick={sendMessage}>
                                <SendIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                                        )}
                     {data.role === 'challenger' && ( 
 <Col lg={12}>
 <div className="settings-tray">
   <div>
     {/*messages.map((message, index) => (
       <div className="friend-drawer no-gutters friend-drawer--grey">
         <img className="profile-image" src={message.receiver.imageUser} alt="Profile" />
         <div className="text">
           <h6>{`${message.receiver.firstname} ${message.receiver.lastname}`}</h6>
         </div>
       </div>
     ))*/}
     <div className="friend-drawer no-gutters friend-drawer--grey">
       <img className="profile-image" src={user.imageUser || defaultPicture}  alt="Profile" />
         <div className="text">
           <h6>{`${user.firstname}`}</h6>
         </div>
       </div>
     <span className="settings-tray--right">
       <i className="material-icons"></i>
       <i className="material-icons"></i>
       <i className="material-icons"></i>
     </span>
   </div>
 </div>
 <div className="chat-panel">
   <div className='main-chat' ref={chatRef}>
   {messages.map((message, index) => (
     message.sender._id === connectedUser.id ? (
       <div className="row no-gutters">
         <div className="col-md-3 offset-md-9">
           <div className="chat-bubble chat-bubble--right">
             {message.message}
           </div>
         </div>
       </div>
     ) : (
       <div className="row no-gutters">
         <div className="col-md-4 offset-md-2">
           <div className="chat-bubble chat-bubble--left">
             {message.message}
           </div>
         </div>
       </div>
     )
   ))}
 </div>
 <div className="row">
   <div className="col-12">
     <div className="chat-box-tray">
       <i className="material-icons"></i>
       <input type="text" placeholder="Type your message here..." value={newMessage} onChange={handleMessageChange} />
       <i className="material-icons"></i>
       <IconButton type="submit" onClick={sendMessage}>
         <SendIcon />
       </IconButton>
     </div>
   </div>
 </div>
</div>
</Col>
                 )}

                  </Row>
                </NioCard.Body>
              </NioCard>
            </div>
          </div>
        </div>
      </div>
    </section>

    </AppLayout >

  );
}