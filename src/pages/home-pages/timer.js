import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { days, hours, minutes, seconds };
  };

  const renderCard = (number, label) => {
    return (
      <div className="card">
        <span className="number">{number.toString().padStart(2, '0')}</span>
        <p>{label}</p>
      </div>
              

    );
  };

  return (
    <div className="countdown-timer">
      {renderCard(formatTime(timeRemaining).days, 'day')}
      <span className="separator">:</span>
      {renderCard(formatTime(timeRemaining).hours, 'Hr')}
      <span className="separator">:</span>
      {renderCard(formatTime(timeRemaining).minutes, 'min')}
      <span className="separator">:</span>
      {renderCard(formatTime(timeRemaining).seconds, 'sec')}
      <style>
        {`
          .countdown-timer {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          .card {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            border-color:black;
            padding: 10px;
            margin: 0 10px;
            text-align: center;
          }
          .number {
            font-size: 2em;
            color: black;
          }
          .separator {
            font-size: 2em;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
        `}
      </style>
    </div>
  );
};

export default CountdownTimer;
