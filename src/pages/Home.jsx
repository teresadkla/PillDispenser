//import logo from './logo.svg';

import '../css/App.css';
import '../css/Home.css';
import Cardplano from "./Componentes/Cardplano";
import ReactWeeklyDayPicker from 'react-weekly-day-picker';

function Home() {
  const classNames = {
    container: 'my-container',
    prevWeekArrow: 'my-prev-week-arrow',
    nextWeekArrow: 'my-next-week-arrow',
    dayBox: 'my-day-box',
    dayCircleContainer: 'my-day-circle-container',
    dayCircle: 'my-day-circle',
    dayCircleTodayText: 'my-day-circle-today-text',
    dayCircleUnavailable: 'my-day-circle-unavailable',
    dayCircleUnavailableText: 'my-day-circle-unavailable-text',
    dayCircleSelected: 'my-day-circle-selected',
  };

  const today = new Date();
  const formattedToday = today.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    //year: 'numeric',
  });
  

  return (
    <div id="testedashboard">
      <h3 id="olauser">Olá, Teresa</h3>
      <h2 id="hoje">Hoje, {formattedToday}</h2>

      <ReactWeeklyDayPicker classNames={classNames} />

      {/* <Day dia="16" diasemana="quinta" tubo="tubo x" /> */}

      <h2 id="PlanoHoje">Plano de hoje</h2>
      <h6 id="refeicao">Pequeno Almoço - 8h15min</h6>

      <Cardplano nome="Nomex" dose="1" tubo="tubo x" />
      {/* <Navbar alarme="" home="" areaPessoal="" /> */}
    </div>
  );
}

export default Home;
