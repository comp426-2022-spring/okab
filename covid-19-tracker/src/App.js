import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [state, setState] = useState([]); 
  document.title = "Okab COVID-19 Dashboard"

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
      {/* Header */}
        <div className="header">
          <h1>Okab COVID-19 Dashboard</h1>

      {/* User Sign Up and Log In Buttons */}
      <section id="user-sign-log-container">
        {/* Sign Up Button */}
        <button id="startSignUp">Sign Up</button>

        {/* Log In Button */}
        <button id="startLogIn">Log In</button>
      </section>

      <section id="firebaseui-auth-container"></section>

      {/* Title + select input drop down field */}
        <FormControl className='dropdown'>
          <Select variant= 'outlined' value= ''>
          <MenuItem name="USA">USA</MenuItem>
            {state.map((state) =>
            (<MenuItem name={state.name}>{state.name}</MenuItem>))}
            </Select> 

        </FormControl>
      
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