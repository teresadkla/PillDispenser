import '../ShowMeal.css';
import React, { useEffect, useState } from 'react';
import { getMeals } from '../api/meals';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Meal Information</h1>
      {meal ? (
        <div>
          <ul>
            <li>Name: {meal.name}</li>
            <li>
              Time: {meal.hours}:{meal.minutes}
            </li>
            <li>
              Pills:
              <ul>
                {meal.pills.map((pill) => (
                  <li key={pill.id}>
                    Name: {pill.name}, Container: {pill.container}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <Link to='/add_pills' state={meal}>Add Pills</Link>
        </div>
      ) : (
        <p>No meal found</p>
      )}
    </div>
  );
};

export default ShowMeal;
