
/******  delete this comment - testing testing  *****/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log');
    }
  });
  next();
});

/******  UN-COMMENT THIS WHEN SITE NEEDS MANITANENCE    *****/
// app.use((req, res) => {
//     res.render('maintenance.hbs');
//   });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


var theYear = new Date().getFullYear();

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About'
  });
});


app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    message: 'welcome'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Sorry , this is an error page'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
