import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './App.css';

const App = () => {
  const [state, setState] = useState([]); 

  useEffect(() => {
    const getStateData = async() => {
      await fetch('https://disease.sh/v3/covid-19/states')
      .then((response) => response.json())
      .then((data) => {
        const states = data.map((state) => (
          {
            name: state.state,
          }
        ));
        setState(states)
      });
    };
    getStateData();
  }, [])

  return (
    <div className="app">
        <div className="header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='dropdown'>
            <Select variant= 'outlined' value= ''>
            <MenuItem name="USA">USA</MenuItem>
              {state.map((state) =>
              (<MenuItem name={state.name}>{state.name}</MenuItem>))}
              </Select> 

          </FormControl>
      {/* Header */}
      {/* Title + select input drop down field */}
      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* Tables */}
      {/* Graphs */}

      {/* Map */}

      </div>

    </div>
  );
}

export default App;
