// Jacob Brady; Feb 2018
// KCUS Inc.

$(document).ready(function(){
  var pageHashes = ['#home', '#products', '#contact'];
  var defaultHash = '#home'; // could link to page not found, etc.

  showPage(window.location.hash, pageHashes, defaultHash);

  // init ship movement variables, for use in event handlers
  var shipPosition = 0;
  var ship = document.getElementById('ship-svg');

  $(window).on('hashchange', function() {
    showPage(window.location.hash, pageHashes, defaultHash);
    // reset ship position
    ship.style.transform = 'translateX(0)';
    shipPosition = 0;
  });

  // easter egg: set the ship in motion on click!
  $('#ship-svg').click(function() {
    shipPosition -= 400;
    ship.style.transform = 'translateX(' + shipPosition + 'px)';
  });
});


// 'changes the page' to reflect the content of the given hash, spa style
function showPage(hash, validHashes, defaultHash) {
  var validatedHash = checkHash(hash, validHashes, defaultHash);
  setHighlight(validatedHash);
  displayContent(validatedHash);
}

// gives the pathname partial given a hash
// ex: given '#contact' returns '_contact.html'
function hashToPath(hash) {
  return '/_' + hash.substring(1) + '.html';
}

// ensures hash is in validHashes
function checkHash(hash, validHashes, defaultHash) {
  var isValid = $.inArray(hash, validHashes) != -1;
  if (isValid) {
    return hash;
  }
  else { // if it's not in page
    window.location.hash = defaultHash;
    return defaultHash;
  }
}

// determine which content to display on page load by url hash
function displayContent(hash) {
  var path = hashToPath(hash);
  $('#content').load(path, function() {
    if (hash === '#products') {
      setupProdHandlers();
    }
  });
}

// highlights only navbar item corresponding to the given hash
function setHighlight(hash) {
  $('.nav-item').removeClass('nav-active');
  $('a[href="' + hash + '"]').addClass('nav-active');
}

// product page needs event handlers to make the borders look nice w/
// collapsing, and to load individual product pages
function setupProdHandlers(){
  // when last product collapse starts showing, drop border radius
  $('.last-product').on('show.bs.collapse', function() {
    $('#last-product-header').addClass('rounded-0');
  });

  // when it finishes hiding, give back inherited border radius
  $('.last-product').on('hidden.bs.collapse', function() {
    $('#last-product-header').removeClass('rounded-0');
  });

  // gives the product-selected class to the clicked product header
  $('.product-header').on('click', function() {
    var collapseDiv = $(this).attr('href');
    $('.product-header').not($(this)).removeClass('product-selected');
    if (!$(collapseDiv).hasClass('collapsing')){
      $(this).toggleClass('product-selected');
    }
  });
}
