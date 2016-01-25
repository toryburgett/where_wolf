$(document).ready(function() {
  // var menuToggle = $('#js-mobile-menu').unbind();
  // $('#js-navigation-menu').removeClass("show");
  //
  // menuToggle.on('click', function(e) {
  //   e.preventDefault();
  //   $('#js-navigation-menu').slideToggle(function(){
  //     if($('#js-navigation-menu').is(':hidden')) {
  //       $('#js-navigation-menu').removeAttr('style');
  //     }
  //   });
  // });

$('.button-collapse').sideNav({
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  }
);


});
