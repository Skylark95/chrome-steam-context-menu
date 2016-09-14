$.get('/api/games.xml', '', writeJSON, 'xml');

function writeJSON(result) {
  var out = [];
  $games = $(result).find('gamesList games game');
  $games.each(function() {
    var $game = $(this);
    var name = '<a href="http://store.steampowered.com/app/';
    name += $game.find('appID').text();
    name += '"target="_blank">';
    name += $game.find('name').text();
    name += '</a>';

    out.push({
      name: name
    });

  });
  console.log(JSON.stringify(out));
}
