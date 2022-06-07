/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Davender Singh Student ID: 125700211 Date: 06-06-2022
*
*  Online (Heroku) URL: ________________________________________________________
*
*  GitHub Repository URL: ______________________________________________________
*
********************************************************************************/ 

var express = require("express") //server must make use of the "express" module
var app = express()
var PORT = process.env.PORT || 8080 //server must listen on process.env.PORT || 8080
var path = require('path');
var blogservice = require(__dirname + "/blog-service.js");

app.use(express.static('public'));

app.get('/', (req, res) => { //The route "/" must redirect the user 
  res.redirect('/about')
});
 app.get('/about', (req, res) => {
      res.sendFile(path.join(__dirname + "/views/about.html"));
  });

  app.get("/blog", (req, res) => { // Updating of new routes.
    blogservice.getPublishedPosts().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/posts", (req, res) => { // Updating of new routes.
  blogservice.getAllPosts().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/categories", (req, res) => { // Updating of new routes.
  blogservice.getCategories().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

PORT_LISTEN = () => {
  console.log('Express HTTP server listening on port', PORT)
} //The server is currently listening on (ie: 8080)
app.use((req, res) => {
    res.status(404).send("Error 404 , Page Not Found");
  });

  blogservice.initialize().then(() => { //call to the initialize() method 
    app.listen(PORT, PORT_LISTEN());
}).catch (() => {
    console.log('Error:- Server Not Started.');
});