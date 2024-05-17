import React, { useEffect, useState } from 'react';
import { getMeals } from '../api/meals';
import { Link } from 'react-router-dom';
import { AddPills } from './AddPills';

const ListMeals = () => {
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
    <div>
      <h1>List of Meals</h1>
      <ul>
        {meals.map((meal) => (
          <div>
            <ul>
            <li key={meal.id}>Name: {meal.name}</li>
            <li>
              Time: {meal.hours}:{meal.minutes}
            </li>
            <li>Pills
              {meal.pills.map((pill) => (
                <ul>
                  <li key={pill.id}>Name: {pill.name}</li>
                  <li>Container: {pill.container}</li>
                  <br />
                </ul>
              ))}
            </li>
            </ul>
            <Link to='/add_pills' state={ meal }>Add Pills</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListMeals;
