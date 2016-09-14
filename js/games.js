$.get('/api/games.json', '', buildTable, 'json');

function buildTable(result) {
  $table = $('#games tbody');
  result.forEach(function(game) {
    var html = '<tr>';
    html += '<td><a href="http://store.steampowered.com/app/' + game.appID + '"target="_blank">' + game.name + '</a></td>';
    html += '</tr>';
    $table.append(html);
  });
  $table.parent().DataTable();
}
