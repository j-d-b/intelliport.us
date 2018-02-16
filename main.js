// Jacob Brady; Feb 2018
// KCUS Inc.

var mainPageHashes = ['#home', '#products', '#contact'];
var prodPageHashes = ['#dsm', '#rom'];
var currentHash = '#home';
var defaultHash = '#home'; // could link to page not found, etc.

$(document).ready(function(){
  currentHash = checkHash( $(location).attr('hash') );
  displayContent(currentHash);
  setHighlight(currentHash);

  $(window).on('hashchange', function() {
    var newHash = checkHash( $(location).attr('hash') );
    switchHighlight(newHash);
    displayContent(newHash);
    currentHash = newHash;
  });
});

// gives the pathname partial given a hash
// ex: given '#contact' returns '_contact.html'
function hashToPath(hash) {
  return '/_' + hash.substring(1) + '.html';
}

// ensures hash is in mainPageHashes or prodPageHashes and defaults if not
function checkHash(hash) {
  var isValid = $.inArray(hash, mainPageHashes.concat(prodPageHashes)) != -1;
  if (isValid) {
    return hash;
  }
  else {
    window.location.hash = defaultHash;
    return defaultHash;
  }
}

// determine which content to display on page load by url hash
function displayContent(hash) {
  var path = hashToPath(hash);
  $('#content').load(path, function() {
    if (hash == '#products') {
      setupProdHandlers();
    }
  });
}

// changes the menu highlight to match the given hash
function switchHighlight(hash) {
  var isProdPage = $.inArray(hash, prodPageHashes) != -1;
  if (isProdPage) {
    hash = '#products';
  }
  if (hash != currentHash) {
    setHighlight(hash);
  }
}

// highlights only navbar item corresponding to the given hash
function setHighlight(hash) {
  $('.nav-item').removeClass('nav-active');
  $('a[href="' + hash + '"]').addClass('nav-active');
}

// product page needs event handlers to make the borders look nice w/
// collapsing, and to load individual product pages
function setupProdHandlers(){
  // when it starts showing, drop border radius
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
    $('.product-header').not( $(this) ).removeClass('product-selected');
    if (!$(collapseDiv).hasClass('collapsing')){
      $(this).toggleClass('product-selected');
    }
  });

  $('.prod-page-link').on('click', function() {
    var path = hashToPath( $(this).attr('href') );
    $('#content').load(path);
    window.scrollTo(0,0);
  });
}
