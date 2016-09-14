$.get('/api/games.json', '', buildTable, 'json');

function buildTable(result) {
  $table = $('#games tbody');
  result.forEach(function(game) {
    var html = '<tr>';
    html += '<td><a href="http://store.steampowered.com/app/' + game.appID + '"target="_blank">' + game.name + '</a></td>';
    html += '</tr>';
    $table.append(html);
  });

  var options = {};
  if (window.location.search) {
    var queryRegex = new RegExp("^\\?.*q=([^&]*).*$"),
        query = window.location.search.match(queryRegex);

    if (query) {
      options.search = {
        "search": decodeURIComponent(query[1])
      };
    }
  }

  $table.parent().DataTable(options);
}
