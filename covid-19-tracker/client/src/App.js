import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Table from './Table';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const[countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  document.title = "Okab COVID-19 Dashboard";
  document.body.style = 'background: rgb(35, 35, 35);';

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const[tableData, setTableData] = useState([]);

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
         // setTableData(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === `worldwide` ? `https://disease.sh/v3/covid-19/all` :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;


      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
  }


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
      <div className="app__left">
        <div className="app__header">
          <h1>Okab COVID-19 Dashboard</h1>
          <FormControl className='="app__dropdown'>
            <Select variant="outlined" onChange={onCountryChange} value={country}>

              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases}   total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} /> 
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
           {/* <Table countries={tableData}*/}
            <h3>Worldwide New Cases</h3>
          </CardContent>
      
        </Card>
        {/* Header */}



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
            <br />
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
            <br />
            <h3> Login </h3>
            <label id="logError" class="logError">Error: Invalid Email and/or Password</label>
            <br />
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
          <br />
          <h4> User Signed In As: </h4>
          {user?.email}

          <button
            onClick={logout}
          > Sign Out </button>

        </section>
      </div>

      <section id="firebaseui-auth-container"></section>

    </div>
  );
}

export default App;