// AOS
(function (document, window, $) {

	'use strict';
    
    // https://scrollrevealjs.org/api/defaults.html
    
    var ID = function () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    
    $('.load-hidden').each(function () {
        if( ! $(this).attr('id') ) {
            $(this).attr('id', ID);
        }
    });
    
    ScrollReveal({ mobile: true});
    
    ScrollReveal().reveal('section.scroll-reveal', {
        origin: 'bottom',
        
        afterReveal: function() {
            ScrollReveal().reveal('.animate-left', { 
                delay: 200,
                origin: 'left',
                distance: '100%',
            });
            
            ScrollReveal().reveal('.animate-right', { 
                delay: 400,
                origin: 'right',
                distance: '100%',
            });
        }
    });
    
    
    
        
    /*
        HOME
    */
    
    // Hero
    ScrollReveal().reveal('.home .section-hero', { 
        afterReveal: function (el) {
            ScrollReveal().reveal('.home .section-hero h1', { 
                delay: 400,
                origin: 'left',
                distance: '100%',
            });
            
            ScrollReveal().reveal('.home .section-hero h4', { 
                delay: 800,
                origin: 'right',
                distance: '100%',
            });
            
            ScrollReveal().reveal('.home .section-hero .button', { 
                delay: 1200,
                distance: '100%',
            });
            
            
            ScrollReveal().reveal('.home .section-hero .play-video', { 
                delay: 1600,
                scale: 0.1,
                afterReveal: function (el) {
                    el.classList.add('revealed');
                }
            });
        }
    });
    
    
    
    // Section Services
    
    ScrollReveal().reveal( '.home .section-services', { 
        
        viewOffset: {
            top: 100
        },
        
        afterReveal: function (el) {
            ScrollReveal().reveal( '.home .section-services .grid-item', { 
                delay: 500,
                distance: '100%',
                interval: 500,
                viewFactor: 0.5
            });
        }  
    });
    
    ScrollReveal().reveal( '.home .section-advantage', { 
         
         afterReveal: function (el) {
             ScrollReveal().reveal( '.home .section-advantage header', { 
                delay: 500,
                distance: '100%',
                interval: 500
            });
            
            ScrollReveal().reveal( '.home .section-advantage .images-loaded', { 
                delay: 1000,
                viewOffset: {
                    top: 100
                }
            });
         }
    });
    
    
    ScrollReveal().reveal( '.home .section-customers', { 

          afterReveal: function (el) {
            ScrollReveal().reveal( '.home .section-customers header', { 
                delay: 500,
                distance: '100%',
                viewFactor: .5
            });
            
            ScrollReveal().reveal( '.home .section-customers .logos li', { 
                easing: "ease-out",
                delay: 1000,
                interval: 1000,
                origin: 'bottom',
                distance: '150%'
            });
        }  
    });
    
    
    ScrollReveal().reveal( '.home .section-case-studies', { 
          afterReveal: function (el) {
            ScrollReveal().reveal( '.home .section-case-studies header', { 
                delay: 500,
                distance: '100%'
            });
            
            ScrollReveal().reveal( '.home .section-case-studies article', { 
                delay: 1000,
                interval: 250,
                distance: '100%'
            });
        }  
    });
    
    
    ScrollReveal().reveal( '.home .section-featured-post', { 
          afterReveal: function (el) {
            ScrollReveal().reveal( '.home .section-featured-post header', { 
                delay: 500,
                distance: '100%'
            });
            
            ScrollReveal().reveal( '.home .section-featured-post .grid .cell', { 
                delay: 1000,
                interval: 250,
                distance: '100%'
            });
        }  
    });
    
 
   /*
        About
    */
    
    // History
    $('.section-history .timeline').children('article').each(function (index, element) {
        //var id = $(element).attr('id'); 
        ScrollReveal().reveal( '#' + element.id + ' .event', { 
            delay: 100,
            origin: index % 2 ? 'right' : 'left',
            distance: '100%',
            interval: 1000,
            viewFactor: 0.5
        });
    });

    
    /*
        CAREERS
    */
    
    // Hero
    ScrollReveal().reveal('.template-careers .section-hero h1', { 
        delay: 400,
        origin: 'left',
	    distance: '100%',
    });
    
    ScrollReveal().reveal('.template-careers .section-hero h4', { 
        delay: 800,
        origin: 'right',
	    distance: '100%',
    });
    
    
    ScrollReveal().reveal('.template-careers .section-hero .play-video', { 
        delay: 1200,
        scale: 0.1,
        afterReveal: function (el) {
            el.classList.add('revealed');
        }
    });
    
    ScrollReveal().reveal('.template-careers .section-hero .button', { 
        delay: 1600,
        origin: 'bottom',
	    distance: '100%',
    });
    
    
    
    // ----------------------
    
    ScrollReveal().reveal('.fifty-fifty-block-section img', { 
        delay: 400,
        origin: 'bottom',
	    distance: '25%',
        viewFactor: .5
    });
    
    /*
    ScrollReveal().reveal('.section-details', {
        afterReveal: function() {
            ScrollReveal().reveal('.section-details .grid .cell', { 
                delay: 400,
                interval: 500,
                origin: 'bottom',
                distance: '100%'
            });
        }
    });
    */
    
    /*
    $('.section-columns .grid-x .cell').each(function (index, element) {
        console.log(element.id);
        ScrollReveal().reveal( '#' + element.id, { 
            delay: 200,
            origin: index % 2 ? 'right' : 'left',
            distance: '100%',
            interval: 800
        });
    });
    */
    
    
    
}(document, window, jQuery));

