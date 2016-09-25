chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.user) {
      chrome.storage.local.get({
        user: '',
        cacheTime: 0
      }, function(items) {
        if (items.user === request.user && !request.reload && (Date.now() - items.cacheTime) < 1800000) {
          chrome.storage.local.get('gameCache', function (cache) {
            sendResponse({
              data: cache.gameCache
            });
          });
        } else {
          var url = 'http://steamcommunity.com/id/' + request.user + '/games/?xml=1';
          get(url, function(xml) {
            sendResponse({
              data: buildAndCacheResponse(request.user, xml)
            });
          });
        }
      });
      return true;
    }
});

function buildAndCacheResponse(user, xml) {
  var parser = new DOMParser(),
      xmlDoc = parser.parseFromString(xml, 'text/xml'),
      games = xmlDoc.querySelectorAll('gamesList games game'),
      out = [];
  for (var i = 0; i < games.length; i++) {
    out.push({
      appID: buildAppID(games.item(i)),
      name: buildName(games.item(i))
    });
  }
  chrome.storage.local.set({
    user: user,
    cacheTime: Date.now(),
    gameCache: out
  });
  return out;
}

function buildAppID(game) {
  var id = nodeValue(game, 'appID');
  return href('http://store.steampowered.com/app/' + id, id);
}

function buildName(game) {
  return nodeValue(game, 'name');
}

function href(url, text) {
  return '<a href="' + url + '"target="_blank">' + text + '</a>';
}

function nodeValue(element, tagName) {
  return element.getElementsByTagName(tagName).item(0).childNodes[0].nodeValue;
}

function get(url, callback) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        callback.call(this, httpRequest.responseText);
      } else {
        console.error('Failed to load url: ' + url);
      }
    }
  };
  httpRequest.open('GET', url);
  httpRequest.send();
}
