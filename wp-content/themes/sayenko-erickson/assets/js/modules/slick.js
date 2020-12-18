import $ from 'jquery';
import 'slick-carousel/slick/slick';
import imagesLoaded from 'imagesloaded';

export default {
	init() {
        
        let $heroSlider = $('.section-hero .slider, .block-hero .slider');
        
        if ( $('.slick', $heroSlider).length ) {
            
            $('.slick', $heroSlider).on('init', function() {
                $heroSlider.css({
                    opacity: 1,
                    visibility: 'visible'
                });
            });            
            
            $('.slick', $heroSlider).slick({
                fade: true,
                autoplay: true,
                infinite: true,
                adaptiveHeight: false,
                dots: false,
                speed: 2000,
                autoplaySpeed: 4000,
                arrows: false,
                rows: 0,
                lazyLoad: 'progressive',
                //nextArrow: $('.slick-next', $heroSlider),
                //prevArrow: $('.slick-prev', $heroSlider),
            });
            
            $('.slick', $heroSlider).on("lazyLoaded", function(e, slick, image, imageSource) {
                let parentSlide = $(image).parent(".slick-slide", $heroSlider );
                parentSlide.css("background-image", 'url("' + imageSource + '")').addClass("loaded"); //replace with background instead
                image.remove(); // remove source
            });
        }
                
        
        // About - history
        
        let $tabsSlider = $('.section-advantage .slider, .block-erickson-advantage .slider');
        
        if ( $('.slick', $tabsSlider).length ) {
            
            $tabsSlider.imagesLoaded({background: true})
            .done( function( instance ) {
            
                $('.slick', $tabsSlider).slick({
                    fade: true,
                    autoplay: false,
                    infinite: true,
                    adaptiveHeight: false,
                    arrows: true,
                    dots: false,
                    rows: 0,
                    /*customPaging : function(slider, i) {
                        let title = $(slider.$slides[i]).find('h3').text();
                        return title;
                    },*/
                    speed: 300,
                    nextArrow: $('.slick-next', $tabsSlider),
                    prevArrow: $('.slick-prev', $tabsSlider),
                    
                    responsive: [
                        {
                          breakpoint: 991,
                          settings: {
                            adaptiveHeight: true,
                            dots: true,
                          }
                        }
                      ]
                });
                
                $tabsSlider.prepend($('.slick', $tabsSlider).find('.slick-dots'));
                
                $tabsSlider.addClass('images-loaded');
                
                $('.section-advantage .slick-tabs, .block-erickson-advantage .slick-tabs').on('click', 'li', function() {
                    let index = $(this).index();
                    $(this).siblings().removeClass('active');
                    $('.slick', $tabsSlider).slick('slickGoTo', index);
                    $(this).addClass('active');
                 });
                 
                 $tabsSlider.on( 'afterChange', function( event, slick, currentSlide ) {
                     console.log(currentSlide);
                    $('.block-erickson-advantage .slick-tabs').find('li').removeClass('active').eq(currentSlide).addClass('active');
                });
                    
             });
        }
        
        
        
        let $coreValues = $('.block-core-values');
                     
        $coreValues.each( function() {
            
           let $this = $('#' + $(this).attr('id'));
        
            if ( $('.slick', $this).length ) {
                
                console.log('slider exists');
                                
                $this.imagesLoaded()
                
                    .done( function( instance ) {
                                            
                        $( '<div class="slick-arrows"></div>' ).insertAfter( '.slick', $this );
                
                        $('.slick', $this).slick({
                            fade: true,
                            autoplay: false,
                            infinite: true,
                            adaptiveHeight: true,
                            arrows: true,
                            dots: true,
                            rows: 0,
                            speed: 300,
                            appendArrows: $('.slick-arrows', $this)
                        });
                    
                        $this.addClass('images-loaded');
                        
                        
                        $('.grid', $this).on('click','.grid-item', function(e){
                            var slideIndex = $(this).parent().index();
                            $('.slick', $this).slick( 'slickGoTo', parseInt(slideIndex) );
                            setTimeout(function() { 
                                $('.grid', $this).addClass('is-hidden');
                                $('.slider', $this).removeClass('invisible');
                            }, 100);
                            
                        });
                        
                 });
                 
                 
                 $('.slider .close-slider', $this).on("click", function() {
                    $('.grid', $this).removeClass('is-hidden');
                    $('.slider', $this).addClass('invisible');
                });
    
                 
                 
            }        
                
        });
        
        
        // Careers - Testimonials
        
        let $testimonialsSlider = $('.section-testimonials .slider, .block-testimonials .slider');
        
        if ( $('.slick', $testimonialsSlider).length ) {
            
            $testimonialsSlider.imagesLoaded()
            
                .done( function( instance ) {
            
                    $('.slick', $testimonialsSlider).slick({
                        fade: true,
                        autoplay: false,
                        infinite: true,
                        adaptiveHeight: true,
                        arrows: true,
                        dots: false,
                        rows: 0,
                        /*
                        customPaging : function(slider, i) {
                            let number = i+1;
                            number = number.toString().padStart(2, '0');
                            return '<a class="dot">'+number+'</a>';
                        },
                        */
                        speed: 300,
                        nextArrow: $('.slick-next', $testimonialsSlider),
                        prevArrow: $('.slick-prev', $testimonialsSlider),
                    });
                    
                    $( '.wrap', $testimonialsSlider).append($('.slick', $testimonialsSlider).find('.slick-dots'));
                    
                    $testimonialsSlider.addClass('images-loaded');
                    
             });
        }  
        
        
        
        let $serviceGallerySlider = $('.section-service-gallery .slider, .block-photo-gallery .slider');
        
        if ( $('.slick', $serviceGallerySlider).length ) {
            
            $('.slick', $serviceGallerySlider).on('init', function() {
                $serviceGallerySlider.css({
                    opacity: 1,
                    visibility: 'visible'
                });
            });            
            
            $('.slick', $serviceGallerySlider).slick({
                autoplay: false,
                infinite: true,
                adaptiveHeight: false,
                dots: false,
                //speed: 2000,
                //autoplaySpeed: 4000,
                arrows: true,
                rows: 0,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                lazyLoad: 'progressive',
                nextArrow: $('.slick-next', $serviceGallerySlider),
                prevArrow: $('.slick-prev', $serviceGallerySlider),
                
                responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    arrows: false,
                    dots: true,
                    centerMode: false
                  }
                }
                ]
            });
            
            $('.slick', $serviceGallerySlider).on("lazyLoaded", function(e, slick, image, imageSource) {
                let parentSlide = $(image).parents(".slick-slide", $serviceGallerySlider );
                parentSlide.find('.background-image').css("background-image", 'url("' + imageSource + '")').addClass("loaded"); 
                //replace with background instead
                image.remove(); // remove source
            });
            
            $('.slick-slider', $serviceGallerySlider).on('click', '.slick-slide', function (e) {
                e.stopPropagation();
                var index = $(this).data("slick-index");
                if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
                  $('.slick-slider').slick('slickGoTo', index);
                }
            });
        }      
		 
	},
};
