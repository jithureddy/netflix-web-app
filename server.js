const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const index = path.join(__dirname + '/index.html');
const externalSite = 'http://whatsonnetflix.com/netflix-hacks/the-netflix-id-bible-every-category-on-netflix/';


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
    res.sendFile(index);
});

app.get('/api/getCategories', function (request,response) {
    let bufferData = '';
    try {
        http.get(externalSite, function (res) {
            res.on('data', function (data) {
                bufferData += data;
                
            });
            res.on('end', function (data) {
                response.send(bufferData);                
            })
        });   
    }
    catch(Exception){
        response.status(500).send(Exception);
    }
});

app.listen(port, function () { console.log('Listening on ' + `${port}`) });