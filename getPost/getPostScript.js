var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', 3000);

app.all('/', function(req, res) {
  if (req.method == "POST") {
    var pParams = [];
    for (var p in req.body){
      pParams.push({'name':p,'value':req.body[p]})
    }
    console.log(pParams);
    console.log(req.body);
    var context = {};
    context.dataList = pParams;
    res.render('POST', context);
  }
  if (req.method == "GET") {
    var qParams = [];
    for (var p in req.query){
      qParams.push({'name':p,'value':req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    res.render('GET', context);
  }
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
/*
$(function () {
  // Get the text for the Handlebars template from the script element.
  var templateText = $("#tableTemplate").html();
  
  // Compile the Handlebars template.
  var tableTemplate = Handlebars.compile(templateText);

  // Define an array of people.
  var people = [
    { "Id": 1, "First Name": "Anthony", "Last Name": "Nelson", "Age": 25 },
    { "Id": 2, "First Name": "Helen", "Last Name": "Garcia", "Age": 32 },
    { "Id": 3, "First Name": "John", "Last Name": "Williams", "Age": 48 }
  ];

  $("#people").html(tableTemplate({ array: people }));
});
*/