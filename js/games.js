var params = window.location.search ? new URLSearchParams(window.location.search.slice(1)) : new URLSearchParams('');

$.get('/api/games.json', '', buildTable, 'json');
$('#load').click(loadGamesForUser);

function buildTable(data) {
  var $tbody = $('#games tbody'),
      user = params.get('u'),
      query = params.get('q'),
      options = {
        data: data,
        deferRender: true,
        columns: [
          { data: 'appID', width: '45px' },
          { data: 'name' }
        ],
        pageLength: 15,
        lengthMenu: [[10, 15, 25, 50, 100, -1], [10, 15, 25, 50, 100, "All"]]
      };

  if (user) {
    $("#user").val(user);

    if (query) {
      options.search = {
        search: query
      };
    }
    $tbody.parent().removeClass('hidden');
    $tbody.parent().DataTable(options);
  } else {
    $('#no-username').removeClass('hidden');
  }
}

function loadGamesForUser() {
  console.log('load clicked!');
}
