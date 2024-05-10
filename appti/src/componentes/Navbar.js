import React from 'react';
function Navbar({ alarme, home, areaPessoal }) {
    return (
      <div>


        <h3>
          <a href={alarme}>Alarme</a>
        </h3>

        <h3>
          <a href={home}>Home</a>
        </h3>

        <h3>
          <a href={areaPessoal}>Área Pessoal</a>
        </h3>

        
      </div>
    );
  }
     /*
      nunca posso retornar duas divs 
      nunxa escrever mais de um componente por ficheiro 
      */
  
  

  export default Navbar;