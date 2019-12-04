import $ from 'jquery';

export default {
	init() {

		$('html').addClass('window-loaded');
        
        
        // Frontpage
        
            // what
            //$('.section-what .grid .grid-item').matchHeight({row:true});
            $('.section-what .grid header').matchHeight({row:true});
            $('.section-what .grid .description').matchHeight({row:true});
            //$('.section-what .grid .grid-image').matchHeight({row:true});
            // $('.section-what .grid footer').matchHeight({row:true});
        
            // Technologies
            $('.section-technologies .grid header').matchHeight({row:true});
            $('.section-technologies .grid .description').matchHeight({row:true});
            $('.section-technologies .grid .grid-image').matchHeight({row:true});
            $('.section-technologies .grid footer').matchHeight({row:true});
            
            
            $('.section-core-values .grid .grid-image').matchHeight({row:true});
            $('.section-core-values .grid .grid-item header').matchHeight({row:true});
            
            $('.archive .grid article').matchHeight({row:true});
            
            // Blog filters
            var detectWrap = function(element) {
  
            var wrappedItems = [];
            var prevItem = {};
            var currItem = {};
            var items = $(element).children();
            
            for (var i = 0; i < items.length; i++) {
            currItem = items[i].getBoundingClientRect();
            if (prevItem && prevItem.top < currItem.top) {
              wrappedItems.push(items[i]);
            }
            prevItem = currItem;
            }
            
            return wrappedItems;
            
            };
            
            
            $(window).on("load resize", function() {
                var wrappedItems = detectWrap('.category-filters .menu');
                if(wrappedItems.length) {
                  $('.category-filters .categories').addClass('mobile');
                }
                if(! wrappedItems.length) {
                  $('.category-filters .categories').removeClass('mobile');
                }
                
                $('.category-filters').css('visibility', 'visible');
            });
	},
};
