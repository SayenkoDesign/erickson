import $ from 'jquery';

export default {
	init() {
        $(window).scroll(animateNumbers);
    
        $(window).on("load scroll",function(e){
            animateNumbers(); 
        });
        var viewed = false;
        
        function isScrolledIntoView(elem) {
            
            if( ! $(elem).length ) {
                return false;
            }
            
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
        
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
        
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
        
        function animateNumbers() {
          
          if (isScrolledIntoView($(".numbers")) && !viewed) {
              viewed = true;
              $('.number').each(function () {
              $(this).css('opacity', 1);
              $(this).prop('Counter',0).animate({
                  Counter: $(this).text().replace(/,/g, '')
              }, {
                  duration: 4000,
                  easing: 'swing',
                  step: function (now) {
                      $(this).text(Math.ceil(now).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                  }
              });
            });
          }
        }
	},
};