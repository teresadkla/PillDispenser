
let time = document.getElementById("time"); // Exibir a hora atual
let dateInput = document.getElementById("alarmDate"); // Input para a data do alarme
let tInput = document.getElementById("alarmTime"); // Input para o horário do alarme
let btn = document.getElementById("setAlarm"); // Botão para definir o alarme
let contan = document.getElementById("alarms"); //Listar os alarmes

// Variáveis para controle do tempo e dos alarmes
let interVal; // Variável para armazenar o intervalo de tempo até o alarme
let maxValue = 100; // Número máximo de alarmes permitidos
let cnt = 0; // Contador de alarmes definidos
let almTimesArray = []; // Array para armazenar os horários dos alarmes definidos

// Função para atualizar a hora atual 
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

    // Verifica se a data e o horário foram preenchidos
    if (!dateInput.value || !tInput.value) {
        alert("Por favor, preencha a data e hora!");
        return;
    }

    // Verifica se o horário do alarme é no futuro
    if (selectedDate <= now) {
        alert(`Tempo inválido.`);
        return;
    }
    
    // Verifica se já existe um alarme definido para o mesmo horário
    if (almTimesArray.includes(selectedDate.toString())) {
        alert(`Já existe um alarme definido para essa hora.`);
        return;
    }
    
    //Verifica se o número máximo de alarmes foi atingido
if (cnt < maxValue) {

    let timeUntilAlarm = selectedDate - now;

    // Criar uma nova div para mostrar o alarme na interface
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
    
    //Event Listener de click ao botão de apagar alarme
    alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
    
        alarmDiv.remove();
        // Atualizar o contador de alarmes qur agr é menos um 
        cnt--;
    
        clearTimeout(interVal);
        // Remove o horário do alarme da lista de horários
        const idx = almTimesArray.indexOf(selectedDate.toString());
        if (idx !== -1) {
            almTimesArray.splice(idx, 1);
        }
    });
    

// Configura o timeout para redirecionar para página quando o alarme disparar
interVal = setTimeout(() => {
    alarmDiv.remove();
    cnt--;
    // Remover o horário do alarme da lista de horários
    const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
    if (alarmIndex !== -1) {
        almTimesArray.splice(alarmIndex, 1);
    }
    // Redireciona para a página 
    window.location.href = 'lembrete.html'; 
}, timeUntilAlarm);



    // Adiciona a div do alarme ao container de alarmes
    contan.appendChild(alarmDiv);
    
    // Atualiza o contador de alarmes e a lista de horários de alarme
    cnt++;
    almTimesArray.push(selectedDate.toString());
} else {
    alert("Não pode definir mais de 100 alarmes");
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



