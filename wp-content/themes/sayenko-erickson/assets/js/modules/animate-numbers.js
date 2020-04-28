import { CountUp } from 'countup.js';
import $ from 'jquery';

export default {
	init() {
    

        $(window).on('load.animateNumbers scroll.animateNumbers', function(){
          if( $('.block-results').is_on_screen() ) {
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
        
        $.fn.is_on_screen = function(){

            var win = $(window);
            
            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
            
            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
            
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            
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