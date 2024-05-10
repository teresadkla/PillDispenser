import React from 'react';
function Cardplano({ imagemSrc, nome, dose, tubo }) {
    return (
        <div>
            <img src={imagemSrc} alt="Descrição da Imagem" />
            <h4>{nome}</h4>
            <h4>{dose}</h4>
            <h4>{tubo}</h4>

        </div>
    );
}
/*
 function ({argumento, argumento})
 */

export default Cardplano;