const BotDetector = require("device-detector-js/dist/parsers/bot");

const botDetector = new BotDetector();
const userAgent = navigator.userAgent;
const bot = botDetector.parse(userAgent);

console.log(bot);

if (bot) {
  document.getElementById("userAgentDetector").innerText = bot;
} else {
	document.getElementById("userAgentDetector").innerText = "Not likely a bot: " + bot;
}
