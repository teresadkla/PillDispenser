import React from 'react';
function Navbar({ alarme, home, areaPessoal }) {
    return (
      <div>


        <h4>
          <a href={alarme}>Alarme</a>
        </h4>

        <h4>
          <a href={home}>Home</a>
        </h4>

        <h4>
          <a href={areaPessoal}>Área Pessoal</a>
        </h4>

        
      </div>
    );
  }
     /*
      nunca posso retornar duas divs 
      nunxa escrever mais de um componente por ficheiro 
      */
  
  

  export default Navbar;