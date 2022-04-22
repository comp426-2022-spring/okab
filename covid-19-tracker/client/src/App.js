import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [state, setState] = useState([]); 
  document.title = "Okab COVID-19 Dashboard";
  document.body.style = 'background: rgb(35, 35, 35);';

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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

  const register = async () => {
    var signEMAIL = document.getElementById("signEMAIL");
    var signPW = document.getElementById("signPW");
    var signError = document.getElementById("signError");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("User registered");
      console.log(user);
      signEMAIL.value = "";
      signPW.value = "";
      signError.style.visibility = "hidden";
    } 
    catch (error) {
      console.log(error.message);
      signEMAIL.value = "";
      signPW.value = "";
      signError.style.visibility = "visible";
    }
  };

  const login = async () => {
    var logEMAIL = document.getElementById("logEMAIL");
    var logPW = document.getElementById("logPW");
    var logError = document.getElementById("logError");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("User logged in");
      console.log(user);
      logEMAIL.value = "";
      logPW.value = "";
      logError.style.visibility = "hidden";
    } 
    catch (error) {
      console.log(error.message);
      logEMAIL.value = "";
      logPW.value = "";
      logError.style.visibility = "visible";
    }
  };

  const logout = async () => {
    console.log("User signed out");
    await signOut(auth);
  };
  
  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Okab COVID-19 Dashboard</h1>
      </div>


      {/* User Sign Up and Log In Buttons */}
      {/* 
      
          Error cases
                1. Incorrect email or password when logging in
                2. Email already in use when signing up
                3. Invalid email (not in email format) when signing up
                4. Password not at least 6 letters long when signing up
                5. User logging out when not logged in

          TODO: Add ability to change user info and delete account

      */}
      <div className="buttons">
        <section id="user-sign-log-container">
          {/* Sign Up */}
          <div>
            <h3> Sign Up </h3>
            <label id="signError" class="signError">Error: Invalid Email and/or Password</label>
            <br/>
            <input
              placeholder="Email"
              id="signEMAIL"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="signPW"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />

            <button 
            onClick={register}
            > Create User</button>
          </div>

          {/* Log In */}
          <div>
            <br/>
            <h3> Login </h3>
            <label id="logError" class="logError">Error: Invalid Email and/or Password</label>
            <br/>
            <input
              placeholder="Email"
              id="logEMAIL"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="logPW"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />

            <button 
            onClick={login}
            > Login</button>
          </div>

          {/* Sign Out */}
          <br/>
          <h4> User Signed In As: </h4>
          {user?.email}

          <button 
          onClick={logout}
          > Sign Out </button>

        </section>
      </div>

      <section id="firebaseui-auth-container"></section>


      {/* Title + select input drop down field */}
      <div className="dropdown">
        <FormControl className='dropdown'>
          <Select variant= 'outlined' value= ''>
          <MenuItem name="USA">USA</MenuItem>
            {state.map((state) =>
            (<MenuItem name={state.name}>{state.name}</MenuItem>))}
            </Select> 
        </FormControl>
      </div>
      

      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}


      {/* Tables */}
      {/* Graphs */}


      {/* Map */}

    </div>
  );
}

export default App;