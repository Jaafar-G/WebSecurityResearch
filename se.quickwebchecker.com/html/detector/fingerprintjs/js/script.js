var getScreenSize = function () {
  if (window.screen.width > window.screen.height) {
    var screenSize = [window.screen.width, window.screen.height];
  } else {
    var screenSize = [window.screen.height, window.screen.width];
  }
  return screenSize;
}

var getAvailScreenSize = function () {
  if (window.screen.availWidth > window.screen.availHeight) {
    var availScreenSize = [window.screen.availWidth, window.screen.availHeight];
  } else {
    var availScreenSize = [window.screen.availHeight, window.screen.availWidth];
  }
  return availScreenSize;
}

var getCookiesEnabled = function() {
  var enabled = window.navigator.cookieEnabled;
  if(!enabled) {
    document.cookie = 'fpCookie';
    enabled = document.cookie.indexOf('fpCookie') != -1;
  }
  return enabled;
}

var getMathTan = function() {
  return Math.tan(-1e300);
}

var getDateFormat = function() {
  var date = new Date();
  date.setTime(0);
  return date.toLocaleString();
}

var getTouchCompatibility = function() {
  var maxTouchPoints = 0;
  var touchEvent = false;
  if (typeof window.navigator.maxTouchPoints !== "undefined") {
    maxTouchPoints = window.navigator.maxTouchPoints;
  } else if (typeof window.navigator.msMaxTouchPoints !== "undefined") {
    maxTouchPoints = window.navigator.msMaxTouchPoints;
  }
  try {
    document.createEvent("TouchEvent");
    touchEvent = true;
  } catch (e) {}
  var touchStart = "ontouchstart" in window;
  return [maxTouchPoints, touchEvent, touchStart]
}

var getLanguages = function() {
  var languages = [];
  languages.push(window.navigator.language);
  languages.push(window.navigator.languages);
  languages.push(window.navigator.userLanguage);
  languages.push(window.navigator.browserLanguage);
  languages.push(window.navigator.systemLanguage);
  return languages;
}

var hasLocalStorage = function() {
  var item = 'awesome_item';
  try {
    localStorage.setItem(item, item);
    localStorage.removeItem(item);
    return true;
  } catch (e) {
    return false;
  }
}

var hasSessionStorage = function() {
  var item = 'nice_item';
  try {
    sessionStorage.setItem(item, item);
    sessionStorage.removeItem(item);
    return true;
  } catch (e) {
    return false;
  }
}

var hasUserData = function() {
  return !!document.createElement('div').addBehavior;
}

var hasIndexedDB = function() {
  try {
    return !!window.indexedDB;
  } catch (e) {
    return true;
  }
}

var hasDoNotTrack = function() {
  return window.navigator.doNotTrack || window.navigator.msDoNotTrack || window.doNotTrack || undefined;
}

var getHardwareConcurrency = function () {
  return window.navigator.hardwareConcurrency;
}

var getCpuClass = function () {
  return window.navigator.cpuClass;
}

var getPlatform = function () {
  return window.navigator.platform;
}

var getPlugins = function() {
  var plugins = []
  if (window.navigator.plugins) {
    for (var i = 0; i < window.navigator.plugins.length; i++) {
      var plugin = window.navigator.plugins[i];
      var mt = plugin[0];
      if (plugin) {
        plugins.push(['>Plugin ' + i + ': ' + plugin.name, plugin.filename, plugin.description, mt.type, mt.suffixes].join(', '));
      }
    }
  }
  return plugins.length == 0 ? 'empty' : plugins.join(';;');
}

var getIEPlugins = function() {
  var result = []
  if ((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject')) || ('ActiveXObject' in window)) {
    var names = [
      'AcroPDF.PDF', // Adobe PDF reader 7+
      'Adodb.Stream',
      'AgControl.AgControl', // Silverlight
      'DevalVRXCtrl.DevalVRXCtrl.1',
      'MacromediaFlashPaper.MacromediaFlashPaper',
      'Msxml2.DOMDocument',
      'Msxml2.XMLHTTP',
      'PDF.PdfCtrl', // Adobe PDF reader 6-
      'QuickTime.QuickTime', // QuickTime
      'QuickTimeCheckObject.QuickTimeCheck.1',
      'RealPlayer',
      'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
      'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
      'Scripting.Dictionary',
      'SWCtl.SWCtl', // ShockWave player
      'Shell.UIHelper',
      'ShockwaveFlash.ShockwaveFlash', // flash plugin
      'Skype.Detection',
      'TDCCtl.TDCCtl',
      'WMPlayer.OCX', // Windows media player
      'rmocx.RealPlayer G2 Control',
      'rmocx.RealPlayer G2 Control.1'
    ]
    // starting to detect plugins in IE
    for(var i = 0; i < names.length; i++) {
      try {
        a = new window.ActiveXObject(names[i])
        result.push(names[i]);
      } catch (e) {
      }
    }
  }
  return result.length == 0 ? 'empty' : result;
}

var getWebGLVendor = function () {
  try {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return ctx.getParameter(ctx.getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL);
  } catch (e) {
    return 'not supported'
  }
}

var getWebGLRenderer = function () {
  try {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return ctx.getParameter(ctx.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);
  } catch (e) {
    return 'not supported'
  }
}

var getInstalledFontsJs = function() {
  var fontList = [
    "Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Ubuntu", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"
  ];

  var baseFonts = ["monospace", "sans-serif", "serif"];
  var testString = 'mmmmmmmmmmlli';
  var testSize = "72px";

  var h = document.getElementsByTagName("body")[0];

  var s = document.createElement("span");
  s.style.position = "absolute";
  s.style.left = "-9999px";
  s.style.lineHeight = 'normal'

  // css reset
  s.style.fontStyle = 'normal'
  s.style.fontWeight = 'normal'
  s.style.letterSpacing = 'normal'
  s.style.lineBreak = 'auto'
  s.style.lineHeight = 'normal'
  s.style.texTransform = 'none'
  s.style.textAlign = 'left'
  s.style.textDecoration = 'none'
  s.style.textShadow = 'none'
  s.style.whiteSpace = 'normal'
  s.style.wordBreak = 'normal'
  s.style.wordSpacing = 'normal'

  s.style.fontSize = testSize;
  s.innerHTML = testString;
  var defaultWidth = {};
  var defaultHeight = {};
  for (var index = 0, length = baseFonts.length; index < length; index++) {
    //get the default width for the three base fonts
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font

    defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
    h.removeChild(s);
  }
  var detect = function (font) {
    var detected = false;
    for (var index = 0, l = baseFonts.length; index < l; index++) {
      s.style.fontFamily = font + "," + baseFonts[index]; // name of the font along with the base font for fallback.
      h.appendChild(s);
      var matched = (s.offsetWidth !== defaultWidth[baseFonts[index]] || s.offsetHeight !== defaultHeight[baseFonts[index]]);
      h.removeChild(s);
      detected = detected || matched;
    }
    return detected;
  };

  var available = [];
  var jsInstalledFonts = '';
  for (var i = 0, l = fontList.length; i < l; i++) {
    if (detect(fontList[i])) {
      jsInstalledFonts += fontList[i];
      jsInstalledFonts += ';';
    }
  }
  return jsInstalledFonts;
}

function audioFp(callback) {
  var audio_output = 0;
  try {
    if (context = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100), !context) {
      audio_output = 0;
    }

    // Create oscillator
    oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setTargetAtTime(1e4, 0, 0.01);

    // Create and configure compressor
    compressor = context.createDynamicsCompressor();
    compressor.threshold && (compressor.threshold.setTargetAtTime(-50, 0, 0.01));
    compressor.knee && (compressor.knee.setTargetAtTime(40, 0, 0.01));
    compressor.ratio && (compressor.ratio.setTargetAtTime(12, 0, 0.01));
    compressor.reduction && (compressor.reduction.setTargetAtTime(-20, 0, 0.01));
    compressor.attack && (compressor.attack.setTargetAtTime(0, 0, 0.01));
    compressor.release && (compressor.release.setTargetAtTime(.25, 0, 0.01));

    // Connect nodes
    oscillator.connect(compressor);
    compressor.connect(context.destination);

    // Start audio processing
    oscillator.start(0);
    context.startRendering();
    context.oncomplete = function (evnt) {
      for (var i = 4500; 5e3 > i; i++) {
        audio_output += Math.abs(evnt.renderedBuffer.getChannelData(0)[i]);
      }
      compressor.disconnect();
      //console.log(audio_output);
      callback(audio_output);
    }
  } catch (e) {
    audio_output = 0;
  }
}

var canvas = document.createElement('canvas')
var getCanvasFp = function() {
  var result = []
  // Very simple now, need to make it more complex (geo shapes etc)
  canvas.width = 2000
  canvas.height = 200
  canvas.style.display = 'inline'
  var ctx = canvas.getContext('2d')
  // detect browser support of canvas winding
  // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
  ctx.rect(0, 0, 10, 10)
  ctx.rect(2, 2, 6, 6)
  result.push('canvas winding:' + ((ctx.isPointInPath(5, 5, 'evenodd') === false) ? 'yes' : 'no'))

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#f60'
  ctx.fillRect(125, 1, 62, 20)
  ctx.fillStyle = '#069'
  ctx.font = '13pt no-real-font-123'
  ctx.fillText('Overlay text on top of image \ud83d\udc3c\ud83d\ude04', 2, 20)
  ctx.fillStyle = 'rgba(102, 204, 0, 0.23456789)'
  ctx.font = '18pt Arial'
  ctx.fillText('Overlay text on top of image \ud83d\udc3c\ud83d\ude04', 4, 22)

  // canvas blending
  // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
  // http://jsfiddle.net/NDYV8/16/
  ctx.globalCompositeOperation = 'multiply'
  ctx.fillStyle = 'rgb(255,0,255)'
  ctx.beginPath()
  ctx.arc(50.123456789, 50, 50, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = 'rgb(0,255,255)'
  ctx.beginPath()
  ctx.arc(100, 50.456, 50, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = 'rgb(255,125,0)'
  ctx.beginPath()
  ctx.arc(75, 100, 50.789, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = 'rgb(125,0,255)'
  // canvas winding
  // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
  // http://jsfiddle.net/NDYV8/19/§
  ctx.arc(75, 75, 75, 0, Math.PI * 2, true)
  ctx.shadowBlur = 10;
  ctx.shadowColor = "blue";
  ctx.arc(75, 75, 25, 0, Math.PI * 2, true)
  ctx.fill('evenodd')

  if (canvas.toDataURL) { result.push('canvas fp:' + canvas.toDataURL()) }
  window.canvasThing = canvas;
  return md5(result.join('~'))
}

var getCookie = function(name) {
  match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if (match) return match[1];
}

var setCookie = function(key, value) {
  document.cookie = key + '=' + value;
}

var generateUuid = function() {
  var d = new Date();
  return d.getTime() + ':' + Math.random().toString().slice(2, 11);;
}

var dataList = {}

function execFingerPrint() {
  storeFingerprint();
}

function storeFingerprint() {

    try {
      var t0 = performance.now();

      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      dataList.timezone = new Date().getTimezoneOffset();
      dataList.screenSize = getScreenSize();
      dataList.availSize = getAvailScreenSize();
      dataList.colorDepth = window.screen.colorDepth;
      dataList.pixelRatio = window.devicePixelRatio;
      dataList.userAgent = window.navigator.userAgent;
      dataList.cookiesEnabled = getCookiesEnabled();
      dataList.mathtan = getMathTan();
      dataList.dateFormat = getDateFormat();
      dataList.touchCompatibility = getTouchCompatibility();
      dataList.languages = getLanguages();
      dataList.localStorage = hasLocalStorage();
      dataList.sessionStorage = hasSessionStorage();
      dataList.userData = hasUserData();
      dataList.indexedDB = hasIndexedDB();
      dataList.doNotTrack = hasDoNotTrack();
      dataList.hardwareConcurrency = getHardwareConcurrency();
      dataList.cpuClass = getCpuClass();
      dataList.platform = getPlatform();
      dataList.plugins = getPlugins();
      dataList.iePlugins = getIEPlugins();
      dataList.webGLVendor = getWebGLVendor();
      dataList.webGLRenderer = getWebGLRenderer();
      dataList.adBlock = document.getElementById('ads') ? false : true;
      dataList.installedFontsJs = getInstalledFontsJs();
      dataList.canvasFp = getCanvasFp();
      audioFp(showResults);

      var timeElapsed = performance.now() - t0;
      $('#timeElapsed').html('Time elapsed: ' + timeElapsed.toFixed(2) + 'ms');
    } catch (e) {

    }
  // }
}

var showResults = function(audioOutput) {
  dataList.audio = audioOutput;

  window.dataList = dataList;

  var htmlData = '';

  var fingerprint = JSON.stringify(dataList);

  if (getCookie('vfpc')) {
    var uuid = getCookie('vfpc');
  } else {
    var uuid = generateUuid();
    setCookie('vfpc', uuid);
  }

  for (var item in dataList) {
    //console.log(item + ': ' + dataList[item]);
    if(item === "canvasFp") {
      htmlData += '<tr><td>' + item + '</td><td>' + dataList[item] + '<br><div id="canvas-placeholder"></div></td></tr>';
    } else {
      htmlData += '<tr><td>' + item + '</td><td>' + dataList[item] + '</td></tr>';
    }
  }

  $('#fingerPrintdataTable').html(htmlData);
  document.getElementById('canvas-placeholder').appendChild(window.canvasThing);


// To Store in DB
  // $.ajax({
  //   type: "POST",
  //   url: "/store.php",
  //   dataType: "html",
  //   data: {
  //     "fingerprint": fingerprint,
  //     "uuid": uuid
  //   },
  //   cache: false,
  //   success: function () {
  //   }
  // });
}

