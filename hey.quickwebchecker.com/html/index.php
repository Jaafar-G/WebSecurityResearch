<?php
session_start();
require_once('/var/www/hey.quickwebchecker.com/html/config.php'); 
?>


<html>
  <head>
    <script>
	var interval = 1000;
	function life_time(argument) {
                var http = new XMLHttpRequest();
                var data = new Date().getTime();
		var url = 'lifetime.php';
		var params = 'data='+data;
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function() {//Call a function when the state changes.
    			if(http.readyState == 4 && http.status == 200) {
				//
    			}
		}
		http.send(params);
	  }
	setInterval(life_time, interval);
    </script>
  </head>
<body>
    Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, between the Canadian province of Ontario and the US state of New York. The largest is Horseshoe Falls, also known as Canadian Falls, which straddles the international border between Canada and the United States.[1] The smaller American Falls and Bridal Veil Falls lie entirely within the United States. Bridal Veil Falls are separated from Horseshoe Falls by Goat Island and from American Falls by Luna Island. Located on the Niagara River, which drains Lake Erie into Lake Ontario, the combined falls have the highest flow rate of any waterfall in North America that has a vertical drop of more than 50 metres (160 ft). During peak daytime tourist hours, more than 168,000 m3 (six million cubic feet) of water goes over the crest of the falls every minute.[2] Horseshoe Falls is the most powerful waterfall in North America, as measured by flow rate.[3] The falls are 27 kilometres (17 mi) north-northwest of Buffalo, New York, and 121 kilometres (75 mi) south-southeast of Toronto, between the twin cities of Niagara Falls, Ontario, and Niagara Falls, New York. Niagara Falls was formed when glaciers receded at the end of the Wisconsin glaciation (the last ice age), and water from the newly formed Great Lakes carved a path through the Niagara Escarpment en route to the Atlantic Ocean. Niagara Falls is famed both for its beauty and as a valuable source of hydroelectric power. Balancing recreational, commercial, and industrial uses has been a challenge for the stewards of the falls since the 19th century. ';

</body>

</html>
