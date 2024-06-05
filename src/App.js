import './css/App.css';
import { Outlet } from 'react-router-dom';
import Nav from './shared/Nav';
import { useAlarm } from './pages/AlarmContext';
import ShowMeal from './pages/showMeal';

function App() {
  const { currentAlarm } = useAlarm();

  return (
    <div className="App">
      <Nav />
      
      {/* se for verdadeiro mostra o alarme, se for falso mostra o conteudo do outlet */}

      {currentAlarm ? <ShowMeal meal={currentAlarm} /> : <Outlet />}
    </div>
  );
}

export default App;
