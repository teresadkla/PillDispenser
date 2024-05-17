//import logo from './logo.svg';
import './Home.css';
import Cardplano from "./componentes/Cardplano";
import Day from "./componentes/Day";

function Home() {
  return (
    <div id="testedashboard">
      <h3>Olá, Teresa</h3>
      <h2>Hoje, 10 de maio</h2>
      <Day dia="16" diasemana="quinta" tubo="tubo x" />

      <h2>Plano de hoje</h2>
      <h6>Pequeno Almoço - 8h15min</h6>

      <Cardplano nome="Nomex" dose="1" tubo="tubo x" />
    </div>
  )
}

export default App;
