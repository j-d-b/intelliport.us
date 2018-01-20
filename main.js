// Tried to make this a single page site for simplicity, using hashes
// Appended '-content' so has didn't scroll to the content using the has ref
// Jacob Brady

$(document).ready(function(){
  var hash = $(location).attr('hash');
  if (hash == ""){ // index.html defaults to home
    hash = "#home";
  }
  $('#content').html($(''+hash+'-content').html()); // load w/ correct content
  $('.navbar-nav a[href="'+hash+'"]').addClass('nav-active'); // highlight current section

  // "switch page" -- spa version
  $('.nav-item').click(function() {
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
    }
  });

});
