$.get('/api/games.json', '', buildTable, 'json');

function buildTable(data) {
  var $table = $('#games tbody');
  var options = {
    data: data,
    deferRender: true,
    columns: [
      { data: 'appID', width: '45px' },
      { data: 'name' }
    ],
    pageLength: 15,
    lengthMenu: [[10, 15, 25, 50, 100, -1], [10, 15, 25, 50, 100, "All"]]
  };
  if (window.location.search) {
    var queryRegex = new RegExp("^\\?.*q=([^&]*).*$"),
        query = window.location.search.match(queryRegex);

    if (query) {
      options.search = {
        search: decodeURIComponent(query[1])
      };
    }
  }

  $table.parent().DataTable(options);
}
