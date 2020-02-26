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
    //GET GEOCODER (GEOMETRY LIBRARY)
    /*$.ajax({
        type: "GET",
	    url: "http://maps.google.com/maps/api/js?key=AIzaSyCxitB5jQcw7weQdg9MqBRfxr6mj81wT7I&libraries=geometry",
        dataType: "json",
        success: function(data) {
        },
        error: function() {
        }
    });*/

    // INIT MAP
    var locations = [
      ['Formations Amiens', 49.8941708, 2.2956951, 4],
      ['Formations Brest', 48.3905283, -4.4860088, 5],
      ['Formations Cuers city', 43.2372099, 6.072772, 3],
      ['Formations Springfield', 39.7990175, -89.6439575, 2],
      ['Formations Kingston', 17.9712148, -76.7928128, 4],
      ['Formations Moscou', 55.7504461, 37.6174943, 5],
      ['Formations Hanoi', 21.0294498, 105.8544441, 3],
      ['Formations Nice', 43.7009358, 7.2683912, 2],
      ['Formations Porto Rico', 18.2214172, -66.4132819, 5],
      ['Formations Medellin', 6.2443382, -75.573553, 3],
      ['Formations Rio', -22.9110137, -43.2093727, 2],
      ['Formations Marseille', 43.2961743, 5.3699525, 1]
    ];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: new google.maps.LatLng(48.8566969, 2.3514616),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    var infowindow = new google.maps.InfoWindow();
    var gmarkers, i;
    for (i = 0; i < locations.length; i++) {  
      gmarkers = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
      google.maps.event.addListener(gmarkers, 'click', (function(gmarkers, i) {
        return function() {
          map.panTo(this.getPosition());
		  map.setZoom(9);
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, gmarkers);
        }
      })(gmarkers, i));
    }



	//MAP CHANGE
    $('.map-city, .search-result-city').on('click', (function (e) {
    	e.preventDefault();
		if($(this).find('p').length !== 0){
			coordonnees = $(this).find('p').data('coordonnees');
		}else{
			coordonnees = $(this).data('coordonnees');
		}
    	latitude = coordonnees.split(",")[0];
    	latitude = parseFloat(latitude);
    	longitude = coordonnees.split(",")[1];
    	longitude = parseFloat(longitude);
    	coordonnees = {lat: latitude, lng: longitude};
        map.panTo(coordonnees);
		map.setZoom(9);
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

    //DISPLAY IN MAP AFTER SEARCH
    $('.hidden-result-search-city').delegate('.search-result-city','click',function(e){
    	e.preventDefault();
		if($(this).find('p').length !== 0){
			coordonnees = $(this).find('p').data('coordonnees');
		}
		$('.hidden-result-search-city').fadeOut();
    	latitudeUser = coordonnees.split(",")[0];
    	latitudeUser = parseFloat(latitudeUser);
    	longitudeUser = coordonnees.split(",")[1];
    	longitudeUser = parseFloat(longitudeUser);
    	coordonnees = {lat: latitudeUser, lng: longitudeUser};
      	Newmarkers = new google.maps.Marker({
        	position: new google.maps.LatLng(coordonnees),
        	map: map
      	});
      	infowindow.setContent("Vous êtes ici");
      	infowindow.open(map, Newmarkers);
    	Newmarkers.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        map.panTo(coordonnees);
		map.setZoom(9);
		destinationlatArray = [];
		destinationlngArray = [];
    	var y;
		for (y = 0; y < locations.length; ++y) {
			destinationlat = latitudeUser - (locations[y][1]) ;
			destinationlat = Math.abs(destinationlat);
			destinationlatArray.push(destinationlat);
			
			destinationlng = longitudeUser - (locations[y][2]) ;
			destinationlng = Math.abs(destinationlng);
			destinationlngArray.push(destinationlng);
		}
		var destinationlat = Math.min.apply(null, destinationlatArray);
		var destinationlng = Math.min.apply(null, destinationlngArray);

		var keyLat = destinationlatArray.indexOf(destinationlat);
		var keyLng = destinationlngArray.indexOf(destinationlng);

		if( keyLng == keyLat){
			latitudeDestination = locations[keyLat][1];
			longitudeDestination = locations[keyLng][2];
		    //DRAW ITINARY
		    var start = new google.maps.LatLng(latitudeUser, longitudeUser);
		    var end = new google.maps.LatLng(latitudeDestination, longitudeDestination);
		    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
		    directionsDisplay.setMap(map); // map should be already initialized.
		    var request = {
		        origin : start,
		        destination : end,
		        travelMode : google.maps.TravelMode.DRIVING
		    };
		    var directionsService = new google.maps.DirectionsService(); 
		    directionsService.route(request, function(response, status) {
		        if (status == google.maps.DirectionsStatus.OK) {
		            directionsDisplay.setDirections(response);
		        }else{
		        	alert("Erreur : Impossible de calculer l'itinéraire");
		        }
		    });
		}else{
			Destination = locations[keyLng][1] + locations[keyLng][2];
			Destination2 = locations[keyLat][1] + locations[keyLat][2];
			if (Destination > Destination2){
			latitudeDestination = locations[keyLng][1];
			longitudeDestination = locations[keyLng][2];

			    //DRAW ITINARY
			    var start = new google.maps.LatLng(latitudeUser, longitudeUser);
			    var end = new google.maps.LatLng(latitudeDestination, longitudeDestination);
			    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
			    directionsDisplay.setMap(map); // map should be already initialized.
			    var request = {
			        origin : start,
			        destination : end,
			        travelMode : google.maps.TravelMode.DRIVING
			    };
			    var directionsService = new google.maps.DirectionsService(); 
			    directionsService.route(request, function(response, status) {
			        if (status == google.maps.DirectionsStatus.OK) {
			            directionsDisplay.setDirections(response);
			        }else{
			        	alert("Erreur : Impossible de calculer l'itinéraire");
			        }
			    });
			}else{
			
				latitudeDestination = locations[keyLat][1];
				longitudeDestination = locations[keyLat][2];
			    //DRAW ITINARY
			    var start = new google.maps.LatLng(latitudeUser, longitudeUser);
			    var end = new google.maps.LatLng(latitudeDestination, longitudeDestination);
			    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
			    directionsDisplay.setMap(map); // map should be already initialized.
			    var request = {
			        origin : start,
			        destination : end,
			        travelMode : google.maps.TravelMode.DRIVING
			    };
			    var directionsService = new google.maps.DirectionsService(); 
			    directionsService.route(request, function(response, status) {
			        if (status == google.maps.DirectionsStatus.OK) {
			            directionsDisplay.setDirections(response);
			        }else{
			        	alert("Erreur : Impossible de calculer l'itinéraire");
			        }
			    });
			}
		}
    });

	//GET USER IP AND LOCATION
	$('.p-locate').on('click', (function (e) {
	navigator.geolocation.watchPosition(function(position) {
		$("html, body").animate({ scrollTop: $(document).height() }, 1500);
	    console.log("i'm tracking you!");
	    navigator.geolocation.getCurrentPosition(showPosition);
		coordonnees = $("#location-user").val();
		latitudeUser = coordonnees.split(",")[0];
		latitudeUser = parseFloat(latitudeUser);
		longitudeUser = coordonnees.split(",")[1];
		longitudeUser = parseFloat(longitudeUser);
    	coordonnees = {lat: latitudeUser, lng: longitudeUser};
      	NewmarkersUser = new google.maps.Marker({
        	position: new google.maps.LatLng(coordonnees),
        	map: map
      	});
      	infowindow.setContent("Vous êtes ici");
      	infowindow.open(map, NewmarkersUser);
    	NewmarkersUser.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        map.panTo(coordonnees);
		map.setZoom(9);
		destinationlatArray = [];
		destinationlngArray = [];
    	var y;
		for (y = 0; y < locations.length; ++y) {
			destinationlat = latitudeUser - (locations[y][1]) ;
			destinationlat = Math.abs(destinationlat);
			destinationlatArray.push(destinationlat);
			
			destinationlng = longitudeUser - (locations[y][2]) ;
			destinationlng = Math.abs(destinationlng);
			destinationlngArray.push(destinationlng);
		}
		var destinationlat = Math.min.apply(null, destinationlatArray);
		var destinationlng = Math.min.apply(null, destinationlngArray);

		var keyLat = destinationlatArray.indexOf(destinationlat);
		var keyLng = destinationlngArray.indexOf(destinationlng);

		if( keyLng == keyLat){
			latitudeDestination = locations[keyLat][1];
			longitudeDestination = locations[keyLng][2];
		    //DRAW ITINARY
		    var start = new google.maps.LatLng(latitudeUser, longitudeUser);
		    var end = new google.maps.LatLng(latitudeDestination, longitudeDestination);
		    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
		    directionsDisplay.setMap(map); // map should be already initialized.

		    var request = {
		        origin : start,
		        destination : end,
		        travelMode : google.maps.TravelMode.DRIVING
		    };
		    var directionsService = new google.maps.DirectionsService(); 
		    directionsService.route(request, function(response, status) {
		        if (status == google.maps.DirectionsStatus.OK) {
		            directionsDisplay.setDirections(response);
		        }else{
		        	alert("Erreur : Impossible de calculer l'itinéraire");
		        }
		    });
		}else{
			alert("Erreur : Impossible de calculer l'itinéraire");
		}
	  },
	  function(error) {
	    if (error.code == error.PERMISSION_DENIED)
	      console.log("you denied me :-(");
	  });
	    /*if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(showPosition);
	    } else { 
	      $.get("http://ipinfo.io", function (response) {
		    $("#ip").html("IP: " + response.ip);
		    $("#adress").html("Location: " + response.loc + ", " + response.region);
		    $("#details").html(JSON.stringify(response.loc, null, 4));
		    $("#location-user").val(response.loc);
		  }, "jsonp");
			coordonnees = $("#location-user").val();
			latitude = coordonnees.split(",")[0];
			console.log(latitude);
			latitude = parseFloat(latitude);
			longitude = coordonnees.split(",")[1];
			console.log(longitude);
			longitude = parseFloat(longitude);
	    	coordonnees = {lat: latitude, lng: longitude};
	      	NewmarkersUser = new google.maps.Marker({
	        	position: new google.maps.LatLng(coordonnees),
	        	map: map
	      	});
	      	infowindow.setContent("Vous êtes ici");
	      	infowindow.open(map, NewmarkersUser);
	    	NewmarkersUser.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
	        map.panTo(coordonnees);
			map.setZoom(9);
	    }*/

	}));


});

function showPosition(position) {
	$("#location-user").val(position.coords.latitude +','+ position.coords.longitude);

}

//MAP GOOGLE
/*function initMap(coordonnees) {
  var map = new google.maps.Map(
	  document.getElementById('map'), {zoom: 8, center: coordonnees});
  var marker = new google.maps.Marker({position: coordonnees, map: map});
}*/

