$.get('/api/games.xml', '', writeJSON, 'xml');

function writeJSON(result) {
  var out = [];
  $games = $(result).find('gamesList games game');
  $games.each(function() {
    $game = $(this);
    out.push({
      appID: $game.find('appID').text(),
      name: $game.find('name').text()
    });
  });
  document.open();
  document.write('<pre>' + JSON.stringify(out) + '</pre>');
  document.close();
}
