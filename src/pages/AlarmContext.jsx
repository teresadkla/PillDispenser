import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMeals } from '../api/meals';

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
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

export const useAlarm = () => useContext(AlarmContext);
