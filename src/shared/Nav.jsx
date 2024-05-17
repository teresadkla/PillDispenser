import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <h4>
          <a>Alarme</a>
        </h4>
        <h4>
          <a>Home</a>
        </h4>
        <h4>
          <a>Área Pessoal</a>
        </h4>

      <ul>
        <li >
          <Link to="/add_meal">Add Meal</Link>
        </li>
        <li>
          <Link to="/list_meals">List Meals</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
