// Place your server entry point code here
// Require minimist module
const args = require('minimist')(process.argv.slice(2))
// See what is stored in the object produced by minimist
console.log(args)
// Store help text 
const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

// Require Express.js
var express = require("express")
const app = express()
const db = require('./database.js')
const morgan = require('morgan')
const fs = require('fs')

// Serve static HTML files
app.use(express.static('./public'));
// Allow JSON body messages on all endpoints
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

args["port"];
var HTTP_PORT = 5000;

if(args.log == 'false') {
    console.log("Not creating a new access.log")
}
else {
    // Use morgan for logging to files
    // Create a write stream to append (flags: 'a') to a file

    //./data/log/access.log
    const WRITESTREAM = fs.createWriteStream('access.log', { flags: 'a' })
    // Set up the access logging middleware
    app.use(morgan('combined', { stream: WRITESTREAM }))
}

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    res.json({"message":"Your API works! (200)"})
    res.status(200)
    });    

// default response for any other request
app.use(function(req, res){
    res.status(404).end('404 NOT FOUND')
})