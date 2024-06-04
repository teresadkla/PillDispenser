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

  const getTimePeriod = (hours) => {
    if (hours >= 6 && hours < 12) {
      return 'manhã';
    } else if (hours >= 12 && hours < 14) {
      return 'almoço';
    } else if (hours >= 14 && hours < 19) {
      return 'tarde';
    } else if (hours >= 19 && hours < 21) {
      return 'jantar';
    } else if (hours >= 21 && hours < 24) {
      return 'noite';
    } else {
      return 'madrugada';
    }
  };

  return (
    <div id="CardPlano">
      <ul>
        {meals.map((meal) => (
          <div id="card" key={meal.id}>
            <ul>
              <li>Name: {meal.name}</li>
              <li>
                Time: {meal.hours}:{meal.minutes} - {getTimePeriod(meal.hours)}
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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MealsHome;
