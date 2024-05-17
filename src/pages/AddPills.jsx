import React from "react";
import { useLocation } from "react-router-dom";
import { sendPillsInformation } from "../api/pills";

export const AddPills = () => {
  let { state } = useLocation();
  const meal = state.name;
  const [numPills, setNumPills] = React.useState(1);
  const [pills, setPills] = React.useState([
    {
      name: '',
      container: ''
    }
  ]);

  const handlePillsChange = (index, field, value) => {
    const updatedPills = [...pills];
    updatedPills[index] = {
      ...updatedPills[index],
      [field]: value
    };
    setPills(updatedPills);
  }

  const changeNumPills = (delta) => {
    if ((numPills + delta < 1) || (numPills + delta > 4)) {
      return;
    }

    if (delta)
    setNumPills(numPills + delta);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      pills: pills,
      meal: meal
    }
    sendPillsInformation(data);
    console.log(pills);
  }

  return (
    <div>
      <h1>Add Pills to Meal "{meal}"</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Pills:
            {Array.from({ length: numPills }, (_, i) => i).map(i => (
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
    </div>
  );
}

export default AddPills;
