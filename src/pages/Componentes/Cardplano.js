import React from 'react';
function Cardplano({ imagemSrc, nome, dose, tubo }) {
    return (
        <div id="CardPlano">
            <img src={imagemSrc} alt="Descrição da Imagem" />
            <div className="LabelPlano">
                <h4>{nome}</h4>
                <h4>{dose}</h4>
                <h4>{tubo}</h4>
            </div>
        </div>
    );
}

/*
 function ({argumento, argumento})
 */

export default Cardplano;