

/*========Initializing Jquery pluigins and other custom scripts========*/
( function( $ ) {
	"use strict";


	/*===================================
	Init Light Box
	===================================*/

	$('.pop-up').magnificPopup({
		type: 'inline',
		preloader: false,
		mainClass: 'mfp-fade',
		removalDelay: 300,
	});

	setTimeout(function () {
		$('.pop-up').magnificPopup('open');
	}, 200);

	$('.cta').on('click', function (e) {
		e.preventDefault();

		$('.pop-up').magnificPopup('close');
	});







}( jQuery ) );
