//Include the path package to get the correct file path
var path = require('path');
//***********************
// Routing
//***********************
module.exports = function(app) {
  // default or home page route
  app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/home.html'));
  });
  // Survey Page route - survery.html)
  app.get('/survey', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/survey.html'));
  });

  // If there is no matching route is found use the default page
  app.use(function (req, res) {
      res.sendFile(path.join(__dirname + '../public/home.html'));
  });
};

