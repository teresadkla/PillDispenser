import './App.css';
import { Outlet } from 'react-router-dom';
import Nav from './shared/Nav';
import { useAlarm } from './pages/AlarmContext';
import ShowMeal from './pages/showMeal';

function App() {
  const { currentAlarm } = useAlarm();

  return (
    <div className="App">
      <Nav />
      {currentAlarm ? <ShowMeal meal={currentAlarm} /> : <Outlet />}
    </div>
  );
}

export default App;
