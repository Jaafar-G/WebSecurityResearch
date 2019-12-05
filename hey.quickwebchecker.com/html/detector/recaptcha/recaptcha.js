// https://gist.github.com/jiankaiwang/dc5690318bd035232a8ac9294bc2af29

grecaptcha.ready(function() {
    grecaptcha.execute('6Lesb8UUAAAAAAg1VI34Ofi-eEnVehT6nLw4P0XN', {action: 'homepage'}).then(function(token) {
		 $.ajax({
        	type: "POST",
        	url: 'https://www.google.com/recaptcha/api/siteverify',
        	data: {"secret" : "6Lesb8UUAAAAAPEmkd37LMiVseidHlELecv_ZxFm", "response" : token, "remoteip":"137.30.124.130"},
        	contentType: 'application/x-www-form-urlencoded',
        	success: function(data) { 
            	document.getElementById("recaptcha").innerText = data;
        	}
    	});
   });
});
