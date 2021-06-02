import $ from 'jquery';
import ScrollReveal from 'scrollreveal';
import {SmoothScroll} from 'foundation-sites/js/foundation.smoothScroll';

export default {
	init() {

		'use strict';


		$('.is-mobile .block-hero .play-video').addClass('revealed');
		$('.is-mobile .section-hero .play-video').addClass('revealed');
		$('.is-mobile .block-content .cell .play-video').addClass('revealed');


		// https://scrollrevealjs.org/api/defaults.html

		var ID = function () {
			// Math.random should be unique because of its seeding algorithm.
			// Convert it to base 36 (numbers + letters), and grab the first 9 characters
			// after the decimal.
			return '_' + Math.random().toString(36).substr(2, 9);
		};

		$('.load-hidden').each(function () {
			if (!$(this).attr('id')) {
				$(this).attr('id', ID);
			}
		});

		// ScrollReveal({ mobile: false });

		/*
			Blocks
		*/

		ScrollReveal().reveal('.is-desktop .block-hero', {
			delay: 200,
		});

		ScrollReveal().reveal('.is-desktop .block-hero h1', {
			delay: 400,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-hero p', {
			delay: 800,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-hero h3', {
			delay: 1200,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-hero .button', {
			delay: 1600,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop .block-hero .play-video', {
			delay: 2000,
			scale: 0.1,
			afterReveal: function (el) {
				el.classList.add('revealed');
			}
		});

		// Services

		ScrollReveal().reveal('.is-desktop .block-services');

		ScrollReveal().reveal('.is-desktop .block-services .grid-item', {
			delay: 400,
			distance: '100%',
			interval: 200
		});


		//ScrollReveal().reveal( '.is-desktop .block-erickson-advantage' );


		ScrollReveal().reveal('.is-desktop .block-erickson-advantage header', {
			delay: 200,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-erickson-advantage .slider', {
			delay: 400,
			distance: '100%'
		});


		// Featured Post
		ScrollReveal().reveal('.is-desktop .block-featured-post');

		ScrollReveal().reveal('.is-desktop .block-featured-post header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-featured-post .grid .cell', {
			delay: 800,
			interval: 250,
			distance: '100%'
		});


		// Customers
		ScrollReveal().reveal('.is-desktop .block-customers');

		ScrollReveal().reveal('.is-desktop .block-customers header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-customers .logos li', {
			easing: "ease-out",
			delay: 800,
			interval: 200,
			origin: 'bottom',
			distance: '100%'
		});


		ScrollReveal().reveal('.is-desktop .block-approach header', {
			distance: '100%'
		});

		$('.block-approach .grid-margin-bottom .cell').each(function () {
			if (!$(this).attr('id')) {
				$(this).attr('id', ID);
			}
		});

		$('.block-approach .grid-margin-bottom .cell').each(function (index, element) {
			ScrollReveal().reveal('.is-desktop #' + element.id, {
				delay: 400,
				origin: index % 2 ? 'left' : 'right',
				distance: '100%',
				interval: 400
			});
		});


		ScrollReveal().reveal('.is-desktop .block-results header', {
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop .block-clients', {
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-clients header', {
			delay: 400,
			distance: '100%',
			interval: 200
		});

		// Service Gallery

		ScrollReveal().reveal('.is-desktop .block-service-gallery header', {
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-service-gallery .slick', {
			delay: 400,
			distance: '100%',
			interval: 200
		});


		//ScrollReveal().reveal( '.is-desktop .section-case-studies' );

		ScrollReveal().reveal('.is-desktop .block-case-studies header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-case-studies article', {
			delay: 800,
			interval: 250,
			distance: '100%'
		});


		ScrollReveal().reveal('.is-desktop .block-mission-vision .wrap', {
			distance: '100%'
		});


		ScrollReveal().reveal('.is-desktop .block-benefits header', {
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-benefits .grid .cell', {
			delay: 400,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop .block-columns header', {
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-columns .grid .cell', {
			delay: 400,
			distance: '100%',
			interval: 200
		});

		ScrollReveal().reveal('.is-desktop .block-columns.background-color-gray', {
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-columns.background-color-gray header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-columns.background-color-gray.grid .cell', {
			delay: 800,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop .block-commitment', {
			distance: '100%',
			afterReveal: function (el) {
				$('.is-desktop .block-commitment').css('z-index', '4');
			}
		});

		ScrollReveal().reveal('.is-desktop .block-commitment header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-commitment .grid .cell', {
			delay: 400,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop .block-contracts', {
			distance: '100%',
			afterReveal: function (el) {
				$('.is-desktop .block-contracts').css('z-index', '4');
			}
		});

		ScrollReveal().reveal('.is-desktop .block-contracts header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-contracts .grid', {
			delay: 400,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop .block-codes', {
			distance: '100%',
			afterReveal: function (el) {
				$('.is-desktop .block-commitment').css('z-index', '4');
			}
		});

		ScrollReveal().reveal('.is-desktop .block-codes header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-codes .grid .cell', {
			delay: 400,
			distance: '100%',
			interval: 200
		});

		ScrollReveal().reveal('.is-desktop .block-awards header', {
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-awards .grid .cell', {
			delay: 400,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop .block-core-values header', {
			distance: '100%',
			afterReveal: function (el) {
				$('.block-core-values .slider').show();
			}
		});

		ScrollReveal().reveal('.is-desktop .block-core-values .grid .cell', {
			delay: 400,
			distance: '100%',
			interval: 200

		});


		ScrollReveal().reveal('.is-desktop .block-testimonials', {
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-testimonials .slider', {
			delay: 400,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop .block-values');

		$('.block-values .cell').each(function () {
			if (!$(this).attr('id')) {
				$(this).attr('id', ID);
			}
		});

		$('.is-desktop .block-values .cell').each(function (index, element) {
			console.log(element.id);
			ScrollReveal().reveal('#' + element.id, {
				delay: 400,
				origin: index % 2 ? 'left' : 'right',
				distance: '100%',
				interval: 400
			});
		});


		ScrollReveal().reveal('.is-desktop .block-jobs header', {
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .block-jobs .entry-content', {
			delay: 400,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop .block-content', {
			delay: 400,
			origin: 'bottom',
			distance: '100%'
		});


		ScrollReveal().reveal('.is-desktop .block-webinar', {
			delay: 400,
			origin: 'bottom',
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .block-webinars', {
			delay: 400,
			origin: 'bottom',
			distance: '100%'
		});


		ScrollReveal().reveal('.is-desktop .block-content .cell', {
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


		ScrollReveal().reveal('.is-desktop .section-hero', {
			delay: 200
		});

		ScrollReveal().reveal('.is-desktop .section-hero:not(.has-background-image) h1:not(.no-reveal)', {
			delay: 400,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .section-hero.has-background-image h1', {
			delay: 400,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .section-hero p', {
			delay: 800,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .section-hero h3', {
			delay: 1200,
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .section-hero .button', {
			delay: 1600,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop .section-hero .play-video', {
			delay: 2000,
			scale: 0.1,
			afterReveal: function (el) {
				el.classList.add('revealed');
			}
		});

		// History

		ScrollReveal().reveal('.is-desktop.page-template-history .section-hero .hero-content img', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop.page-template-history .section-hero .hero-content h1', {
			delay: 800,
			origin: 'bottom',
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop.page-template-history .section-introduction', {
			delay: 800,
			origin: 'bottom',
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop.page-template-history .section-timeline .facetwp-facet', {
			delay: 800,
			origin: 'bottom',
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop.page-template-history .section-timeline .facetwp-template', {
			delay: 800,
			origin: 'bottom',
			distance: '100%'
		});


		$('.is-desktop.page-template-history .section-timeline .facetwp-template').each(function (index, element) {
			//var id = $(element).attr('id');
			ScrollReveal().reveal('.event', {
				delay: 1200,
				distance: '100%',
				interval: 400
			});
		});


		ScrollReveal().reveal('.is-desktop.page-template-history .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});


		(function ($) {
			$(document).on('facetwp-loaded', function () {
				$('.page-template-history .facetwp-template article, .page-template-history .facetwp-type-pager').css({
					opacity: 1,
					visibility: 'visible'
				});
			});
		})(jQuery);


		// Team

		ScrollReveal().reveal('.is-desktop.page-template-team .facetwp-facet', {
			delay: 800,
			origin: 'bottom',
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop.page-template-team .facetwp-template .cell', {
			delay: 800,
			origin: 'bottom',
			distance: '100%',
			interval: 400
		});

		ScrollReveal().reveal('.is-desktop.page-template-team .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});


		(function ($) {
			$(document).on('facetwp-loaded', function () {
				$('.page-template-team .facetwp-template .cell, .page-template-team .facetwp-pager').css({
					opacity: 1,
					visibility: 'visible'
				});
			});
		})(jQuery);


		// Contact

		ScrollReveal().reveal('.is-desktop .section-form-directory .cell', {
			delay: 400,
			origin: 'bottom',
			distance: '100%',
			interval: 400
		});


		ScrollReveal().reveal('.is-desktop .section-offices', {
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop .section-offices header', {
			delay: 400,
			distance: '100%'
		});


		// Related Posts
		ScrollReveal().reveal('.is-desktop .section-related-posts');

		ScrollReveal().reveal('.is-desktop .section-related-posts header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .section-related-posts article', {
			delay: 800,
			interval: 250,
			distance: '100%'
		});


		// Posts
		ScrollReveal().reveal('.is-desktop .section-posts');

		ScrollReveal().reveal('.is-desktop .section-posts header', {
			delay: 400,
			distance: '100%'
		});

		ScrollReveal().reveal('.is-desktop .section-posts article', {
			delay: 800,
			interval: 250,
			distance: '100%'
		});


		// Fleet


		ScrollReveal().reveal('.is-desktop.post-type-archive-fleet #secondary h2', {
			distance: '100%',
		});

		/*

		ScrollReveal().reveal( '.is-desktop.post-type-archive-fleet #secondary li', {
			delay: 400,
			distance: '100%',
			interval: 200
		});
		*/


		ScrollReveal().reveal('.is-desktop.post-type-archive-fleet #primary .facetwp-template article', {
			delay: 800,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop.post-type-archive-fleet #primary .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});



		ScrollReveal().reveal('.is-desktop .block-webinars .facetwp-template article', {
			delay: 200,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop .block-webinars .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});

		(function ($) {
			$(document).on('facetwp-loaded', function () {
				$('.block-webinars .facetwp-template article').css({opacity: 1, visibility: 'visible'});
			});
		})(jQuery);


		// Case Studies Archive
		ScrollReveal().reveal('.is-desktop.post-type-archive-case_study header', {
			distance: '100%',
		});

		ScrollReveal().reveal('.is-desktop.post-type-archive-case_study .facetwp-filters', {
			delay: 400,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop.post-type-archive-case_study .facetwp-template article', {
			delay: 800,
			distance: '100%',
			interval: 200
		});


		ScrollReveal().reveal('.is-desktop.post-type-archive-case_study .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});


		// Photo gallery

		ScrollReveal().reveal('.is-desktop.template-photo-gallery .facetwp-filters', {
			delay: 400,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop.template-photo-gallery .facetwp-template article', {
			delay: 800,
			distance: '100%',
			interval: 200
		});

		(function ($) {
			$(document).on('facetwp-loaded', function () {
				$('.template-photo-gallery .facetwp-template article').css({opacity: 1, visibility: 'visible'});
			});
		})(jQuery);


		ScrollReveal().reveal('.is-desktop.template-photo-gallery .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});


		// video Gallery

		ScrollReveal().reveal('.is-desktop.post-type-archive-video_gallery .facetwp-filters', {
			delay: 400,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop.post-type-archive-video_gallery .facetwp-template article', {
			delay: 800,
			distance: '100%',
			interval: 200
		});

		ScrollReveal().reveal('.is-desktop.post-type-archive-video_gallery .facetwp-type-pager', {
			delay: 200,
			distance: '100%'
		});


		// Archive

		ScrollReveal().reveal('.is-desktop.archive .section-hero', {
			delay: 200
		});

		ScrollReveal().reveal('.is-desktop.archive .facetwp-filters', {
			delay: 400,
			distance: '100%',
		});


		ScrollReveal().reveal('.is-desktop.archive .facetwp-template article', {
			delay: 800,
			distance: '100%',
			interval: 200
		});


		(function ($) {
			$(document).on('facetwp-loaded', function () {
				$('.archive .facetwp-template article').css({opacity: 1, visibility: 'visible'});
			});
		})(jQuery);

		ScrollReveal().reveal('.is-desktop.archive .facetwp-pager', {
			delay: 200,
			distance: '100%'
		});


		if ($('body').hasClass('paged')) {
			ScrollReveal().destroy();
		}

		$('a[href^="#"]').on('click', function (event) {
			event.preventDefault();

			let element = $(this).attr('href');

			if ($(element).length) {

				ScrollReveal().destroy();

				// let offset = $('.site-header').height() + $('.sticky-nav').height() - 1;

				/* Foundation.SmoothScroll.scrollToLoc(element, {
					threshold: 0,
					offset: offset,
				}, function () {
					console.log('scrolled');
				}); */

				Foundation.SmoothScroll.scrollToLoc(element);

			}


		});

	},
};
