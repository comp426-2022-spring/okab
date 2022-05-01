import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Table from './Table';
import React, { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {sortData} from "./util";
import LineGraph from "./LineGraph";

function Dashboard() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const[countryInfo, setCountryInfo] = useState({});

  const[tableData, setTableData] = useState([]);
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  document.title = "Dashboard | Okab COVID-19 Dashboard";
  document.body.style = 'background: rgb(35, 35, 35);';

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

            const sortedData = sortData(data);
            setTableData(sortedData);
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

    let navigate = useNavigate();

    return (
        <div className="app__left">

          <div className="app__header">
            <h1 className='app__header'><br/>Okab COVID-19 Dashboard - Home<br/><br/></h1>
          </div>

          <br/>

          <div className="app__header">
            <FormControl className='="app__dropdown'>
              <Select variant="outlined" onChange={onCountryChange} value={country}>

                <MenuItem value="worldwide">Worldwide</MenuItem>

                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}

              </Select>
            </FormControl>
            <br/><br/><br/><br/>
          </div>

          <div className="app__header">
            <br/>
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
              <Table countries={tableData} />



            </CardContent>
          </Card>
          <div className="app__header">
            <br/>
          </div>
          

          <br/>
          <h5 className='app__header'><br/>Info On Covid-19 Testing and Vaccines from WHO<br/><br/></h5>
          <div className="buttons">
            <br/>
            <button
              onClick={() => {
                window.location.href = "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines";
                console.log("Navigating to WHO Vaccine Page");
              }}
            > Learn more about Covid-19 Vaccines
            </button>
            <br/>
            <br/>
            <button
              onClick={() => {
                window.location.href = "https://www.who.int/westernpacific/emergencies/covid-19/information/covid-19-testing";
                console.log("Navigating to WHO Testing Page");
              }}
            > Learn more about Covid-19 Testing
            </button>
            <br/>
            <br/>
          </div>


          <br/>
          <h5 className='app__header'><br/>User Info Page: Update user email/password, delete account, sign out<br/><br/></h5>
          <div className="buttons">
            <br/>
            <button
              onClick={() => {
                navigate('/userinfo');
                console.log("Navigating to User Info page");
              }}
            > Go to User Info Page
            </button>
            <br/>
            <br/>
          </div>

        </div>
    );
}

export default Dashboard;