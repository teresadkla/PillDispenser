import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import AddMeal from './pages/AddMeal';
import ListMeals from './pages/ListMeals';
import AddPills from './pages/AddPills';
import CardPlano from './pages/Cardplano';
import Day from './pages/Day';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'add_meal',
        element: <AddMeal />
      },
      {
        path: 'list_meals',
        element: <ListMeals />
      },
      {
        path: 'add_pills',
        element: <AddPills />
      },
      {
        path: 'card',
        element: <CardPlano />
      },
      {
        path: 'day',
        element: <Day />
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
