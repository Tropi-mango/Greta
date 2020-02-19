$(document).ready(function() {

  // OWL-CAROUSEL
  $("#owl-full").owlCarousel({
      singleItem: true,
	  pagination: false,
	  loop:true,
	  autoplay:true,
	  dots: false,
      autoWidth:true,
	  autoplayTimeout:10000,
      rewindSpeed: 1000

	});
	//SIZE OF IMG FULL SCREEN
	heightWindow = $(window).height();
	widthWindow = $(window).width();
	$(".owl-carousel .owl-item img").css('min-height',heightWindow + 'px');
	$(".owl-carousel .owl-item img").css('max-height',heightWindow + 'px');
	$(".owl-carousel .owl-item img").css('min-width',widthWindow + 'px');
	$(window).on('resize', function(){
      	heightWindow = $(window).height();
		widthWindow = $(window).width();
		$(".owl-carousel .owl-item img").css('min-height',heightWindow + 'px');
		$(".owl-carousel .owl-item img").css('max-height',heightWindow + 'px');
		$(".owl-carousel .owl-item img").css('min-width',widthWindow + 'px');
	});

	//NAV-BAR SHOW ON SCROLL
	$(window).scroll(function() {
		if($(window).scrollTop() > 0) {
			$(".primary-nav").addClass('active');
			$(".nav-collapse").addClass('active');
			$(".logo").addClass('active');
		} else {
			$(".primary-nav").removeClass('active');
			$(".nav-collapse").removeClass('active');
			$(".logo").removeClass('active');

		}
	});

		// LETTER ANIMATION
		var textWrapper = document.querySelectorAll('.ml16');
		//textWrapper.css('text-decoration',"underline");
		for (var i = 0, len = textWrapper.length; i < len; i++) {
			textWrapper[i].innerHTML = textWrapper[i].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
		}		
		anime.timeline({loop: false})
		  .add({
			targets: '.ml16 .letter',
			translateY: [-100,0],
			easing: "easeOutExpo",
			duration: 4000,
			delay: (el, i) => 30 * i
		  })


});
	//MAP GOOGLE
	function initMap() {
	  var uluru = {lat: -25.344, lng: 131.036};
	  var map = new google.maps.Map(
		  document.getElementById('map'), {zoom: 4, center: uluru});
	  var marker = new google.maps.Marker({position: uluru, map: map});
	}