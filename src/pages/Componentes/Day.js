import React from 'react';
function Day({ dia, diasemana }) {
    return (
        <div id="DiaDiv">
            <div className="LabelDia">
                <h3>{dia}</h3>
                <h4>{diasemana}</h4>
            </div>
        </div>
    );
}

/*
 function ({argumento, argumento})
 */

export default Day;