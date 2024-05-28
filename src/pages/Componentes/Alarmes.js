import React from 'react';
function Alarmes({ momento, hora }) {
    return (
        <div id="ReminderDiv">
            <div class="LabelReminder">
                <h4>{momento}</h4>
                <h4>{hora}</h4>
            </div>
        </div>
    );
}

/*
 function ({argumento, argumento})
 */

export default Alarmes;