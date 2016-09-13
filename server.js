var express = require('express');
var request = require('request');

var app = express();
app.use('/view', express.static('view'));
app.use('/id/:id/games', function(req, res) {
  var url = 'http://steamcommunity.com/id/' + req.params.id + '/games/?xml=1';
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);
