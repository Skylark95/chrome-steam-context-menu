chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.user) {
      var url = 'chrome-extension://' + chrome.runtime.id + '/api/games.xml';
      get(url, function(xml) {
          sendResponse({
            data: buildAndCacheResponse(xml)
          });
      });
      return true;
    }
});

function buildAndCacheResponse(xml) {
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
