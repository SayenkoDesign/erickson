import { CountUp } from 'countup.js';
import $ from 'jquery';

export default {
	init() {
    

        $(window).on('load.animateNumbers scroll.animateNumbers', function(){
          if( $('.block-results').length && $('.block-results').isInViewport() ) {
             animateNumbers();
             $(window).off('load.animateNumbers scroll.animateNumbers');
          }
        });
        
        // var viewed = false;
        
        // count decimals
        function countDecimals(num) {
          let text = num.toString()
          if (text.indexOf('e-') > -1) {
            let [base, trail] = text.split('e-')
            let elen = parseInt(trail, 10)
            let idx = base.indexOf(".")
            return idx == -1 ? 0 + elen : (base.length - idx - 1) + elen
          }
          let index = text.indexOf(".")
          return index == -1 ? 0 : (text.length - index - 1)
        }
        
        /*
        var isInViewport = function (elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        */
        
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementBottom > viewportTop && elementTop < viewportBottom;
        };
       
        function animateNumbers() {
                      
            // Find all Statistics on page, put them inside a variable
            var number = $(".block-results .number");
            
            // For each Statistic we find, animate it
            number.each(function(index) {
                // Find the value we want to animate (what lives inside the p tags)
                var value = $(number[index]).data('value');
                var decimalPlaces = countDecimals(value);
                var prefix    = $(number[index]).data('prefix') ?? '';
                var suffix    = $(number[index]).data('suffix') ?? '';
                var format = $(number[index]).data('format') ?? false;
                
                var options = {
                    useEasing: true,
                    useGrouping: true,
                    decimalPlaces: decimalPlaces,
                    prefix: prefix,
                    suffix: suffix,
                    useGrouping: format,
                    decimal: "."
                };
            
                                    
                setTimeout(function(){
                    var numberAnimation = new CountUp(number[index], value, options);
                    if (!numberAnimation.error) {
                         numberAnimation.start();
                    } else {
                      console.error(numberAnimation.error);
                    }
                
                }, 1000);
                
                $(number[index]).removeClass('animate')
           });
                        
        }
	},
};