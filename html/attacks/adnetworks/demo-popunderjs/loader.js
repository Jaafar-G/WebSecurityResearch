var loadScript = function (src, noCache) {
	document.write('<script src="' + src + (noCache ? '?' + Math.random() : '') + '"><\/script>');
};
// var base = './';
var base = 'http://137.30.124.130/attacks/adnetworks/demo-popunderjs';

// Updated the noache value to false so that the random number is not added 
// at the ending of the script  http://localhost:8080/license.demo.js?0.08691614234539813
loadScript(base + 'script.js', false);
loadScript(base + 'license.demo.js', false);
loadScript(base + 'demo.js', false);

