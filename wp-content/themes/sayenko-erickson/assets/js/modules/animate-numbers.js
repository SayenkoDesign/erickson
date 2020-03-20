import { CountUp } from 'countup.js';
import $ from 'jquery';

export default {
	init() {
        $(window).scroll(animateNumbers);
    
        $(window).on("load scroll",function(e){
            animateNumbers(); 
        });
        var viewed = false;
        
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
              
              
            
            // Find all Statistics on page, put them inside a variable
            var number = $(".number");
            
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
                
                // Start animating
                
                setTimeout(function(){
                    var numberAnimation = new CountUp(number[index], value, options);
                    if (!numberAnimation.error) {
                         numberAnimation.start();
                    } else {
                      console.error(numberAnimation.error);
                    }
                
                }, 1000);
                
            });
              
              
          }
        }
	},
};