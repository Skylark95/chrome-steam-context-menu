chrome.contextMenus.create({
    "title": "Search Steam for '%s'",
    "contexts": ["selection"],
    "onclick": function (info) {
        chrome.tabs.create({url: 'http://store.steampowered.com/search/?term=' + encodeURIComponent(info.selectionText)});
    }
});