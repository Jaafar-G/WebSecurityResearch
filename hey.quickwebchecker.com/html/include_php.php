<?php
session_start();
require_once('/var/www/hey.quickwebchecker.com/html/config.php'); 
?>
<html>
  <head>
    <link rel="shortcut icon" href="/myicon.png" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, shrink-to-fit=no">
    <script type="text/javascript">
     window.global_start_time = Date.now();
     window.global_current_url = window.location.href;

    var xhr1 = new XMLHttpRequest();
    var url1 = '/bfp/debug.php';
    xhr1.open('POST', url1, true);
    var time_taken = Date.now() - window.global_start_time;
    xhr1.send(window.global_current_url + " begin debug @ " + time_taken);

	var interval = 1000;
	function life_time(argument) {
                var http = new XMLHttpRequest();
                var data = new Date().getTime();
		var url = 'lifetime.php';
		var params = 'data='+data;
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.send(params);
	  }
    setInterval(life_time, interval);
    </script>


<!--<script src="/bfp/pngtoy.min.js"></script>-->
<script src="/bfp/pngtoy.js"></script>
<script src="/bfp/canvas-polyfills.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<script>
    try {
        // Text with lowercase/uppercase/punctuation symbols
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var txt = "BrowserLeaks,com <canvas> 1.0";
        canvas.setAttribute("width", 220);
        canvas.setAttribute("height", 30);
        ctx.textBaseline = "top";
        // The most common type
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        // Some tricks for color mixing to increase the difference in rendering
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        var cdata = canvas.toDataURL('image/png');
        console.log(cdata);

        cdata = atob(cdata.replace("data:image/png;base64,", ""));
        var raw_hash = CryptoJS.MD5(cdata);
        hash = raw_hash.toString(CryptoJS.enc.Hex);
        console.log(hash);


        var png = new PngToy([{ doCRC: "true" }]);
        png.fetchDataURL(cdata).then(
            function() {
                var crc = "";
                console.log(png.chunks.length);
                for (i=0; i < png.chunks.length; i++){
                    <!--console.log(png.chunks[i].name);-->
                    <!--console.log(png.chunks[i].crc.toString(16));-->
                    if (png.chunks[i].name == "IDAT") {
                        crc = png.chunks[i].crc.toString(16);
                        var xhr1 = new XMLHttpRequest();
                        var url1 = '/bfp/debug.php';
                        xhr1.open('POST', url1, true);
                        var time_taken = Date.now() - window.global_start_time;
                        xhr1.send(window.global_current_url + " cfp: " + crc + " @ " + time_taken);
                    }
                }
            });
    }
    catch (error) {
        // Do nothing
    }
</script>





    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/lato/latoFonts.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/font-awesome/css/font-awesome.min.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/custom.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/sb-admin.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/nav.css" media="screen">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- JS Fix for IE8 display bugs -->
    <!--[if lt IE 9]><script type="text/javascript" src="/javascripts/lib/html5shiv.min.js"></script><script type="text/javascript" src="/javascripts/lib/respond.min.js"></script><script type="text/javascript" src="/javascripts/lib/IECSSFix.js"></script><![endif]-->
    <!--[if IE 9]><link rel="stylesheet" type="text/css" href="/stylesheets/bootstrap-ie9.css" media="screen"><script type="text/javascript" src="/javascripts/lib/bootstrap-ie9.js"></script><![endif]-->
    <!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="/stylesheets/bootstrap-ie8.css" media="screen"><script type="text/javascript" src="/javascripts/lib/bootstrap-ie8.js"></script><![endif]-->
    <script type="text/javascript" src="/bfp/javascripts/lib/core.min.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/qsa-scope.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/classList.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/info.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/bfp/stylesheets/dataTables.bootstrap4.min.css" media="screen">
    <script type="text/javascript" src="/bfp/javascripts/lib/jquery.min.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/bootstrap4.bundle.min.js"></script>
    <script type="text/javascript" src="/bfp/dist/javascripts/utils/cookies.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/ua-parser.min.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/PluginDetect_All.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/canvasjs.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/utils/advert.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/utils/tools.js"></script>
    <script type="text/javascript" src="/bfp/dist/javascripts/fpAPI.js"></script>
    <script type="text/javascript" src="/bfp/dist/javascripts/fingerprint/js/fp.js"></script>
    <script type="text/javascript" src="/bfp/javascripts/lib/dataTables.bootstrap4.min.js"></script>

    <script type="text/javascript">
        window.onload = api.exec;
    </script>
  </head>
<body>
    Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, between the Canadian province of Ontario and the US state of New York. The largest is Horseshoe Falls, also known as Canadian Falls, which straddles the international border between Canada and the United States.[1] The smaller American Falls and Bridal Veil Falls lie entirely within the United States. Bridal Veil Falls are separated from Horseshoe Falls by Goat Island and from American Falls by Luna Island. Located on the Niagara River, which drains Lake Erie into Lake Ontario, the combined falls have the highest flow rate of any waterfall in North America that has a vertical drop of more than 50 metres (160 ft). During peak daytime tourist hours, more than 168,000 m3 (six million cubic feet) of water goes over the crest of the falls every minute.[2] Horseshoe Falls is the most powerful waterfall in North America, as measured by flow rate.[3] The falls are 27 kilometres (17 mi) north-northwest of Buffalo, New York, and 121 kilometres (75 mi) south-southeast of Toronto, between the twin cities of Niagara Falls, Ontario, and Niagara Falls, New York. Niagara Falls was formed when glaciers receded at the end of the Wisconsin glaciation (the last ice age), and water from the newly formed Great Lakes carved a path through the Niagara Escarpment en route to the Atlantic Ocean. Niagara Falls is famed both for its beauty and as a valuable source of hydroelectric power. Balancing recreational, commercial, and industrial uses has been a challenge for the stewards of the falls since the 19th century. ';
    <div id="page-wrapper">
        <div class="container-fluid" id="container-fluid">
            <div class="col-md-12 col-lg-8 offset-lg-2" id="content-page">
                <script>
                    var headers = {
                       // "host": "amiunique.org",
                       // "x-forwarded-proto": "https",
                       // "x-real-ip": "104.177.221.117",
                       // "x-forwarded-for": "104.177.221.117",
                       // "pragma": "no-cache",
                       // "cache-control": "no-cache",
                       // "upgrade-insecure-requests": "1",
                       // "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36",
                       // "sec-fetch-user": "?1",
                       // "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                       // "sec-fetch-site": "same-origin",
                       // "sec-fetch-mode": "navigate",
                       // "referer": "https://amiunique.org/",
                       // "accept-encoding": "gzip, deflate, br",
                       // "accept-language": "en-US,en;q=0.9",
                       // "cookie": "AmIUniqueId=824b19e6-a94b-401f-9294-5a370dc8a979; fpTime=1; cookie_notice=1"
                    }
                </script>
            </div>
        </div>
    </div>
</body>
</html>
