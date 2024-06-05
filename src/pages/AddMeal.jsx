import '../css/addmeal.css';
import '../css/App.css';
import React, { useState } from 'react';
import sendMealInformation from '../api/meals';

const AddMeal = () => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [numPills, setNumPills] = useState(1);
  const [status, setStatus] = useState('');
  const [pills, setPills] = useState([
    {
      name: '',
      container: ''
    }
  ]);

  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value));
  };

  const handleMinutesChange = (e) => {
    setMinutes(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendMealInformation({
      name,
      hours,
      minutes,
      pills
    });

    setStatus(data.message);
  };

  const handlePillsChange = (index, field, value) => {
    const updatedPills = [...pills];
    updatedPills[index] = {
      ...updatedPills[index],
      [field]: value
    };
    setPills(updatedPills);
  };

  const changeNumPills = (delta) => {
    if ((numPills + delta < 1) || (numPills + delta > 4)) {
      return;
    }

    setNumPills(numPills + delta);
  }

  return (
    <div className="AddMeal">
      <h1>Adicionar Alarme</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Momento do dia</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="Horário">
          <div className="time-input">
            <input type="number" value={hours} onChange={handleHoursChange} />
            <span>Horas</span>
          </div>
          <div className="time-input">
            <input type="number" value={minutes} onChange={handleMinutesChange} />
            <span>Minutos</span>
          </div>
        </div>

        <div className="Medicamentos">
          <label>Medicamentos</label>
          {Array.from({ length: numPills }, (_, i) => (
            <div key={i} className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={pills[i]?.name || ''}
                onChange={(e) => handlePillsChange(i, 'name', e.target.value)}
              />
              <label>Nº Tubo</label>
              <input
                type="text"
                value={pills[i]?.container || ''}
                onChange={(e) => handlePillsChange(i, 'container', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => changeNumPills(1)}>
          + adicionar medicamento
        </button>
        <button type="button" onClick={() => changeNumPills(-1)}>
          - remover medicamento
        </button>
        <br />
        <button type="submit">Confirmar</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default AddMeal;
