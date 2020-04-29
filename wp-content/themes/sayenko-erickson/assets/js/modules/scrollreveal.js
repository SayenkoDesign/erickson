import $ from 'jquery';
import ScrollReveal from 'scrollreveal';

export default {
	init() {

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
        
        // ScrollReveal({});
                        
        /*
            Blocks
        */
            
        ScrollReveal().reveal('.block-hero', {
            delay: 200
        });
        
        ScrollReveal().reveal('.block-hero h1', { 
            delay: 400,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.block-hero p', { 
            delay: 800,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.block-hero h3', { 
            delay: 1200,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.block-hero .button', { 
            delay: 1600,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal('.block-hero .play-video', { 
            delay: 2000,
            scale: 0.1,
            afterReveal: function (el) {
                el.classList.add('revealed');
            }
        });
            
        // Services
        
        ScrollReveal().reveal( '.block-services' );
        
        ScrollReveal().reveal( '.block-services .grid-item', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
            
            
        //ScrollReveal().reveal( '.block-erickson-advantage' );
        
        
        ScrollReveal().reveal( '.block-erickson-advantage header', { 
            delay: 200,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.block-erickson-advantage .slider', { 
            delay: 400,
            distance: '100%'
        });
            
            
        // Featured Post
        ScrollReveal().reveal('.block-featured-post' );
        
        ScrollReveal().reveal('.block-featured-post header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.block-featured-post .grid .cell', { 
            delay: 800,
            interval: 250,
            distance: '100%'
        });
        
        
        // Customers
        ScrollReveal().reveal( '.block-customers' );
        
        ScrollReveal().reveal( '.block-customers header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.block-customers .logos li', { 
            easing: "ease-out",
            delay: 800,
            interval: 200,
            origin: 'bottom',
            distance: '100%'
        });
        
                        
        ScrollReveal().reveal( '.block-approach header', { 
            distance: '100%'
        });
        
        $('.block-approach .grid-margin-bottom .cell').each(function () {
            if( ! $(this).attr('id') ) {
                $(this).attr('id', ID);
            }
        });
        
        $('.block-approach .grid-margin-bottom .cell').each(function (index, element) {
             ScrollReveal().reveal( '#' + element.id, { 
                delay: 400,
                origin: index % 2 ? 'left' : 'right',
                distance: '100%',
                interval: 400
            });
        }); 
        
                
        ScrollReveal().reveal( '.block-results header', { 
            distance: '100%',
        });
        

         
        ScrollReveal().reveal( '.block-clients', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.block-clients header', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
        
        // Service Gallery
        
        ScrollReveal().reveal( '.block-service-gallery header', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.block-service-gallery .slick', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
        
                
        //ScrollReveal().reveal( '.section-case-studies' );
        
        ScrollReveal().reveal('.block-case-studies header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal('.block-case-studies article', { 
            delay: 800,
            interval: 250,
            distance: '100%'
        });
                
        
        ScrollReveal().reveal( '.block-mission-vision', { 
            distance: '100%'
        }); 
        

        ScrollReveal().reveal( '.block-benefits header', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-benefits .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
        
        ScrollReveal().reveal( '.block-columns header', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-columns .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
        ScrollReveal().reveal( '.block-columns.background-color-gray', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-columns.background-color-gray header', { 
            delay: 400,
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-columns.background-color-gray.grid .cell', { 
            delay: 800,
            distance: '100%',
            interval: 200
        }); 
        
        
        ScrollReveal().reveal( '.block-commitment', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-commitment header', { 
            delay: 400,
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-commitment .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
        
        ScrollReveal().reveal( '.block-awards header', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.block-awards .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
                
        ScrollReveal().reveal( '.block-core-values header', { 
            distance: '100%',
            afterReveal: function (el) {
                $('.block-core-values .slider').show();
            }
        }); 
        
        ScrollReveal().reveal( '.block-core-values .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
            
        }); 
        
    
        
        ScrollReveal().reveal( '.block-testimonials', { 
            distance: '100%',
        }); 
        
        ScrollReveal().reveal( '.block-testimonials .slider', { 
            delay: 400,
            distance: '100%',
        }); 
        
        
        ScrollReveal().reveal( '.block-values' );
        
        $('.block-values .cell').each(function () {
            if( ! $(this).attr('id') ) {
                $(this).attr('id', ID);
            }
        });
        
        $('.block-values .cell').each(function (index, element) {
            console.log(element.id);
            ScrollReveal().reveal( '#' + element.id, { 
                delay: 400,
                origin: index % 2 ? 'left' : 'right',
                distance: '100%',
                interval: 400
            });
        }); 
        
        
        ScrollReveal().reveal( '.block-jobs header', { 
            distance: '100%',
        }); 
        
        ScrollReveal().reveal( '.block-jobs .entry-content', { 
            delay: 400,
            distance: '100%',
        }); 
        
                
        ScrollReveal().reveal( '.block-content', { 
            delay: 400,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        
        ScrollReveal().reveal( '.block-content .cell', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%',
            interval: 400,
            afterReveal: function (el) {
                $('.block-content .cell .play-video').addClass('revealed');
            }
        }); 
        
        
        /*
            Pages
        */
        
        
        ScrollReveal().reveal('.section-hero', {
            delay: 200
        });
        
        ScrollReveal().reveal('.section-hero:not(.has-background-image) h1:not(.no-reveal)', { 
            delay: 400,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero.has-background-image h1', { 
            delay: 400,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero p', { 
            delay: 800,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero h3', { 
            delay: 1200,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero .button', { 
            delay: 1600,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal('.section-hero .play-video', { 
            delay: 2000,
            scale: 0.1,
            afterReveal: function (el) {
                el.classList.add('revealed');
            }
        });
        
        // History
        
        ScrollReveal().reveal( '.page-template-history .section-hero .hero-content img', { 
            delay: 400,
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-history .section-hero .hero-content h1', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-history .section-introduction', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-history .section-timeline .facetwp-facet', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-history .section-timeline .facetwp-template', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        
        $('.page-template-history .section-timeline .facetwp-template').each(function (index, element) {
            //var id = $(element).attr('id'); 
            ScrollReveal().reveal( '.event', { 
                delay: 1200,
                distance: '100%',
                interval: 400
            });
        });
               
        
        ScrollReveal().reveal( '.page-template-history .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
        (function($) {
            $(document).on('facetwp-loaded', function() {
                 $( '.page-template-history .facetwp-template article, .page-template-history .facetwp-type-pager' ).css({ opacity: 1, visibility: 'visible' });
            });
        })(jQuery);  
        
        
        // Team
        
        ScrollReveal().reveal( '.page-template-team .facetwp-facet', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-team .facetwp-template .cell', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%',
            interval: 400
        }); 
                
        ScrollReveal().reveal( '.page-template-team .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
        (function($) {
            $(document).on('facetwp-loaded', function() {
                 $( '.page-template-team .facetwp-template .cell, .page-template-team .facetwp-pager' ).css({ opacity: 1, visibility: 'visible' });
            });
        })(jQuery);   
                        
        
        // Contact
        
        ScrollReveal().reveal( '.section-form-directory .cell', { 
            delay: 400,
            origin: 'bottom',
            distance: '100%',
            interval: 400
        }); 
        
        
        ScrollReveal().reveal( '.section-offices', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.section-offices header', { 
            delay: 400,
            distance: '100%'
        });
        
        
        // Related Posts
        ScrollReveal().reveal( '.section-related-posts' );
        
        ScrollReveal().reveal('.section-related-posts header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal('.section-related-posts article', { 
            delay: 800,
            interval: 250,
            distance: '100%'
        });
            
            
        // Posts
        ScrollReveal().reveal( '.section-posts' );
        
        ScrollReveal().reveal('.section-posts header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal('.section-posts article', { 
            delay: 800,
            interval: 250,
            distance: '100%'
        });
            
            
        // Fleet
        
        /*
        ScrollReveal().reveal( '.post-type-archive-fleet #secondary h2', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.post-type-archive-fleet #secondary li', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
        */
        
         
        ScrollReveal().reveal( '.post-type-archive-fleet #primary .facetwp-template article', { 
            delay: 800,
            distance: '100%',
            interval: 200
        }); 
        
        
        ScrollReveal().reveal( '.post-type-archive-fleet #primary .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
        // Case Studies Archive
        ScrollReveal().reveal( '.post-type-archive-case_study header', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.post-type-archive-case_study .facetwp-filters', { 
            delay: 400,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal( '.post-type-archive-case_study .facetwp-template article', { 
            delay: 800,
            distance: '100%',
            interval: 200
        }); 
        
        
        ScrollReveal().reveal( '.post-type-archive-case_study .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
        // Photo gallery
        
        ScrollReveal().reveal( '.template-photo-gallery .facetwp-filters', { 
            delay: 400,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal( '.template-photo-gallery .facetwp-template article', { 
            delay: 800,
            distance: '100%',
            interval: 200
        }); 
        
        (function($) {
            $(document).on('facetwp-loaded', function() {
                 $( '.template-photo-gallery .facetwp-template article' ).css({ opacity: 1, visibility: 'visible' });
            });
        })(jQuery);    
        
        
        ScrollReveal().reveal( '.template-photo-gallery .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
        // video Gallery
        
        ScrollReveal().reveal( '.post-type-archive-video_gallery .facetwp-filters', { 
            delay: 400,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal( '.post-type-archive-video_gallery .facetwp-template article', { 
            delay: 800,
            distance: '100%',
            interval: 200
        }); 
        
        ScrollReveal().reveal( '.post-type-archive-video_gallery .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
        // Archive
        
        ScrollReveal().reveal( '.archive .section-hero', { 
            delay: 200,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.archive .facetwp-filters', { 
            delay: 400,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal( '.archive .facetwp-template article', { 
            delay: 800,
            distance: '100%',
            interval: 200
        }); 
        
        
        (function($) {
            $(document).on('facetwp-loaded', function() {
                 $( '.archive .facetwp-template article' ).css({ opacity: 1, visibility: 'visible' });
            });
        })(jQuery);      
        
        ScrollReveal().reveal( '.archive .facetwp-pager', { 
            delay: 200,
            distance: '100%'
        });
                                  
	},
};
