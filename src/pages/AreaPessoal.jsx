import Alarmes from "./Componentes/Alarmes";
import Medicamento from "./Componentes/Medicamento";
import '../css/App.css';


function AreaPessoal() {
  
  return (
    <div id="area">
    <h2 id="AP">Área Pessoal</h2>
      <h3 id="medicamentos">Medicametos</h3>
       <Medicamento nome="Medicamento" />


       <h3 id="alarmes">Os seus alarmes!</h3>
      <Alarmes momento="Pequeno almoço" hora="8:15" />
    
    </div>
  );
}

export default AreaPessoal;
