var options = {
      b_steam: true,
      b_steamdb: true,
      b_steamdb_instant: false,
      b_isthereanydeal: true,
      b_options: true
    };

chrome.storage.sync.get(options, update_menus);
chrome.storage.onChanged.addListener(options_changed);

function options_changed(changes, areaName) {
  for(var opt in changes) {
    options[opt] = changes[opt].newValue;
  }
  update_menus(options);
}

function update_menus(results) {
  options = results;
  remove_all_menus(function() {
    if (options.b_steam) {
      create_steam_menu();
    }
    if (options.b_steamdb) {
      create_steamdb_menu();
    }
    if (options.b_isthereanydeal) {
      create_isthereanydeal_menu();
    }
    if (options.b_options) {
      create_options_menu();
    }
  });
}

function create_steam_menu() {
  chrome.contextMenus.create({
      "title": "Search Steam for '%s'",
      "contexts": ["selection"],
      "onclick": function (info) {
          chrome.tabs.create({url: 'http://store.steampowered.com/search/?term=' + encodeURIComponent(info.selectionText)});
      }
  });
}

function create_steamdb_menu() {
  var steamdb_url = options.b_steamdb_instant ? 'https://steamdb.info/instantsearch/?idx=steamdb&q=' : 'https://steamdb.info/search/?q=';
  chrome.contextMenus.create({
    "title": "Search SteamDB for '%s'",
    "contexts": ["selection"],
    "onclick": function (info) {
        chrome.tabs.create({url: steamdb_url + encodeURIComponent(info.selectionText)});
    }
  });
}

function create_isthereanydeal_menu() {
  chrome.contextMenus.create({
      "title": "Search IsThereAnyDeal for '%s'",
      "contexts": ["selection"],
      "onclick": function (info) {
          chrome.tabs.create({url: 'https://isthereanydeal.com/#/filter:&search/' + encodeURIComponent(info.selectionText) + ';/scroll:%23gamelist'});
      }
  });
}

function create_options_menu() {
  chrome.contextMenus.create({
    "title": "Change Visible Menus...",
    "contexts": ["selection"],
    "onclick": function (info) {
        chrome.runtime.openOptionsPage();
    }
  });
}

function remove_all_menus(callback) {
  chrome.contextMenus.removeAll(callback);
}
