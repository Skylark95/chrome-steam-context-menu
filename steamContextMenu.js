/*
 * Search Steam Context Menu
 */
chrome.contextMenus.create({
    "title": "Search Steam for '%s'",
    "contexts": ["selection"],
    "onclick": function (info) {
        chrome.tabs.create({url: 'http://store.steampowered.com/search/?term=' + encodeURIComponent(info.selectionText)});
    }
});

/*
 * Search Steam DB Context Menu
 */
chrome.contextMenus.create({
    "title": "Search Steam DB for '%s'",
    "contexts": ["selection"],
    "onclick": function (info) {
        chrome.tabs.create({url: 'https://steamdb.info/search/?q=' + encodeURIComponent(info.selectionText)});
    }
});
