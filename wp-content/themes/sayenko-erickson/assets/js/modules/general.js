import $ from 'jquery';

export default {
	init() {

		$('html').addClass('window-loaded');
        
        // mega menu image hover
        var hoverTimeout;
        var $img = $('.nav-primary .menu-item-image .image img'),
        dsrc = $img.attr('src');
        $('.nav-primary .menu-item a[data-image]').hover(function() {
            //if( $img.attr('src') !== $(this).data('image')) {
                $img.attr('src', $(this).data('image'));
                clearTimeout(hoverTimeout);
            //}
        }, function() {
            hoverTimeout = setTimeout(function() {
                $img.attr('src', dsrc);
            }, 1000);
            
        });
        
        // what
        //$('.section-what .grid .grid-item').matchHeight({row:true});
        
        $('.post-type-archive-case_study .grid article').matchHeight({row:true});
        
        // Blog filters
        /*
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
        */
	},
};
