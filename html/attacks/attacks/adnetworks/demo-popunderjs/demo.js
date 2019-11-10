(function (BetterJsPop) {
  var base = 'http://137.30.124.130/attacks/network/demo-popunderjs';
  var type = (window.location.search.match(/type=([^$&]+)/) || ['', ''])[1].toLowerCase();
  var expires = parseInt((window.location.search.match(/expires=([^$&]+)/) || ['', 10])[1], 15);

  var popOpts = {};
  var getPopUrl = function () {
    var urls = [
      base + 'result.html?1',
      base + 'result.html?2'
    ];
    if (!!~window.location.href.indexOf('checkref')) {
      // return 'https://www.whatismyreferer.com/';
    }

    return urls[Math.floor(Math.random() * urls.length)];
  };

  if (/^(localhost|192\.168\.|127\.0\.0\.)/.test(window.location.host)) {
    // base = window.location.pathname.replace(/[^/]+$/g, '');
  }
  switch (type) {
  case 'popup':
    popOpts = {newTab: false, under: false};
    break;

  case 'tabunder':
    popOpts = {newTab: true, under: true};
    break;

  case 'tabup':
    popOpts = {newTab: true, under: false};
    break;

  default:
    popOpts = {};
  }

  BetterJsPop
    .config({
      ignoreTo: ['.edd_download_purchase_form'],
      perpage: 2,
      coverTags: ['iframe'],
      mobileSensitive: 15
    })
    .add(getPopUrl, BetterJsPop.Utils.merge(popOpts, {
      cookieExpires: expires,
      cookieDomain: '.' + window.location.hostname.replace(/^code\./, ''),
      beforeOpen: function (url, options) {
        // `this` inside this function is reference of pop object
        console.log('before open pop', options.name);
        // you can use both way to get current popOpts
        console.log('this.getOptions()', this.getOptions());
        console.log('options param', options);
      },
      afterOpen: function (url, options, popWin) {
        console.log('after open pop', options.name, popWin);
        // wait for 3 seconds then close popped window.
        // setTimeout(function() {
        //   popWin.close();
        // }, 3e3);

        // you also can use this method to track pop impressions
        // jQuery.get('http://your-track-url');
      }
    }));
}(window.BetterJsPop));

