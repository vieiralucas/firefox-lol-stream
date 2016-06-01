var url = 'https://api.twitch.tv/kraken/streams\?game\=League+Of+Legends' ;
var requestSettings = {
  method: 'GET',
  headers: new Headers({
    'Accept': 'application/vnd.twitchtv.v3+json'
  })
};

window.onload = function() {
  var ul = document.getElementById('ul');

  fetch(url, requestSettings)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var streams = data
        .streams
        .map(function(s) {
          return {
            link: s.channel.url,
            logo: s.channel.logo,
            name: s.channel.display_name,
            status: s.channel.status,
            viewers: s.viewers
          };
        });

      ul.innerHTML = streams.map(function(s) {
        return (
          '<li>' +
            '<a target="_blank" href="' + s.link + '">' +
              '<img src="' + s.logo + '"/>' +
              '<span class="name">' + s.name + '</span>' +
              '<span class="viewers">' + s.viewers + '</span>' +
            '</a>' +
          '</li>'
        );
      }).join('');
    });
}
