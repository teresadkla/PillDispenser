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

    setStatus(data.message)
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

    if (delta)
    setNumPills(numPills + delta);
  }

  return (
    <div>
      <h1>Add Meal</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Hours:
          <input type="number" value={hours} onChange={handleHoursChange} />
        </label>
        <br />
        <label>
          Minutes:
          <input type="number" value={minutes} onChange={handleMinutesChange} />
        </label>
        <br />
        <label>
          Pills:
          {Array.from({ length: numPills + 1 }, (_, i) => i).map(i => (
            <div key={i}>
              <label>
                Name:
                <input
                  type="text"
                  value={pills[i]?.name || ''}
                  onChange={(e) => handlePillsChange(i, 'name', e.target.value)}
                  key={i}
                />
              </label>
              <br />
              <label>
                Container:
                <input
                  type="text"
                  value={pills[i]?.container || ''}
                  onChange={(e) => handlePillsChange(i, 'container', e.target.value)}
                  key={i}
                />
              </label>
              <br />
              <br />
            </div>
          ))}
        </label>
        <button type="button" onClick={() => changeNumPills(1)}>
          Add Pill
        </button>
        <button type="button" onClick={() => changeNumPills(-1)}>
          Remove Pill
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default AddMeal;
