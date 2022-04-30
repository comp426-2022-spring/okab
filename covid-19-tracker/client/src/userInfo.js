import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import {
    onAuthStateChanged,
    signOut,
    deleteUser,
    updateEmail,
    updatePassword
  } from "firebase/auth";
import { auth } from "./firebase";

function UserInfo() {

    document.title = "User Info | Okab COVID-19 Dashboard";
    document.body.style = 'background: rgb(35, 35, 35);';

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
      
    const logout = async () => {
        console.log("User signed out");
        await signOut(auth);
        navigate('/');
        console.log("User signed out");
        await signOut(auth);
        navigate('/');
        console.log("Navigating to Login page");
    };

    let navigate = useNavigate();

    return (
        <div>
            <h1 className='app__header'><br/>Okab COVID-19 Dashboard - User Info<br/><br/></h1>
            <br/>
            <h3 className='app__header'><br/>User Signed In As: {user?.email}<br/><br/></h3>
            <br/>
            <h4 className='app__header'><br/>Here you can update your account email, password, or delete your account.<br/><br/></h4>


            <div className='body'>
            {/* Update email */}
            <br/>
            <label id="upEmailMessage" className="upEmailMessage">Email successfully updated!</label>
            <div className='buttons'>
                <input 
                    placeholder="New Email"
                    id="upEmail"
                    onChange={(event) => {
                        setNewEmail(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        updateEmail(auth.currentUser, newEmail).then(() => {
                            // Email updated.
                            console.log("User email updated");
                            var upEmail = document.getElementById("upEmail");
                            var upEmailMessage = document.getElementById("upEmailMessage");
                            upEmail.value = "";
                            upEmailMessage.style.visibility = "visible";
                            navigate("/userinfo");
                        }).catch((error) => {
                            // An error occurred
                            console.log(error.message);
                        });
                    }}
                > Update Email
                </button>
            </div>

            {/* Update pw */}
            <br/>
            <label id="upPWMessage" className="upPWMessage">Password successfully updated!</label>
            <div className='buttons'>
                <input
                    placeholder="New Password"
                    id="upPW"
                    type="password" 
                    onChange={(event) => {
                        setNewPassword(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        updatePassword(user, newPassword).then(() => {
                            // Update successful.
                            console.log("User password updated");
                            var upPW = document.getElementById("upPW");
                            var upPWMessage = document.getElementById("upPWMessage");
                            upPW.value = "";
                            upPWMessage.style.visibility = "visible";
                        }).catch((error) => {
                            // An error ocurred
                            console.log(error.message);
                        });
                    }}
                > Update Password
                </button>
                <br/><br/>
            </div>

            {/* Delete user */}
            <div className='buttons'>
                <br/><br/>
                <button
                    onClick={() => {
                        deleteUser(user).then(() => {
                            // User deleted.
                            console.log("User deleted");
                            navigate('/');
                            console.log("Navigating to Login page");
                        }).catch((error) => {
                            // An error ocurred
                            console.log(error.message);
                        });
                    }}
                    > Delete Account
                </button>
            </div>
            </div>

            <div className='buttons'>
                {/* Sign Out */}
                <br />
                <button
                    onClick={logout}
                    > Sign Out 
                </button>
                  
                <button
                    onClick={() => {
                        navigate('/dashboard');
                        console.log("Navigating to Dashboard Home page");
                    }}
                    > Go to Dashboard Home
                </button>
                <br />
                <br />
            </div>
        </div>
    );
}

export default UserInfo;