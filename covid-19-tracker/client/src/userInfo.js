import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import {
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
import { auth } from "./firebase";

function UserInfo() {

    document.title = "User Info | Okab COVID-19 Dashboard";
    document.body.style = 'background: rgb(35, 35, 35);';

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const logout = async () => {
        console.log("User signed out");
        await signOut(auth);
        navigate('/');
    };

    let navigate = useNavigate();

    return (
        <div>
            <h1 className='app__header'>Okab COVID-19 Dashboard - User Info</h1>
            <br/>
            <h3 className='app__header'> User Signed In As: {user?.email}</h3>

            <div className="app__header">
                {/* TODO: Delete user, update email, update pw */}
                

            </div>

            <div className='buttons'>
                {/* Sign Out */}
                <br />
                <button
                    onClick={logout}
                    > Sign Out 
                </button>
                
                <button
                    onClick={() => {navigate('/dashboard');}}
                    > Go to Dashboard
                </button>
                <br />
                <br />
            </div>
        </div>
    );
}

export default UserInfo;