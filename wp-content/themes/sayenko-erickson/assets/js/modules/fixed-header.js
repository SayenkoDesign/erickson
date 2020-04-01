import $ from 'jquery';

export default {
	init() {
		
            
        var $stickyHeader = $(".sticky-header .site-header");
        
        var $wpAdminBar = 0;
        var $height = 0;
        
        $(window).on("load resize", function(){
            
            var $notificationBar = $('.section-notification-bar');        
            
            if( ! $notificationBar.length ) {
                $stickyHeader.removeAttr( 'style' );
                return;
            }
                        
            if($('body').hasClass('logged-in')) {
                if ($(window).width() > 782) {
                   $wpAdminBar = 32;
                } else {
                   $wpAdminBar = 46; 
                }
            }
            
            $height = $notificationBar.height() + $wpAdminBar;
            
            if (Foundation.MediaQuery.atLeast('xlarge')) {
                $stickyHeader.css( 'top', $height );
            } else {
                $stickyHeader.css( 'top', 'auto' );
                $stickyHeader.removeAttr( 'style' );
            }            
        
        });  
        
        
        $(window).on("scroll", function(){
            
            var $notificationBar = $('.section-notification-bar');
            
            if( ! $notificationBar.length ) {
                $stickyHeader.removeAttr( 'style' );
                return;
            }
            
            console.log('test');
                        
            if($('body').hasClass('logged-in')) {
                if ($(window).width() > 782) {
                   $wpAdminBar = 32;
                } else {
                   $wpAdminBar = 46; 
                }
            }
                    
            if( $(window).scrollTop() >= $height ){
              $stickyHeader.addClass("fixed");
              $stickyHeader.removeAttr( 'style' );
            } else {
                $stickyHeader.removeClass("fixed");
                
                if (Foundation.MediaQuery.atLeast('xlarge')) {
                    $stickyHeader.css( 'top', $height );
                } else {
                    $stickyHeader.css( 'top', 'auto' );
                    $stickyHeader.removeAttr( 'style' );
                } 
            }
        });
        
        $(document).on('close.zf.trigger', '[data-closable]', function(e) {
            console.log( 'closed' );
            $stickyHeader.css( 'top', 'auto' );
            $stickyHeader.removeAttr( 'style' );
            $('.section-notification-bar').remove();
        });

	},
};
