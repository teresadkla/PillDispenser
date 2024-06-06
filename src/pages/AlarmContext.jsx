import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMeals } from '../api/meals';

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [currentAlarm, setCurrentAlarm] = useState(null);
  const [alarmAcknowledged, setAlarmAcknowledged] = useState(false);

  useEffect(() => {
    const checkAlarms = async () => {
      try {
        const data = await getMeals();
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        if (alarmAcknowledged) return; // Don't check alarms if already acknowledged

        let cHours;
        let cMinutes;

        const currentMeal = data.meals.find(
          meal => {
            if(currentHours < 10){
              cHours = `0${currentHours}`;
            }
            else{
              cHours = currentHours;
            }
            
            if(currentMinutes < 10){
                cMinutes = `0${currentMinutes}`;
            }
            else{
                cMinutes = currentMinutes
            }
            console.log(`${cHours}:${cMinutes}`)
            return meal.hours === cHours && meal.minutes === cMinutes
          }
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

    const intervalId = setInterval(checkAlarms, 10000); // Check every minute
    checkAlarms(); // Initial check

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [alarmAcknowledged]);

  return (
    <AlarmContext.Provider value={{ currentAlarm, setCurrentAlarm, setAlarmAcknowledged }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => useContext(AlarmContext);
