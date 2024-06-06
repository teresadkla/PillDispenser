import '../showMeal.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlarm } from './AlarmContext';

const ShowMeal = () => {
  const { currentAlarm, setCurrentAlarm, setAlarmAcknowledged } = useAlarm();
  const navigate = useNavigate();

  const handleAlarmOff = () => {
    setCurrentAlarm(null); // Reset the current alarm
    setAlarmAcknowledged(true); // Acknowledge the alarm
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="container">
      <h1>Olá! Não se esqueça de tomar a sua medicação</h1>
      {currentAlarm ? (
        <div>
          <div className="time-circle">
            <span className="time">
              {currentAlarm.hours}:{currentAlarm.minutes}
            </span>
          </div>
          <button className="alarm-button" onClick={handleAlarmOff}>
            Desligar Alarme
          </button>
        </div>
      ) : (
        <p>No meal found</p>
      )}
    </div>
  );
};

export default ShowMeal;