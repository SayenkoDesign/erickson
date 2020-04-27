import $ from 'jquery';

export default {
	init() {
		$( document ).on( 'facetwp-loaded', function() {
            
            $( '.facetwp-facet-years').append( '<div class="facetwp-reset"><span onclick="FWP.reset()">All</span></div>' );
            
            // Fleet Add labels
            $('.facetwp-filters .facetwp-facet').each(function() {
                var $facet = $(this);
                var facet_name = $facet.attr('data-name');
                var facet_label = FWP.settings.labels[facet_name];
    
                if ($facet.closest('.facet-wrap').length < 1 && $facet.closest('.facetwp-flyout').length < 1) {
                    $facet.wrap('<div class="facet-wrap"></div>');
                    $facet.before('<h5 class="facet-label">' + facet_label + '</h5>');
                }
            });
            
            if( 'undefined' !== typeof FWP_HTTP.get.fwp_paged ) {
                $('body').addClass('is-paged');
            } else {
                $('body').removeClass('is-paged');
            }
                        
            // facetwp-facet-categories
            if( 'undefined' !== typeof FWP_HTTP.get.fwp_categories ) {
                var selected = $(".facetwp-facet-categories option[value='"+ FWP_HTTP.get.fwp_categories + "']").text();
                                
                if('' !== selected) {
                    selected = selected.split('(')[0];
                } else {
                    selected = erickson_options.blog_title;
                }
                
                $('.blog .section-hero header h1').text(selected);
            } else {
                $('.blog .section-hero header h1').text(erickson_options.blog_title);
            }
            
            
            if ( FWP.loaded ) {
				var target = $( '.blog .facetwp-template' );

				Foundation.SmoothScroll.scrollToLoc( target, {offset: -100} );

			}
            
		} );
        
        $(document).on('facetwp-refresh', function() {
            
        });
        
        /*
        $(document).on('click', '.section-people .facetwp-facet .checked', function() { 
            FWP.facets['departments'] = ['all']; 
            delete FWP.facets['paged']; // remove "paged" from URL
            FWP.refresh(); 
            console.log('refresh');   
        });*/
        
        
        $(document).on('facetwp-refresh', function() {
            if ( $('.section-people').length && '' == FWP.build_query_string()) {
                FWP.facets['departments'] = ['all'];
                delete FWP.facets['paged']; // remove "paged" from URL
            }
        });
                
	},
};
