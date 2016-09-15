$.get('/api/games.xml', '', writeJSON, 'xml');

function writeJSON(result) {
  var out = [];
  $games = $(result).find('gamesList games game');
  $games.each(function() {
    var $game = $(this);
    var name = $game.find('name').text();
    var appID = '<a href="http://store.steampowered.com/app/';
    appID += $game.find('appID').text();
    appID += '"target="_blank">';
    appID += $game.find('appID').text();
    appID += '</a>';

    out.push({
      appID: appID,
      name: name
    });

  });
  console.log(JSON.stringify(out));
}
