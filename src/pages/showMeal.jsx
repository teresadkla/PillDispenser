import '../showMeal.css';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeals } from '../api/meals';

// Create the AlarmContext
const AlarmContext = createContext();

const AlarmProvider = ({ children }) => {
  const [currentAlarm, setCurrentAlarm] = useState(null);

  useEffect(() => {
    const checkAlarms = async () => {
      try {
        const data = await getMeals();
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentMeal = data.meals.find(
          meal => meal.hours === currentHours && meal.minutes === currentMinutes
        );
        if (currentMeal) {
          setCurrentAlarm(currentMeal);
        } else {
          setCurrentAlarm(null);
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    const intervalId = setInterval(checkAlarms, 60000); // Check every minute
    checkAlarms(); // Initial check

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <AlarmContext.Provider value={{ currentAlarm, setCurrentAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

const useAlarm = () => useContext(AlarmContext);

const ShowMeal = () => {
  const { currentAlarm, setCurrentAlarm } = useAlarm();
  const navigate = useNavigate();

  const handleAlarmOff = () => {
    setCurrentAlarm(null); // Reset the current alarm
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

// Wrap ShowMeal with AlarmProvider
export default () => (
  <AlarmProvider>
    <ShowMeal />
  </AlarmProvider>
);