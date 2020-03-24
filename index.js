// Require third-party modules
const express = require('express');
const request = require('request');
const fetch = require("node-fetch");

//config port for heroku and local use
const port = process.env.PORT || 3000

// Create new express app in 'app'
const app = express();
// Link the templating engine to the express app
app.set('view engine', 'ejs');
// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set('views', 'views');

// Tell express to use a 'static' folder
// If the url matches a file it will send that file
// Sending something (responding) ends the response cycle
app.use(express.static('public'));

// Create a home route
app.get('/', function(req, res) {
	let vin = "2GKFL8E59C6255721"
	let modelYear = "2012"
	fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}*BA?format=json&modelyear=${modelYear}`)
    .then(response => {
      return response.json();
    })

    .then(data => {
	  res.render("home", { carInfo:data })
	console.log(data.Results[0].Make, data.Results[0].Model)
    })
    .catch(err => {
      console.log(err);
    });
});

//Return a detail result page after search containing API data
app.get('/search', function(req, res) {
	let modelYear = "2010"
	fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${req.query.vinQuery}*BA?format=json&modelyear=${req.query.yearQuery}`)
    .then(response => {
      return response.json();
    })

    .then(data => {
	  res.render("searchResult", { carInfo:data })
	console.log(data.Results[0])
    })
    .catch(err => {
      console.log(err);
    });
});


// Set up server
app.listen(port, function() {
	console.log(`Application started on port: ${port}`);
});