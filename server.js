/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Davender Singh Student ID: 125700211 Date: 06-06-2022
*
*  Online (Heroku) URL: https://safe-spire-13493.herokuapp.com/
*
*  GitHub Repository URL: __________https://github.com/davender-singh1/web322---app____________________________________________
*
********************************************************************************/ 

var express = require("express");
var app = express();
var path = require('path');
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
var blogservice = require(__dirname + '/blog-service.js');

cloudinary.config({
    cloud_name: 'davender-singh1',
    api_key: '947759561438346',
    api_secret: 'd9wJh0bQG-feg449Dulivpjlo7g',
    secure: true
});

const upload = multer()

app.use(express.static('public'));

app.get('/', (req, res) =>
{
    res.redirect('/about')
});

app.get('/about', (req, res) => 
{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/blog", function (req, res)
{
    blogservice.getPublishedPosts().then(function(data)
    {
        res.json({data});
    }).catch(function(err) {
        res.json({message: err});
    })
});

app.get("/posts", function (req, res) {

    if (req.query.category) {
      blog. getPostsByCategory(req.query.category).then((data) => {
        res.json(data);
      }).catch(function(err){
        res.json({ message: err });
      })
    }

     else if (req.query.minDate) {
      blog. getPostsByMinDate(req.query.minDate).then((data) => {
        res.json(data);
      }).catch(function(err){
        res.json({ message: err });
      })
    }

    else {
      blogservice
        .getAllPosts()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ message: err });
      });
    }
  });

  app.get('/post/:id',(req,res)=>{

    blog.getPostById(req.params.id).then((data)=>{
 
     res.json(data);
    }) .catch(function (err) {
       res.json({ message: err });
     });
 
 
   });

app.get("/categories", function (req, res)
{
    blogservice.getCategories().then(function (data)
    {
        res.json({data});
    }).catch(function(err) {
        res.json({message: err});
    })
});


app.get('/posts/add', function (req,res)
{
res.sendFile(path.join(__dirname + "/views/addPost.html"));
});

app.post('/posts/add', upload.single("featureImage"), (req, res) => {

let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
    (error, result) => {
    if (result) {
    resolve(result);
    } else {
    reject(error);
         }
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
   };
   async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    return result;
   }
   upload(req).then((uploaded)=> {
    req.body.featureImage = uploaded.url;
    // TODO: Process the req.body and add it as a new Blog Post before redirecting to/posts
   });

})


app.get('*', function(req, res){
    res.status(404).send("Page Not Found!");
  });
blogservice.initialize().then(() => 
{
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log("ERROR : From starting the server");
});

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart(){
    console.log('Express http server listening on ' + HTTP_PORT);
}