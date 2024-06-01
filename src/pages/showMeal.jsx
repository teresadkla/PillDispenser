import '../ShowMeal.css';
import React, { useEffect, useState } from 'react';
import { getMeals } from '../api/meals';

const ShowMeal = () => {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals();
        if (data.meals.length > 0) {
          setMeal(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    
    fetchMeals();
  }, []);

  return (
    <div className="container">
      <h1>Olá! Não se esqueça de tomar a sua medicação</h1>
      {meal ? (
        <div className="time-circle">
          <span className="time">
            {meal.hours}:{meal.minutes}
          </span>
        </div>
      ) : (
        <p>No meal found</p>
      )}
    </div>
  );
};

export default ShowMeal;
