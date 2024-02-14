import $ from 'jquery';
import Cookies from 'js-cookie'

export default {
	init() {
        
        var $siteHeader = $(".site-header");
        var showNotificationBar = Cookies.get('show-notification-bar');
        
        $(window).on("load", function(){
            
            if( 'no' === showNotificationBar) {
                return;
            }
                        
            $('.section-notification-bar').removeClass('hide');
            
            
        
        });  

        // Add sticky on scroll down only
        
        $('body').on('mousewheel DOMMouseScroll', function(e){
            if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
              if(e.originalEvent.detail > 0) {
                // console.log('Down');
                $siteHeader.removeClass('sticky');
              } else if(e.originalEvent.detail < 0){
                  // console.log('Up');
                  $siteHeader.addClass('sticky');
              }
            } else if (typeof e.originalEvent.wheelDelta == 'number') {
              if(e.originalEvent.wheelDelta < 0) {
                 // console.log('Down');
                 $siteHeader.removeClass('sticky');
              } else if(e.originalEvent.wheelDelta > 0) {
                 // console.log('Up');
                 $siteHeader.addClass('sticky');
              }
            }
          });
       
        
        $(document).on('close.zf.trigger', '.section-notification-bar[data-closable]', function(e) {
            $('.section-notification-bar').remove();
            Cookies.set('show-notification-bar', 'no', { expires: 1 })
        });

	},
};
