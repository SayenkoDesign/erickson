import $ from 'jquery';

export default {
	init() {
        
        (function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a);
}else{a(jQuery);}}(function(a){a.fn.addBack=a.fn.addBack||a.fn.andSelf;a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';
}var f={absolute:false,clone:false,includeMargin:false,display:"block"};var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";
e=e.clone().attr("style",m).appendTo("body");};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().addBack().filter(":hidden");
d+="visibility: hidden !important; display: "+i.display+" !important; ";if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);
var n=m.attr("style");g.push(n);m.attr("style",n?n+";"+d:d);});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");
}else{o.attr("style",n);}});};}h();var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();j();return k;}});}));

		
            
        var $stickyHeader = $(".sticky-header .site-header");
        var $body = $('body');
        var $wpAdminBar = 0;
        var $height = 0;
        
        $(window).on("load", function(){
            
            var $notificationBar = $('.section-notification-bar');        
            
            if( ! $notificationBar.length ) {
                $body.removeAttr( 'style' );
                return;
            }
                        
            if($('body').hasClass('logged-in')) {
                if ($(window).width() > 782) {
                   $wpAdminBar = 32;
                } else {
                   $wpAdminBar = 46; 
                }
            }
            
            //$height = $notificationBar.height() + $wpAdminBar;
            $height = $notificationBar.actual('height') + $wpAdminBar;
            
            
            setTimeout(function(){  
                if (Foundation.MediaQuery.atLeast('xlarge')) {
                    $body.css( 'top', $height );
                } else {
                    $body.css( 'top', 'auto' );
                    $body.removeAttr( 'style' );
                } 
                
                $notificationBar.show();      
            }, 3000);     
        
        });  
        
        
        $(window).on("resize", function(){
            
            var $notificationBar = $('.section-notification-bar');        
            
            if( ! $notificationBar.length ) {
                $body.removeAttr( 'style' );
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
                $body.css( 'top', $height );
            } else {
                $body.css( 'top', 'auto' );
                $body.removeAttr( 'style' );
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
              $body.removeAttr( 'style' );
            } else {
                $stickyHeader.removeClass("fixed");
                
                if (Foundation.MediaQuery.atLeast('xlarge')) {
                    $body.css( 'top', $height );
                } else {
                    $body.css( 'top', 'auto' );
                    $body.removeAttr( 'style' );
                } 
            }
        });
        
        $(document).on('close.zf.trigger', '[data-closable]', function(e) {
            console.log( 'closed' );
            $body.css( 'top', 'auto' );
            $body.removeAttr( 'style' );
            $('.section-notification-bar').remove();
        });

	},
};
