const DeviceDetector = require("device-detector-js");

const deviceDetector = new DeviceDetector();
const userAgent = navigator.userAgent;
const device = deviceDetector.parse(userAgent);

console.log(device);
document.getElementById("deviceDetector").innerText = device;
