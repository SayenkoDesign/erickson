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
        ScrollReveal().reveal('.section-hero' );
        
        ScrollReveal().reveal('.section-hero:not(.has-background) h1:not(.no-reveal)', { 
            delay: 400,
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero.has-background h1', { 
            delay: 400,
            origin: 'left',
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero.has-background h4', { 
            delay: 800,
            origin: 'right',
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero.has-background h3', { 
            delay: 1200,
            origin: 'right',
            distance: '100%',
        });
        
        ScrollReveal().reveal('.section-hero.has-background .button', { 
            delay: 1600,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal('.section-hero.has-background .play-video', { 
            delay: 2000,
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
        
        
        //ScrollReveal().reveal( '.section-advantage' );
        
        
        ScrollReveal().reveal( '.section-advantage header', { 
            delay: 200,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.section-advantage .slider', { 
            delay: 400,
            distance: '100%'
        });
        
        
        // Case studies
        //ScrollReveal().reveal( '.section-case-studies' );
        
        ScrollReveal().reveal('.section-case-studies header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal('.section-case-studies article', { 
            delay: 800,
            interval: 250,
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
        
        
        // Featured Post
        ScrollReveal().reveal('.section-featured-post' );
        
        ScrollReveal().reveal('.section-featured-post header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.section-featured-post .grid .cell', { 
            delay: 800,
            interval: 250,
            distance: '100%'
        });
        
        
        // Customers
        ScrollReveal().reveal( '.section-customers' );
        
        ScrollReveal().reveal( '.section-customers header', { 
            delay: 400,
            distance: '100%'
        });
        
        ScrollReveal().reveal( '.section-customers .logos li', { 
            easing: "ease-out",
            delay: 800,
            interval: 200,
            origin: 'bottom',
            distance: '100%'
        });
        
        
        // Services
        
        // Approach
        
        ScrollReveal().reveal( '.section-approach header', { 
            distance: '100%'
        });
        
        $('.section-approach .grid-margin-bottom .cell').each(function () {
            if( ! $(this).attr('id') ) {
                $(this).attr('id', ID);
            }
        });
        
        $('.section-approach .grid-margin-bottom .cell').each(function (index, element) {
            console.log(element.id);
            ScrollReveal().reveal( '#' + element.id, { 
                delay: 400,
                origin: index % 2 ? 'left' : 'right',
                distance: '100%',
                interval: 400
            });
        }); 
        
        
        // Results
        
        ScrollReveal().reveal( '.section-results header', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.section-results .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200,
            afterReveal: function (el) {
                $('.section-results .cell .number').addClass('revealed');
            }
        });
        
        
        // Clients
        
        ScrollReveal().reveal( '.section-clients', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.section-clients header', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
        
        // Service Gallery
        
        ScrollReveal().reveal( '.section-service-gallery header', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.section-service-gallery .slick', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
        
        
        // Fleet
        
        ScrollReveal().reveal( '.post-type-archive-fleet #secondary h2', { 
            distance: '100%',
        });
        
        ScrollReveal().reveal( '.post-type-archive-fleet #secondary li', { 
            delay: 400,
            distance: '100%',
            interval: 200
        });
        
         
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
        
        
        
        // About
        ScrollReveal().reveal( '.page-template-about .section-hero .hero-content p', { 
            delay: 400,
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-about .mission-vision', { 
            distance: '100%'
        }); 
        
        
        ScrollReveal().reveal( '.page-template-about .section-core-values header', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-about .section-core-values .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
        ScrollReveal().reveal( '.page-template-about .section-commitment', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-about .section-commitment header', { 
            delay: 400,
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-about .section-commitment .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
        
        ScrollReveal().reveal( '.page-template-about .section-awards header', { 
            distance: '100%'
        }); 
        
        ScrollReveal().reveal( '.page-template-about .section-awards .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
        }); 
        
       
        // Careers
        
        ScrollReveal().reveal('.template-careers .section-hero .button', { 
            delay: 2000,
            distance: '100%',
        });
        
        
        ScrollReveal().reveal('.template-careers .section-hero .play-video', { 
            delay: 1600,
            scale: 0.1,
            afterReveal: function (el) {
                el.classList.add('revealed');
            }
        });
        
        
        ScrollReveal().reveal( '.page-template-careers .section-benefits header', { 
            distance: '100%',
            afterReveal: function (el) {
                $('.page-template-careers .section-benefits .slider').show();
            }
        }); 
        
        ScrollReveal().reveal( '.page-template-careers .section-benefits .grid .cell', { 
            delay: 400,
            distance: '100%',
            interval: 200
            
        }); 
        
    
        
        ScrollReveal().reveal( '.page-template-careers .section-testimonials', { 
            distance: '100%',
        }); 
        
        ScrollReveal().reveal( '.page-template-careers .section-testimonials .slider', { 
            delay: 400,
            distance: '100%',
        }); 
        
        
        ScrollReveal().reveal( '.page-template-careers .section-values' );
        
        $('.page-template-careers .section-values .cell').each(function () {
            if( ! $(this).attr('id') ) {
                $(this).attr('id', ID);
            }
        });
        
        $('.page-template-careers .section-values .cell').each(function (index, element) {
            console.log(element.id);
            ScrollReveal().reveal( '#' + element.id, { 
                delay: 400,
                origin: index % 2 ? 'left' : 'right',
                distance: '100%',
                interval: 400
            });
        }); 
        
        
        ScrollReveal().reveal( '.page-template-careers .section-jobs header', { 
            distance: '100%',
        }); 
        
        ScrollReveal().reveal( '.page-template-careers .section-jobs .entry-content', { 
            delay: 400,
            distance: '100%',
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
        
        
        $('.section-timeline .facetwp-template article').each(function (index, element) {
            //var id = $(element).attr('id'); 
            ScrollReveal().reveal( '.event', { 
                delay: 1200,
                distance: '100%',
                interval: 400
            });
        });
        
        
        ScrollReveal().reveal( '.post-type-archive-video_gallery .facetwp-type-pager', { 
            delay: 200,
            distance: '100%'
        });
        
        
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
        
        // ----------------------
        
        // Multipurpose page
        
        ScrollReveal().reveal( '.template-multi-purpose .section-block', { 
            delay: 400,
            origin: 'bottom',
            distance: '100%'
        }); 
        
        
        ScrollReveal().reveal( '.template-multi-purpose .section-block .cell', { 
            delay: 800,
            origin: 'bottom',
            distance: '100%',
            interval: 400,
            afterReveal: function (el) {
                $('.template-multi-purpose .section-block .cell .play-video').addClass('revealed');
            }
        }); 
        
        
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
        
                 
                          
	},
};
