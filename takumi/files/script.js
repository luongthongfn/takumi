(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');







(function(){

	$wrapper = $('#wrapper');
	$wrapper1 = $('a.toggleDrawer');
	$drawerRight = $('#drawer-right');

	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////

	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();	
		jQuery('#header').height(windowHeight);
		jQuery('#header.works').height(60);
		jQuery('#header.media').height(0);
	}

	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////

	function centerHomeBannerText() {
			var bannerText = jQuery('#header > .center');
			var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 40;		
			bannerText.css('padding-top', bannerTextTop+'px');		
			bannerText.show();
	}



	///////////////////////////////
	// SlideNav
	///////////////////////////////

	function setSlideNav(){
		jQuery(".toggleDrawer").click(function(e){
			//alert($wrapper.css('marginRight'));
			e.preventDefault();

			if(!$drawerRight.hasClass("navigation")){
				$drawerRight.animate({marginRight : 0},200);
				$wrapper.animate({marginLeft : 0},200);
				$wrapper1.addClass("burger_animation");
				$drawerRight.addClass("navigation");
				$wrapper1.removeClass("burger_animation_hide");
				
			}
			else{
				$drawerRight.animate({marginRight : -300},200);
				$wrapper.animate({marginLeft : 0},200);
				$wrapper1.removeClass("burger_animation");
				$drawerRight.removeClass("navigation");
				$wrapper1.addClass("burger_animation_hide");
			}
			
		})
	}

$(document).ready(function() { 

});
	function setHeaderBackground() {		
		var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top	
		if (jQuery("#header").hasClass("works")) {
		   scrollTop +=  400;
		  }
		if (scrollTop > 300 || jQuery(window).width() < 700) { 
			jQuery('#header .top').addClass('solid');
		} else {
			jQuery('#header .top').removeClass('solid');		
		}
	}



	///////////////////////////////
	// Initialize
	///////////////////////////////

	jQuery.noConflict();
	setHomeBannerHeight();
	centerHomeBannerText();
	setSlideNav();
	setHeaderBackground();

	//Resize events
	jQuery(window).smartresize(function(){
		setHomeBannerHeight();
		centerHomeBannerText();
		setHeaderBackground();
	});


	//Set Down Arrow Button
	jQuery('#scrollToContent').click(function(e){
		e.preventDefault();
		jQuery.scrollTo("#works", 1000, { offset:-(jQuery('#header .top').height()), axis:'y' });
	});

	jQuery('nav > ul > li > a').click(function(e){
		e.preventDefault();
		var ahref = jQuery(this).attr("href");
		if (ahref.indexOf('#') != -1) {
			//jQuery.scrollTo(jQuery(this).attr('href'), 400, { offset:-(jQuery('#header .top').height()), axis:'y' });
			window.location = ahref;
			jQuery.scrollTo(jQuery(this).attr('href'), 400, { offset:-(jQuery('#header .top').height()), axis:'y' });
		} else {
			window.open(ahref);
		}
	})

	jQuery(window).scroll( function() {
	   setHeaderBackground();
	});

	jQuery('a.coming-soon').click(function(){
		return false;
	});
	
	jQuery('#contact-button').click(function(){
		var sendname = jQuery('#contactus [name=name]').val();
		var sendemail = jQuery('#contactus [name=subject]').val();
		var sendbody = jQuery('#contactus [name=subject]').val();

		var data = jQuery("#contactus").serialize();

		if (sendname == "" || sendmail == "" || sendbody == "") {
			alert("Your Name/Enter email/Write Something is required.");
			return false;
		}

		if (confirm('Do you want to send mail with this content?')) {
			jQuery.ajax({
                type: "POST",
                url: "/sendmail.php",
                data: data,
                async: false, //同期通信に
			}).done(function(){
            	form.html('<div class="text-success">メールを送信しました</div>');
			}).fail(function(){
				form.html('<div class="text-danger">エラーが発生しました</div>');
			});
		} else {
			return false;
		}
  	});

})();
