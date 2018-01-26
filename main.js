// Tried to make this a single page site for simplicity, using hashes
// Appended '-content' so has didn't scroll to the content using the href
// Jacob Brady

$(document).ready(function(){
  var hash = $(location).attr('hash');

  if (hash === ""){ // index.html defaults to home
    hash = "#home";
  }

  $('#content').html($(''+hash+'-content').html()); // load w/ correct content
  $('.navbar-nav a[href="'+hash+'"]').addClass('nav-active'); // highlight current section

  if(hash === '#products'){
    setupProjHandlers(hash);
  }

  // "switch page" -- spa version
  $('.nav-item').on('click', function() {
    // change nav-active highlight
    if ($(this).hasClass('nav-active')){
      return;
    }
    else {
      $('.nav-item').removeClass('nav-active');
      $(this).addClass('nav-active');

      // switch content
      var ref = $(this).attr('href');
      $('#content').html($(''+ref+'-content').html());

      if (ref === '#products') {
        setupProjHandlers(ref);
      }
    }
  });

  $('#tests').on('click', function() {
    alert("test clicked");

    $("#content").load( "/_dsm.html", function(){
      alert("he worked");
    });
  });



});


function setupProjHandlers(ref){ // because they can't init while hidden
  // when it starts showing, drop border radius
  $('.last-product').on('show.bs.collapse', function () {
    $('#last-product-header').addClass('rounded-0');
  });

  // when it finishes hiding, give back inherited border radius
  $('.last-product').on('hidden.bs.collapse', function() {
    $('#last-product-header').removeClass('rounded-0');
  });

  $('.product-header').on('click', function(){
    $('.product-header').not($(this)).removeClass('product-selected');
    $(this).toggleClass('product-selected');
  });

}
