// Selecionando elementos do DOM
let time = document.getElementById("time"); // Elemento que exibirá a hora atual
let dateInput = document.getElementById("alarmDate"); // Input para a data do alarme
let tInput = document.getElementById("alarmTime"); // Input para o horário do alarme
let btn = document.getElementById("setAlarm"); // Botão para definir o alarme
let contan = document.getElementById("alarms"); // Contêiner para listar os alarmes

// Variáveis para controle do tempo e dos alarmes
let interVal; // Variável para armazenar o intervalo de tempo até o alarme
let maxValue = 3; // Número máximo de alarmes permitidos
let cnt = 0; // Contador de alarmes definidos
let almTimesArray = []; // Array para armazenar os horários dos alarmes definidos

// Função para atualizar a hora atual exibida
function timeChangeFunction() {
    let curr = new Date();
    let hrs = curr.getHours();
    let min = String(curr.getMinutes()).padStart(2, "0");
    let sec = String(curr.getSeconds()).padStart(2, "0");
    let period = "AM";
    if (hrs >= 12) {
        period = "PM";
        if (hrs > 12) {
            hrs -= 12;
        }
    }
    hrs = String(hrs).padStart(2, "0");
    time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

function alarmSetFunction() {
    let now = new Date();
    let selectedDate = new Date(dateInput.value + "T" + tInput.value);

    // Verificando se a data e o horário foram preenchidos
    if (!dateInput.value || !tInput.value) {
        alert("Please select both date and time for the alarm.");
        return;
    }

    // Verificando se o horário do alarme é no futuro
    if (selectedDate <= now) {
        alert(`Invalid time. Please select a future date and time.`);
        return;
    }
    
    // Verificando se já existe um alarme definido para o mesmo horário
    if (almTimesArray.includes(selectedDate.toString())) {
        alert(`You cannot set multiple alarms for the same time.`);
        return;
    }
    
    /// Verificando se o número máximo de alarmes foi atingido
if (cnt < maxValue) {
    // Calculando o tempo até o alarme
    let timeUntilAlarm = selectedDate - now;

    // Criando uma nova div para representar o alarme na interface
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.innerHTML = `
        <span>
        ${selectedDate.toLocaleString()}
        </span>
        <button class="delete-alarm">
        Delete
        </button>
    `;
    
    // Adicionando um evento de clique ao botão de deletar o alarme
    alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
        // Removendo a div do alarme
        alarmDiv.remove();
        // Atualizando o contador de alarmes
        cnt--;
        // Cancelando o timeout do alarme
        clearTimeout(interVal);
        // Removendo o horário do alarme da lista de horários
        const idx = almTimesArray.indexOf(selectedDate.toString());
        if (idx !== -1) {
            almTimesArray.splice(idx, 1);
        }
    });
    
    // // Configurando o timeout para exibir o alerta quando o alarme disparar
    // interVal = setTimeout(() => {
    //     alert("Time to wake up!");
    //     // Removendo a div do alarme
    //     alarmDiv.remove();
    //     // Atualizando o contador de alarmes
    //     cnt--;
    //     // Removendo o horário do alarme da lista de horários
    //     const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
    //     if (alarmIndex !== -1) {
    //         almTimesArray.splice(alarmIndex, 1);
    //     }
    // }, timeUntilAlarm);
    

// Configurando o timeout para redirecionar para a nova página quando o alarme disparar
interVal = setTimeout(() => {
    // Removendo a div do alarme
    alarmDiv.remove();
    // Atualizando o contador de alarmes
    cnt--;
    // Removendo o horário do alarme da lista de horários
    const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
    if (alarmIndex !== -1) {
        almTimesArray.splice(alarmIndex, 1);
    }
    // Redirecionando para a nova página
    window.location.href = 'nova_pagina.html'; // Substitua 'nova_pagina.html' pelo URL da sua página HTML
}, timeUntilAlarm);





    // Adicionando a div do alarme ao contêiner de alarmes
    contan.appendChild(alarmDiv);
    
    // Atualizando o contador de alarmes e a lista de horários de alarme
    cnt++;
    almTimesArray.push(selectedDate.toString());
} else {
    // Exibindo um alerta quando o número máximo de alarmes é atingido
    alert("You can only set a maximum of 3 alarms.");
}

}

// Função para exibir os alarmes existentes
function showAlarmFunction() {
    let alarms = contan.querySelectorAll(".alarm");
    alarms.forEach((alarm) => {
        let deleteButton = alarm.querySelector(".delete-alarm");
        deleteButton.addEventListener("click", () => {
            alarmDiv.remove();
            cnt--;
            clearTimeout(interVal);
            const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
            if (alarmIndex !== -1) {
                almTimesArray.splice(alarmIndex, 1);
            }
        });
    });
}





// Chamada inicial para exibir a hora atual
timeChangeFunction();

// Atualização contínua da hora atual
setInterval(timeChangeFunction, 1000);

// Event listener para definir um novo alarme quando o botão é clicado
btn.addEventListener("click", alarmSetFunction);

// Chamada para exibir os alarmes existentes
showAlarmFunction();
