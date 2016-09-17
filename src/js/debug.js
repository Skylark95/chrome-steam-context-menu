$.get('/api/games.xml', '', writeJSON, 'xml');

function writeJSON(result) {
  var out = [];
  $games = $(result).find('gamesList games game');
  $games.each(function() {
    var $game = $(this);
    out.push({
      appID: buildAppID($game),
      name: buildName($game)
    });
  });
  console.log(JSON.stringify(out));
}

function buildAppID($game) {
  var id = $game.find('appID').text();
  return href('http://store.steampowered.com/app/' + id, id);
}

function buildName($game) {
  return $game.find('name').text();
}

function href(url, text) {
  return '<a href="' + url + '"target="_blank">' + text + '</a>';
}
