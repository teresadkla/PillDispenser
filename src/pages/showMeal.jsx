import '../css/showMeal.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlarm } from './AlarmContext';

const ShowMeal = () => {
  const { currentAlarm, setCurrentAlarm, setAlarmAcknowledged } = useAlarm();
  const navigate = useNavigate();

  const handleAlarmOff = () => {
    setCurrentAlarm(null); // Dar reset no alarme
    setAlarmAcknowledged(true); // Reconhecer alarme
    navigate('/'); // Ir para home
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