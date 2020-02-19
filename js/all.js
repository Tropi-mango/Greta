$(document).ready(function() {

   //WOW JS 
	new WOW().init();
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
	//ANIMATED TEXT AFTER SLIDE ON CAROUSEL
	$('#owl-full').on('changed.owl.carousel', function(event) { 
		$('#owl-full').trigger('stop.owl.autoplay');
		$('.center-letter').hide();
        $('#owl-full').trigger('play.owl.autoplay');
        $('.center-letter').fadeIn(1000);
		anime.timeline({loop: false})
		  .add({
			targets: '.ml16 .letter',
			translateY: [-100,0],
			easing: "easeOutExpo",
			duration: 3000,
			delay: (el, i) => 20 * i
		  })
	});
    // INIT MAP
	coordonnees = {lat: 48.862725, lng: 2.287592};
	initMap(coordonnees);    
	//MAP CHANGE
    $('.map-city, .search-result-city').on('click', (function (e) {
    	e.preventDefault();
		if($(this).find('p').length !== 0){
			coordonnees = $(this).find('p').data('coordonnees');
		}else{
			coordonnees = $(this).data('coordonnees');
		}
		console.log(coordonnees);
    	latitude = coordonnees.split(",")[0];
    	latitude = parseFloat(latitude);
    	longitude = coordonnees.split(",")[1];
    	longitude = parseFloat(longitude);
    	coordonnees = {lat: latitude, lng: longitude};
    	initMap(coordonnees);
    }));

    //SEARCHING CITY
    $('#search_city').on('keyup', function (e) {
        e.preventDefault();
        $(".hidden-result-search-city").empty();
        var pattern = /^[A-Za-z0-9 '.-]+$/;
        var searchbar = $(this).val();
        if (searchbar == 0) {
            $('.hidden-result-search-city').hide();
        }
        if (searchbar.length == 1){
        	$('.hidden-result-search-city').fadeIn();
        	$(".hidden-result-search-city").append("<div class='search-result-city'><p style='margin: 0;'>Aucun resulats</p></div>");
        }else{
	        if (pattern.test(searchbar)) {
	            $('.hidden-result-search-city').fadeIn();
	            $(".hidden-result-search-city").empty();
			    $.ajax({
			        type: "GET",
				    url: "https://api.opencagedata.com/geocode/v1/json?q="+searchbar+"&key=a3fcb66166ad4de28939a60a4c267b20&language=fr&pretty=1",
			        dataType: "json",
			        success: function(data) {
			            if (data.status.code == 200) {
			                if (data.total_results >= 1) {
			                	var i;
								for (i = 0; i < data.results.length; ++i) {
				                	var city = data.results[i].components.city;
				                	var country = data.results[i].components.country;
		                    		var latitude = data.results[i].geometry.lat;
			                    	var longitude = data.results[i].geometry.lng;
				                	if (city != null){
				                		$(".hidden-result-search-city").append("<div class='search-result-city'><p style='margin: 0;' data-coordonnees='"+latitude+", "+longitude+"'>"+city +", "+ country.toUpperCase() + "</p></div>");
				                	}
								}
			                }
			            }
			        },
			        error: function() {
			        }
			    });
	        }
        }
    });
    //HIDE CONTAINER RESULT ON CLICK OUT
    $(document).mouseup(function (e) {
        e.preventDefault();
        var container = $(".hidden-result-search-city");
        var container2 = $("#search_city");
        if (!container.is(e.target) && container.has(e.target).length === 0 && !container2.is(e.target) && container2.has(e.target).length === 0  ) {
            $('.hidden-result-search-city').fadeOut();
        }
    });
    //SHOW CONTAINER RESULT IF IS'NT EMPTY
    $('#search_city').on('click', (function (e) {
		if($(this).val().length !== 0){
			$('.hidden-result-search-city').fadeIn();
		}
    }));
    //DISPLAY IN MAP AFTER SEARCH
    $('.hidden-result-search-city').delegate('.search-result-city','click',function(e){
    	e.preventDefault();
		if($(this).find('p').length !== 0){
			coordonnees = $(this).find('p').data('coordonnees');
		}
		$('.hidden-result-search-city').fadeOut();
    	latitude = coordonnees.split(",")[0];
    	latitude = parseFloat(latitude);
    	longitude = coordonnees.split(",")[1];
    	longitude = parseFloat(longitude);
    	coordonnees = {lat: latitude, lng: longitude};
    	initMap(coordonnees);
    });





});

	//MAP GOOGLE
	function initMap(coordonnees) {
	  var map = new google.maps.Map(
		  document.getElementById('map'), {zoom: 8, center: coordonnees});
	  var marker = new google.maps.Marker({position: coordonnees, map: map});
	}