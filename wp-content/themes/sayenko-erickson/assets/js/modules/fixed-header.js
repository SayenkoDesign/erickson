import $ from 'jquery';

export default {
	init() {
		$(window).on("scroll", function(){
		if( $(window).scrollTop() > 100 ){
		  $(".sticky-header .site-header").addClass("fixed");
		}
		else
		{
			$(".sticky-header .site-header").removeClass("fixed");
		}
	});

	},
};
