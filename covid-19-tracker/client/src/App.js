import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import UserInfo from './UserInfo';
import Error from './Error';

const App = () => {

  document.title = "Okab COVID-19 Dashboard";
  document.body.style = 'background: rgb(35, 35, 35);';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;