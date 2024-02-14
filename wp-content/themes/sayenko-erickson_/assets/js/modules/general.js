import $ from 'jquery';
import 'clip-path';

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
        
        
        // Fleet details
        
        $('.fleet-ajax footer h4').matchHeight({row:true});
        
        // $('.section-commitment .panel .text').matchHeight({row:true});
        
                          
	},
};
