# Documentation

## Install Instructions
### For frontend
You will need to install a few dependencies within client.\
Follow these commands if you are in the okab root directory.
```
cd covid-19-tracker
cd client
npm install
npm install firebase
npm install --save react@16.13.0 react-dom@16.13.0
npm install @material-ui/core
npm install react-router-dom@6
```
If you are already in the client subdirectory, just do the install comamands.

### For backend
You will need to install the following dependencies within server.\
From okab root directory:
```
cd covid-19-tracker
cd server
npm install better-sqlite3
npm install minimist
```
If you are already in the server subdirectory, just do the install comamands.

## Run Instructions
First you need to enter the covid-19-tracker subdirectory.
```
cd covid-19-tracker
```
Once you are in the covid-19-tracker subdirectory, split the terminal (right click terminal and click Split Terminal).\
In one half, enter the server subdirectory:
```
cd server
```
Then do:
```
node server.js
```
In the other half, enter the client subdirectory:
```
cd client
```
Then simply do npm start!
```
npm start
```
