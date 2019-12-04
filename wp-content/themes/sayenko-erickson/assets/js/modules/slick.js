import $ from 'jquery';
import 'slick-carousel/slick/slick';
import imagesLoaded from 'imagesloaded';



export default {
	init() {
        
        if (!String.prototype.padStart) {
            String.prototype.padStart = function padStart(targetLength, padString) {
                targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
                padString = String(typeof padString !== 'undefined' ? padString : ' ');
                if (this.length >= targetLength) {
                    return String(this);
                } else {
                    targetLength = targetLength - this.length;
                    if (targetLength > padString.length) {
                        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
                    }
                    return padString.slice(0, targetLength) + String(this);
                }
            };
        }
        
        let $slider = $('.section-home-news .slider');
        
        if ( $('.slick', $slider).length ) {
            
            let currentSlide;
            
            let updateSliderCounter = function(slick, currentIndex) {
                currentSlide = slick.slickCurrentSlide() + 1;
                $('.slick-arrows .counter', $slider ).text(currentSlide);
              };
              
            $('.slick', $slider).on('init', function(event, slick) {
                updateSliderCounter(slick);
                $slider.css({
                  opacity: 1,
                  visibility: 'visible'
                });
              });
            
            $('.slick', $slider).on('afterChange', function(event, slick, currentSlide) {
                updateSliderCounter(slick, currentSlide);
            });
            
            
            $('.slick', $slider).slick({
                fade: true,
                autoplay: false,
                infinite: true,
                adaptiveHeight: true,
                dots: false,
                speed: 300,
                nextArrow: $('.slick-next', $slider),
                prevArrow: $('.slick-prev', $slider),
            });
        }
        
        
        // About - history
        
        let $historySlider = $('.section-about-history .slider');
        
        if ( $('.slick', $historySlider).length ) {
            
            $historySlider.imagesLoaded()
            
                .done( function( instance ) {
            
                $('.slick', $historySlider).slick({
                    fade: true,
                    autoplay: false,
                    infinite: true,
                    adaptiveHeight: true,
                    arrows: true,
                    dots: true,
                    rows: 0,
                    customPaging : function(slider, i) {
                        let year = $(slider.$slides[i]).data('year');
                        return '<a class="dot">'+year+'</a>';
                    },
                    speed: 300,
                    nextArrow: $('.slick-next', $historySlider),
                    prevArrow: $('.slick-prev', $historySlider),
                });
                
                $( '.wrap', $historySlider).append($('.slick', $historySlider).find('.slick-dots'));
                
                $historySlider.addClass('images-loaded');
                    
             });
        }
        
        
        // Careers - Testimonials
        
        let $testimonialsSlider = $('.section-testimonials .slider');
        
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
        
        
        if ( $('.product__slider-main .slick').length ) {
            
            $('.product__slider').imagesLoaded()
            
                .done( function( instance ) {

                    $(".product__slider-main .slick").slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        fade: true,
                        autoplay: false,
                        infinite: true,
                        arrows: false,
                        dots: false,
                        speed: 300,
                        rows: 0,
                        nextArrow: '.product__slider-main .slick-next',
                        prevArrow: '.product__slider-main .slick-prev',
                        //asNavFor: '.product__slider-thumbs .slick',
                        
                    });
                    
                    $(".product__slider-thumbs .slick").slick({
                        dots: false,
                        autoplay: false,
                        infinite: true,
                        speed: 300,
                        arrows: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        asNavFor: '.product__slider-main .slick',
                        vertical: true,
                        verticalSwiping: true,
                        focusOnSelect: true,
                        rows: 0,
                        responsive: [
                            {
                              breakpoint: 991,
                              settings: {
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: false,
                                vertical: false,
                                verticalSwiping: false,
                              }
                            },
                            {
                              breakpoint: 639,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: false,
                                vertical: false,
                                verticalSwiping: false,
                              }
                            }
                        ]
                    });
                    
                    $('.product__slider').addClass('images-loaded');
            
             });
        }


		if ( $('.section-product-slideshow .slider .slick').length ) {
            
            $('.section-product-slideshow .slider').imagesLoaded()
            
                .done( function( instance ) {
            
            
                $(".section-product-slideshow .slider .slick").slick({
                    fade: true,
                    autoplay: false,
                    infinite: true,
                    adaptiveHeight: true,
                    dots: true,
                    speed: 300,
                    customPaging : function(slider, i) {
                        let number = i+1;
                        number = number.toString().padStart(2, '0');
                        let thumb = $(slider.$slides[i]).data();
                        return '<a class="dot">'+number+'</a>';
                    },
                    nextArrow: '.section-product-slideshow .slider .slick-next',
                    prevArrow: '.section-product-slideshow .slider .slick-prev',
                });
                
                $('.section-product-slideshow .slider').addClass('images-loaded');
                
             });
        }
		 
	},
};
