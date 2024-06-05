import React, { useEffect, useState } from 'react';
import { getMeals } from '../../api/meals';
import { Link } from 'react-router-dom';

const imageMapping = {
  'manhã': './icons/manha.png',
  'almoço': './icons/almoço.png',
  'tarde': './icons/tarde.png',
  'jantar': './icons/jantar.png',
  'noite': './icons/noite.png',
  'madrugada': './icons/madrugada.png'
};

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

  const sortMealsByCurrentTime = (meals) => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return meals.slice().sort((a, b) => {
      const mealAMinutes = a.hours * 60 + a.minutes;
      const mealBMinutes = b.hours * 60 + b.minutes;
      
      const diffA = (mealAMinutes - currentMinutes + 1440) % 1440;
      const diffB = (mealBMinutes - currentMinutes + 1440) % 1440;
     
      return diffA - diffB;
    });
  };

  const sortedMeals = sortMealsByCurrentTime(meals);

  return (
    <div id="CardPlano">
      <ul>
        {sortedMeals.map((meal) => {
          const period = getTimePeriod(meal.hours);
          const imageUrl = imageMapping[period];
          
          return (
            <div id="card" key={meal.id}>
              <ul>
                <li className="meal-time">
                  <h5>{meal.hours}:{meal.minutes.toString().padStart(2, '0')} - {period}</h5>
                </li>
                <div id="meal-info">
                  <div className="meal-image">
                    <img src={imageUrl} alt={period} />
                  </div>
                  <div className="meal-details">
                    <li id="NomeMeal"><h4>Nome: {meal.name}</h4></li>
                    <li>
                      {meal.pills.map((pill) => (
                        <ul key={pill.id}>
                          <li id="NamePill"><h5>Comprimido: {pill.name}</h5></li>
                          <li id="ContainerHome"><h5>Container: {pill.container}</h5></li>
                        </ul>
                      ))}
                    </li>
                  </div>
                </div>
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MealsHome;
