import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav id="navbar">
      
      <h4>
      <Link to="/add_meal">Alarme</Link>
        </h4>
        <h4>
        <Link to="/">Planeamento</Link> 
        </h4>
  

      {/* <ul>
        <li >
          <Link to="/add_meal">Add Meal</Link>
        </li>
        <li>
          <Link to="/list_meals">List Meals</Link>
        </li>
      </ul> */}
    </nav>
  );
};

export default Nav;
