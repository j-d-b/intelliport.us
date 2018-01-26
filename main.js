// Tried to make this a single page site for simplicity, using hashes
// Appended '-content' so has didn't scroll to the content using the href
// Jacob Brady

$(document).ready(function(){

  // Determine which content to display on page load by url hash
  var hash = $(location).attr('hash');
  displayContent(hash);

  // "switch page" -- spa version
  $('.nav-item').on('click', function() {
    // if product page, can return to products
    var hash = $(location).attr('hash');
    if (hash === '#dsm-page' || hash === '#crm-page') {
      $('#content').html($('#products-content').html());
      setupProjHandlers();
      return;
    }
    // change nav-active highlight
    var ref = $(this).attr('href');
    if ($(this).hasClass('nav-active')){ // already highlighted
      return;
    }
    else {
      $('.nav-item').removeClass('nav-active');
      $(this).addClass('nav-active');

      // switch content
      $('#content').html($(''+ref+'-content').html());

      if (ref === '#products') {
        setupProjHandlers();
      }
    }
  });

});


// Determine which content to display on page load by url hash
function displayContent(hash) {
  // could be a bit more general in these for easier expansion... need more time
  if (hash === ""){ // null is home
    hash = '#home';
  }
  if (hash === '#home' || hash === '#products' || hash === '#contact') {
    $('#content').html($(''+hash+'-content').html()); // load w/ correct content
    $('.navbar-nav a[href="'+hash+'"]').addClass('nav-active'); // highlight current section

    if(hash === '#products'){
      setupProjHandlers(hash);
    }
  }
  else if (hash === '#dsm-page') {
    $("#content").load( "_dsm.html");
    location.hash = "#" + "dsm-page";
    $('.navbar-nav a[href="#products"]').addClass('nav-active');
  }
  else if (hash === '#crm-page') {
    $("#content").load( "_crm.html");
    location.hash = "#" + "dsm-page";
    $('.navbar-nav a[href="#products"]').addClass('nav-active');
  }
  else { // something that doesn't exist, default to home ()
    $('#content').html($('#home-content').html()); // load w/ correct content
    $('.navbar-nav a[href="#home"]').addClass('nav-active'); // highlight current section
  }
}


function setupProjHandlers(){ // because they can't init while hidden
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

  $('#dsm-link').on('click', function() {
    $("#content").load( "_dsm.html");
  });

  $('#crm-link').on('click', function() {
    $('#content').load('_crm.html');
  });

}
