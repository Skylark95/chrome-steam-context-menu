var params = window.location.search ? new URLSearchParams(window.location.search.slice(1)) : new URLSearchParams('');

$('#user-form').on('submit', function(e) {
  e.preventDefault();
  loadGamesForUser(this.user.value);
});

loadPage();

function loadPage() {
  var user = params.get('u'),
      reload = params.get('r') === '1';
  if (user) {
    $("#user-form input[name='user']").val(user);
    chrome.runtime.sendMessage({user: user, reload: reload}, function(response) {
      buildTable(response.data);
    });
  } else {
    $('#loading').addClass('hidden');
    $('#no-username').removeClass('hidden');
  }
}

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
  if (query) {
    options.search = {
      search: query
    };
  }
  $('#loading').addClass('hidden');
  $('#beta-warning').removeClass('hidden');
  $tbody.parent().removeClass('hidden');
  $tbody.parent().DataTable(options);
}

function loadGamesForUser(user) {
  params.set('u', user);
  params.set('r', '1');
  window.location.assign(window.location.pathname + '?' + params.toString());
}
