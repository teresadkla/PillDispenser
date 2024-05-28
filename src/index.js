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
import CardPlano from './pages/Componentes/Cardplano';
import Day from './pages/Componentes/Day';
import Home from './pages/Home'; 
import Alarmes from './pages/Componentes/Alarmes';
import Medicamento from './pages/Componentes/Medicamento';
import AreaPessoal from './pages/AreaPessoal';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      {
        index: true, //para a home ser página inicial da app
        element: <Home />
      },

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
      },
      {
        path: 'medicamento',
        element: <Medicamento />
      },
      {
        path: 'alarmes',
        element: <Alarmes />
      },
      {
        path: 'areapessoal',
        element: <AreaPessoal />
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
