  
$(document).ready(function() {  

  // OWL-CAROUSEL
  $("#owl-contact").owlCarousel({
	  pagination: false,
	  loop:true,
	  autoplay:true,
    dots: false,
    items: 4,
    slideBy: 2,
    autoplayTimeout:10000,
    rewindSpeed: 1000

	});
  $('#button-comment').on( 'click', function () {
    //$('#p').css('color', 'white');

    firstname = $('#firstname').val();
    subject = $('#subject').val();
    comment = $('#comment').val();

    $('#js-response-comment').append('<div class="card card-inner"><div class="card-body"><div class="row"><div class="col-md-2"><img src="../img/c.jpg" class="img img-rounded img-fluid" style="border-radius: 100%;"><p class="text-secondary text-center">15 Minutes Ago</p></div><div class="col-md-10"><p><a href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>'+firstname+'</strong></a></p><p>'+comment+'</p><p><a class="float-right btn btn-outline-primary ml-2"><i class="fa fa-reply"></i> Reply</a><a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a></p></div></div></div></div>');


  });

  
});

