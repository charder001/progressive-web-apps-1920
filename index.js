// Require third-party modules
const express = require('express');
const request = require('request');
const fetch = require("node-fetch");

// Config object
// const config = {
// 	port = process.env.PORT || 3000
// }

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


// Create a route for our overview page
app.get('/posts', function(req, res) {
	request('https://jsonplaceholder.typicode.com/posts', {json: true}, function (err, requestRes, body){
		if (err) {
			// We got an error
			res.send(err);
		} else {
			// Render the page using the 'posts' view and our body data
			res.render('posts', {
				title: 'Posts', // We use this for the page title, see views/partials/head.ejs
				postData: body
			});
		}
	});
});

// Create a route for our detail page
app.get('/post/:id', function(req, res) {
	request(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, {json: true}, function (err, requestRes, body){
		if (err) {
			// We got an error
			res.send(err);
		} else {
			// Render the page using the 'post' view and our body data
			res.render('post', {
				title: `Post ${req.params.id}`, 
				postData: body
			});
		}
	});
});

// Make sure to catch /post to /posts
app.get('/post', function(req, res) {
	// Redirect the client using res.redirect (this will create a new request)
	res.redirect('/posts');
});

// Actually set up the server
app.listen(port, function() {
	console.log(`Application started on port: ${port}`);
});