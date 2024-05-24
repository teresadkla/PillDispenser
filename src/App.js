// import './App.css';
import './App.css';
import { Outlet } from 'react-router-dom';
import Nav from './shared/Nav';
import Home from './pages/Home'
function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
