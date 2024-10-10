import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBot from 'react-simple-chatbot';

class Chatbot2 extends React.Component {
  state = {
    messages: [],
    lastMessageString: '',
    userQuestion: '', // New state to hold user's question
  };

  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  async fetchData(question) {
    try {
      // Fetch data from the backend
      const response = await axios.post('http://localhost:9091/user/postman', {
        question: question, // Provide a default question if no question is provided
      });
      console.log('Fetching data for question:', question);

      const botResponse = response.data.response;
      // Update state with the received data
      this.setState({ messages: [botResponse], lastMessageString: botResponse });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  handleEnd({ steps, values }) {
    // Extracting the user question from the conversation values
    const userQuestion = values[0];
    console.log('User question extracted from conversation values:', userQuestion);

    // Fetch data based on the user question
    this.fetchData(userQuestion);
  }

  render() {
    const { lastMessageString } = this.state;
    return (
      <div>
        <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'Put your question:',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Thanks for your question!',
              trigger: '4',
            },
            {
              id: '4',
              message: lastMessageString,
            },
          ]}
          floating={true}
        />
      </div>
    );
  }
}

export default Chatbot2;
