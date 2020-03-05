import $ from 'jquery';
import 'slick-carousel/slick/slick';
import imagesLoaded from 'imagesloaded';

export default {
	init() {
        
        let $heroSlider = $('.section-hero .slider');
        
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
        
        let $tabsSlider = $('.section-advantage .slider');
        
        if ( $('.slick', $tabsSlider).length ) {
            
            $tabsSlider.imagesLoaded({background: true})
            .done( function( instance ) {
            
                $('.slick', $tabsSlider).slick({
                    fade: true,
                    autoplay: false,
                    infinite: true,
                    adaptiveHeight: false,
                    arrows: true,
                    dots: true,
                    rows: 0,
                    /*customPaging : function(slider, i) {
                        let title = $(slider.$slides[i]).find('h3').text();
                        return title;
                    },*/
                    speed: 300,
                    nextArrow: $('.slick-next', $tabsSlider),
                    prevArrow: $('.slick-prev', $tabsSlider),
                });
                
                $tabsSlider.prepend($('.slick', $tabsSlider).find('.slick-dots'));
                
                $tabsSlider.addClass('images-loaded');
                
                $('.section-advantage .slick-tabs').on('click', 'li', function() {
                    let index = $(this).index();
                    $(this).siblings().removeClass('active');
                    $('.slick', $tabsSlider).slick('slickGoTo', index);
                    $(this).addClass('active');
                 });
                    
             });
        }
        
        
        
        let $benefitsSlider = $('.section-benefits .slider');
        
        if ( $('.slick', $benefitsSlider).length ) {
            
            $benefitsSlider.imagesLoaded()
            
                .done( function( instance ) {
                    
                    $('.section-benefits .grid').on('click','.grid-item', function(e){
                        e.preventDefault();
                        var slideIndex = $(this).parent().index();
                        $('.slick', $benefitsSlider).slick( 'slickGoTo', parseInt(slideIndex) );
                    });
                    
                    $( '<div class="slick-arrows"></div>' ).insertAfter( '.section-benefits .slick' );
            
                    $('.slick', $benefitsSlider).slick({
                        fade: true,
                        autoplay: false,
                        infinite: true,
                        adaptiveHeight: true,
                        arrows: true,
                        dots: true,
                        rows: 0,
                        speed: 300,
                        appendArrows: $('.section-benefits .slick-arrows')
                    });
                
                    $('.section-benefits').addClass('images-loaded');
                    
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
		 
	},
};
