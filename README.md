# Progressive Web Apps @cmda-minor-web · 2019-2020 - VinCheckup
![vcu (2)](https://user-images.githubusercontent.com/43436118/78034052-80537400-7367-11ea-8962-ec63ba7575a2.PNG)

## What does this app do?
The VinCheckup app allows the user to enter a vehicle VIN and build year in order to fetch information about that vehicle from a database using a fetch request.

## What API does this app use?
This app uses the vPic API which can be found at https://vpic.nhtsa.dot.gov/api/
There is no limit to how many requests one user can make to the API, however, they do expect larger batch requests to be done in lower-traffic times. More information can be found here https://vpic.nhtsa.dot.gov/api/Home/Index/FAQ.

## Features
Right now the user can enter a VIN and a model year to fetch data from the API. This will navigate the user to a detail page where more information is displayed. The visited pages are placed in the cache using a service worker, so they are available for offline viewing. This app also contains a manifest, which allows user to install the app to their device. Lastly, the critical render path of this application is optimized by using gulp to minimize and concatenate the CSS files.

## Installation
1. Open your terminal
2. Change directory to where you want to clone this repository, to the desktop for example

`cd desktop` 

3. Clone this repository

`git clone https://github.com/charder001/progressive-web-apps-1920`

4. Change direction into the newly created file

`cd progressive-web-apps-1920`

5. Install dependencies

`npm install`

6. Run application

`npm run`

## Learning goals
**1. I understand the difference between client side and server side rendering and can apply server side rendering by showing data from an API.**

With server side rendering, your HTML will get "made" before sending it out to the user. When moving between pages, the browser will make a new request from scratch to the server. One of the upsides to SSR is that the initial page load is faster than client side rendering, this makes them great for static sites. The downside, is that consecutive page loads are going to be slower, because the browser has to make request each time the page changes. 

Client side rendering, however, renders content in the browser using JavaScript. The upside to this is that when the page changes, the browser does NOT have to make an entirely new request to the server, making for a faster website after the initial load. The downside being that client side rendering can be slower on the intial load than SSR.

My application is able to show the homepage and detail pages containing API data whilst JavaScript is turned off by using server side rendering. To achieve this, the server utilizes express routing to handle get requests and rendering the page before sending it out to the client. This is great, because it allows the page to work when the user has JavaScript disabled or my JavaScript files don't (properly) load in.

**2. I understand the ins and outs of a service worker and can apply them in my application in a meaningful manner.**

A service worker acts like a proxy between the client and the server. Using service workers, we can (for example) intercept fetch requests and do all sorts of fun stuff with them. We could respond to the fetch request with files from our cache, compare different versions of our cache, show offline pages when fetch requests fail etc. 

In my application, the service worker caches all visited pages, which allows them to be viewed offline. When the user has no internet connection, the website will still have some use!

**3. I understand how the critical render path works and how it can be optimized.**

The critical rendering path is the steps a browser goes through to convert HTML, CSS and JavaScript into pixels on the screen. The reason we optimize the critical render path is to improve the render speed of our application.

We can optimize the critical render path by for example
* Concatenating files to reduce the amount of calls to the server
* Minify-ing your files to reduce unnecessary characters
* Compress the files that you send to the client, which can be uncompressed on arrival
* Reducing image sizes by downscaling the resolution or using different kinds of compression
* Optimizing load order so the most critical files arrive to the client first

In my Application, I have optmized the critical render path by concatenating and minify-ing my CSS files by using gulp and npm scripts as my task runner.

## To do
* Add google images API to load in images of vehicles
* Expand on styling
* Try out compressing files
* Add recent searches section


<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
