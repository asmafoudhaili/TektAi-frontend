import React from 'react';
import axios from 'axios';
import ChatBot from 'react-simple-chatbot';

class Chatbott extends React.Component {
  state = {
    lastMessageString: "..........",
  };

  handleUserMessage = async (userQuestion) => {
    try {
      const response = await axios.post('http://localhost:9091/user/postman', {
        question: userQuestion,
      });
      const botResponse = response.data.response;
      console.log('Bot response:', botResponse);
      this.setState({ lastMessageString: botResponse }, () => {
        console.log('lastMessageString updated:', this.state.lastMessageString);
      });
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  botResponseMessage = () => {
    return this.state.lastMessageString;
  }
  
  render() {
    return (
      
        <div id="chatbot-root"> {/* Ajoutez l'ID ici */}        <ChatBot
          steps={[
            {
              id: '1',
              message: ' heyy there ,What is your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}, nice to meet you!',
              trigger: '4',
            },
            {
              id: '4',
              message: 'What are you looking for ',
              trigger: '5',
            },
            {
              id: '5',
              options: [
                { value: 1, label: 'registration', trigger: '6' },
                { value: 2, label: 'post a challenge', trigger: '7' },
              ],
            },
            {
              id: '6',
              message: 'Please sign up to create an account.',
              trigger: 'userQuestion',
            },
            {
              id: '7',
              message: 'Please sign up as a company ',
              trigger: 'userQuestion',
            },
            {
              id: 'userQuestion',
              message: 'feel free to ask more ',
              trigger: 'userResponse',
            },
            {
              id: 'userResponse',
              user: true,
              trigger: 'botResponse',
              validator: (value) => {
                this.handleUserMessage(value);
                return true;
              },
            }, 
            {
              id: 'botResponse',
              message: this.botResponseMessage,
              trigger: 'userQuestion',
            }
          ]}
          floating={true}
        /> 
      </div>
    );
  }
}

export default Chatbott;