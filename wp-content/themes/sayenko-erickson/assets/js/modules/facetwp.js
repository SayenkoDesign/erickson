import $ from 'jquery';

export default {
	init() {
		$( document ).on( 'facetwp-loaded', function() {
            var target = $( '.facetwp-template' );
            var offset = -150;

            if ( $( '.facetwp-filters' ).length ) {
                var target = $( '.facetwp-filters' );
            } else if ( $( '.facetwp-custom-filters' ).length ) {
                var target = $( '.facetwp-custom-filters' );
                offset = -60;
            }

            Foundation.SmoothScroll.scrollToLoc( target, {offset: offset} );
            //Foundation.reInit( 'equalizer' );
                        
            // remove the old group
            $('.post-type-archive-case_study .grid article').matchHeight({ remove: true });
        
            // apply matchHeight on the new selection, which includes the new element
            $('.post-type-archive-case_study .grid article').matchHeight();
            
            // Fleet Add labels
            $('.filters .facetwp-facet').each(function() {
                var $facet = $(this);
                var facet_name = $facet.attr('data-name');
                var facet_label = FWP.settings.labels[facet_name];
    
                if ($facet.closest('.facet-wrap').length < 1 && $facet.closest('.facetwp-flyout').length < 1) {
                    $facet.wrap('<div class="facet-wrap"></div>');
                    $facet.before('<h5 class="facet-label">' + facet_label + '</h5>');
                }
            });

		} );
        
        $(document).on('facetwp-refresh', function() {
            // remove the old group
            $('.post-type-archive-case_study .grid article').matchHeight({ remove: true });
        
            // apply matchHeight on the new selection, which includes the new element
            $('.post-type-archive-case_study .grid article').matchHeight();
        });
	},
};
