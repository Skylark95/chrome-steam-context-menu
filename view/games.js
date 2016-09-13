$.get('/view/games.xml', '', buildTable, 'xml');

function buildTable(result) {
  console.log(result);
  $games = $(result).find('gamesList games game');
  $games.each(function() {
    $game = $(this);
    var html = '<tr>';
    html += '<td>' + $game.find('appID').text() + '</td>';
    html += '<td>' + $game.find('name').text() + '</td>';
    html += '</tr>';
    $('#games tbody').append(html);
  });
}
