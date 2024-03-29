import $ from 'jquery';
import Cookies from 'js-cookie'

export default {
	init() {

        return;
        
        (function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a);
}else{a(jQuery);}}(function(a){a.fn.addBack=a.fn.addBack||a.fn.andSelf;a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';
}var f={absolute:false,clone:false,includeMargin:false,display:"block"};var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";
e=e.clone().attr("style",m).appendTo("body");};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().addBack().filter(":hidden");
d+="visibility: hidden !important; display: "+i.display+" !important; ";if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);
var n=m.attr("style");g.push(n);m.attr("style",n?n+";"+d:d);});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");
}else{o.attr("style",n);}});};}h();var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();j();return k;}});}));

		
            
        var $stickyHeader = $(".sticky-header .site-header");
        var $stickyNav = $(".sticky-nav");
        var $body = $('body');
        var $wpAdminBar = 0;
        var height = 0;
        
        var showNotificationBar = Cookies.get('show-notification-bar');
        
        $(window).on("load", function(){
            
            if( 'no' === showNotificationBar) {
                return;
            }
            
            var $notificationBar = $('.section-notification-bar');        
            
            $notificationBar.removeClass('hide');
            
            if($('body').hasClass('logged-in')) {
                return;
            }
            
            height = $notificationBar.actual('height') + $wpAdminBar;
            
            setTimeout(function(){  
                if (Foundation.MediaQuery.atLeast('xlarge')) {
                    $body.css( 'top', height );
                } else {
                    $body.css( 'top', 'auto' );
                    $body.removeAttr( 'style' );
                } 
                
                //$notificationBar.show();   
                   
            }, 3000);     
        
        });  
        
        
        $(window).on("resize", function(){
                        
            var $notificationBar = $('.section-notification-bar');  
                        
            if($('body').hasClass('logged-in')) {
                return;
            }
            
            height = $notificationBar.height() + $wpAdminBar;
            
            if (Foundation.MediaQuery.atLeast('xlarge')) {
                $body.css( 'top', height );
            } else {
                $body.removeAttr( 'style' );
            }            
        
        });  
        
        
        $(window).on("scroll", function(){
            
            var hasNotificationBar = true;
            var $notificationBar = $('.section-notification-bar');
            
            if( ! $notificationBar.length && $notificationBar.not(":visible") ) {
                $body.removeAttr( 'style' );
                $stickyHeader.removeAttr( 'style' );
                $stickyNav.removeAttr( 'style' );
                hasNotificationBar = false;
                //return;
            }
                                                
            if($('body').hasClass('logged-in')) {
                return;
            }
                    
            if( $(window).scrollTop() >= height ){
              $stickyHeader.addClass("fixed");
              $stickyNav.addClass("fixed");
              $body.removeAttr( 'style' );
            } else {
                $stickyHeader.removeClass("fixed");
                $stickyNav.removeClass("fixed");
                
                if (hasNotificationBar && Foundation.MediaQuery.atLeast('xlarge')) {
                    $body.css( 'top', height );
                } else {
                    $body.removeAttr( 'style' );
                } 
            }
        });
        
        $(document).on('close.zf.trigger', '.section-notification-bar[data-closable]', function(e) {
            $body.css( 'top', 'auto' );
            $body.removeAttr( 'style' );
            $stickyHeader.removeAttr( 'style' );
            $stickyNav.removeAttr( 'style' );
            $('.section-notification-bar').remove();
            Cookies.set('show-notification-bar', 'no', { expires: 1 })
        });

	},
};
