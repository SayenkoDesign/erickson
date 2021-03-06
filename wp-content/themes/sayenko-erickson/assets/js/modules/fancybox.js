import $ from 'jquery';
import '@fancyapps/fancybox';

export default {
	init() {
        
        'use strict';
        
        /*$('a.fancybox').fancybox({
            caption : function(instance,item) {
              return $(this).closest('figure').find('figcaption').html();
            }
        });
        
        
        $('a[data-fancybox]').fancybox({
            
            afterShow: function (instance, current) {
                $.fn.matchHeight._update();
            }

        });
        */
        
        $().fancybox({
            smallBtn: false
        });
        
        /*
        $('.modal-form').fancybox({
            //selector : '.modal-form',
            baseClass: "full-screen",
            modal: true,
            closeExisting: true,
            touch: false,
            hash: false,
            arrows: false,
            infobar: false
        });
        */
        
        
        // Image galleries, we need this to disable the Group hash which interferes with FacetWP
        $().fancybox({
          baseClass: "fancybox-images",
          selector : '[data-fancybox="images"]',
          hash     : false
        });
        
        
        /*
        $().fancybox({
          selector : '.fleet-column a.post-link',
          baseClass: "single-fleet",
        });
        */
        
        
        $().fancybox({
          baseClass: "fancybox-gallery",
          selector : '[data-fancybox="gallery"]',
          buttons : [
                //'share',
                'fullScreen',
                'close'
          ]
        });
         
		 
	},
};
