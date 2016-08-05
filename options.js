function save_options() {
  chrome.storage.sync.set({
    b_steam: document.getElementById('b_steam').checked,
    b_steamdb: document.getElementById('b_steamdb').checked,
    b_options: document.getElementById('b_options').checked
  });
}

function restore_options() {
  chrome.storage.sync.get({
    b_steam: true,
    b_steamdb: true,
    b_options: true
  }, function(items) {
    document.getElementById('b_steam').checked = items.b_steam;
    document.getElementById('b_steamdb').checked = items.b_steamdb;
    document.getElementById('b_options').checked = items.b_options;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
var options = document.querySelectorAll('input[type="checkbox"]');
for (var i = 0; i < options.length; i++) {
  options[i].addEventListener('click', save_options);
}
