// src/components/MealsHome.js
import React, { useEffect, useState } from 'react';
import { getMeals } from '../../api/meals';
import { Link } from 'react-router-dom';

const MealsHome = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals();
        setMeals(data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div id="CardPlano">
      <ul>
        {meals.map((meal) => (
          <div id="card" key={meal.id}>
            <ul>
              <li>Name: {meal.name}</li>
              <li>
                Time: {meal.hours}:{meal.minutes}
              </li>
              <li>
                Pills:
                {meal.pills.map((pill) => (
                  <ul key={pill.id}>
                    <li>Name: {pill.name}</li>
                    <li>Container: {pill.container}</li>
                    <br />
                    <div id="esp"></div>
                  </ul>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MealsHome;
