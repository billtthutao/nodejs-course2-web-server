const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerPartials(__dirname+'/views/partials');

app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url} \n`;
  console.log('first',log);
  fs.appendFile('requestLog.txt',log);
  next();
});

app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log('second',log);
  next();
});

//app.use((request,response,next) => {
//  response.render('maintance.hbs');
//});

app.use(express.static(__dirname + '/public'));

app.set('view engine',hbs);

app.get('/',(request,response) => {
  response.render('home.hbs',{
    pageTitle:'Welcome page',
    pageHeader:'Welcome page',
    welcomeMessage:'Welcome to my home page'
  });
});

app.get('/about',(request,response) => {
  response.render('about.hbs',{pageTitle:'About page',
                          pageHeader:'About page',
                          pagePara:'This is a about page'
  });
});

app.get('/bad',(request,response) => {
  response.send({
    errorMessage: 'Unable to handle the request'
  });
});

app.listen(3000,() => {
  console.log('Server is up on port 3000');
});
