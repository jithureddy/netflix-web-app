const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/styles', express.static( __dirname + '/styles' ));
app.use('/src', express.static( __dirname + '/src' ));
app.use('/assets', express.static( __dirname + '/assets' ));
app.use('/data', express.static(__dirname + '/data'));

//Parse post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () { console.log('Listening on ' + 3000) });