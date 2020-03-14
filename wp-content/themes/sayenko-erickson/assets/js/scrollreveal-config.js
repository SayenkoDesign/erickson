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
    
    ScrollReveal({});
    
    /*
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
    */
    
    
    
        
    /*
        HOME
    */
    
    // Hero
    ScrollReveal().reveal('.home .section-hero' );
    
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
    
    // Section Services
    
    ScrollReveal().reveal( '.home .section-services' );
    
    ScrollReveal().reveal( '.home .section-services .grid-item', { 
        delay: 400,
        distance: '100%',
        interval: 200
    });
    
    ScrollReveal().reveal( '.home .section-advantage' );
    
    
    ScrollReveal().reveal( '.home .section-advantage header', { 
        delay: 200,
        distance: '100%'
    });
    
    ScrollReveal().reveal( '.home .section-advantage .slider', { 
        delay: 400,
        distance: '100%'
    });
    
    
    ScrollReveal().reveal( '.home .section-case-studies' );
    
    ScrollReveal().reveal('.home .section-case-studies header', { 
        delay: 400,
        distance: '100%'
    });
    
    ScrollReveal().reveal('.home .section-case-studies article', { 
        delay: 800,
        interval: 250,
        distance: '100%'
    });
    
    
    ScrollReveal().reveal('.home .section-featured-post' );
    
    
    ScrollReveal().reveal('.home .section-featured-post header', { 
        delay: 200,
        distance: '100%'
    });
    
    ScrollReveal().reveal( '.home .section-featured-post .grid .cell', { 
        delay: 400,
        interval: 250,
        distance: '100%'
    });
    
 
    ScrollReveal().reveal( '.home .section-customers' );
    
    ScrollReveal().reveal( '.home .section-customers header', { 
        delay: 400,
        distance: '100%'
    });
    
    ScrollReveal().reveal( '.home .section-customers .logos li', { 
        easing: "ease-out",
        delay: 800,
        interval: 200,
        origin: 'bottom',
        distance: '100%'
    });
    
        
    
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

