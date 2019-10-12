
var friends = require('../data/friends.js');

module.exports = function (app) {
  // //api path to get the friends data, responds with a json object (an array of friends). Activated on both html pages with blue API Link

  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  // *** Adds a JSON object to the array friends and sends back the json object of the most compatible new friend
  app.post('/api/friends', function (req, res) {

    console.log("entering post friend api");

    bestMatch = friends[closestIndex];

    // Put new friend from survey in "database" array
    friends.push(newFriend);

    // newFriend is the user that filled out the survey
    console.log("req.body: " + JSON.stringify(req.body));
    var newFriend = req.body;
    // compute best match from scores
    var bestMatch = {};

    for (var i = 0; i < newFriend.scores.length; i++) {
      if (newFriend.scores[i] == "1 (Strongly Disagree)") {
        newFriend.scores[i] = 1;
      } else if (newFriend.scores[i] == "5 (Strongly Agree)") {
        newFriend.scores[i] = 5;
      } else {
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
      }
    }

    console.log("Processing post friend api");
    // compare the scores of newFriend with the scores of each friend in the database and find the friend with the smallest difference when each set of scores is compared
    var closestIndex = 0;
    var totalDiff;


    var totalDiff = 0;
    var scoreDiff;
    for (var i = 0; i < 10; i++) {
      scoreDiff = Math.abs(friends[0].scores[i] - newFriend.scores[i]);
      totalDiff += scoreDiff;
    }
    console.log("index: 0 has the score: " + totalDiff);
    //debugger;
    console.log("totalDiff: ",totalDiff)
    closestDiff = totalDiff;

    //    var closestDiff = getFriendScore(closestIndex);

    for (var i = 1; i < friends.length-1; i++) {

      //totalDiff = getFriendScore(i);

      var totalDiff = 0;
      var scoreDiff;
      for (var j = 0; j < 10; j++) {
        scoreDiff = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
        totalDiff += scoreDiff;
      }
      console.log("index: " + i + " has the score: " + totalDiff);

      // if the totalDiff score is less than the best match so far
      // save that index and difference
      if (totalDiff < closestDiff) {
        console.log("index change: " + i)
        closestIndex = i;
        closestDiff = totalDiff;
      }
    }

    debugger;
    // the best match index is used to get the best match data from the friends index
    bestMatch = friends[closestIndex];

    // Put new friend from survey in "database" array
    friends.push(newFriend);

    // return the best match friend
    res.json(bestMatch);
  });

};

