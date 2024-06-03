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
          <div key={meal.id}>
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
                  </ul>
                ))}
              </li>
            </ul>
            <Link to='/add_pills' state={meal}>Add Pills</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MealsHome;
