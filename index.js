const express = require('express');
var bodyParser = require('body-parser');
var ip2loc = require("ip2location-nodejs");
const App = express();
const https = require('https');
const fs = require('fs');

// Create application/json parser
App.use(bodyParser());
App.use(bodyParser.urlencoded({extended: true}));

//Get Ip adress

App.get('/getIP', getClientIP);

function getClientIP(req, res, next) {
  var ip = req.ip;
  //var ip = '::ffff:103.229.83.102';
  var realIp = ip.split(":").reverse()[0];

  ip2loc.IP2Location_init('./src/IP2LOCATION-LITE-DB9.BIN');
  result = ip2loc.IP2Location_get_all(realIp);
  res.send({ip : result.ip, country_short : result.country_short,country_long : result.country_long,
    region : result.region, city : result.city, latitude : result.latitude, longitude : result.longitude , zipcode : result.zipcode,
    status : result.status});
  
}


//App.listen("3001",()=>console.log("Connected !!"));

// we will pass our 'app' to 'https' server
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'SULTAN16407916'
}, App)
.listen(80);