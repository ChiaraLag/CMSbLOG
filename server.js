var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/blogArticoloModel'), //created model loading here
  bodyParser = require('body-parser');

  // mongoose instance connection url connection
mongoose.Promise = global.Promise;

urlString = "mongodb+srv://Gruppo4Admin:ArticoliPassUser@clusterarticoli.kmveb.mongodb.net/Database1?retryWrites=true&w=majority"
mongoose.connect(urlString); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  if (req.method === "OPTIONS"){
    return res.status(200).end();
  }
  next();
 })

var routes = require('./api/routes/blogArticoloRoutes'); //importing route

routes(app); //register the route

app.use(express.static(__dirname + '/public'));

path = require('path')


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname = "/index.html"))
    res.sendFile(path.join(__dirname = "/login.html"))
    res.sendFile(path.join(__dirname = "/articles.html"))
    res.sendFile(path.join(__dirname = "/article_page.html"))
    res.sendFile(path.join(__dirname = "/archived_articles.html"))
    res.sendFile(path.join(__dirname = "/css/style.css"))    
    res.sendFile(path.join(__dirname = "/css/style.css"))
    res.sendFile(path.join(__dirname = "/img/articoli.png"))
    res.sendFile(path.join(__dirname = "/img/autori.png"))
    res.sendFile(path.join(__dirname = "/img/tecnologia.png"))
    res.sendFile(path.join(__dirname = "/img/white.gif"))
})


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);



app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});