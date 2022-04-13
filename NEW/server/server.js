const express = require('express')
const minimist = require('minimist')

// Require Express.js
const app = express()
const args = minimist(process.argv.slice(2))
args["port"];
var HTTP_PORT = args.port || 5000;


// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;       
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.post('/login', (req, res) => {
    
})    