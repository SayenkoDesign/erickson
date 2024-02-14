import $ from 'jquery';
import { MediaQuery } from 'foundation-sites/js/foundation.util.mediaQuery';

export default {
	init() {

		// add classes for responsive menu
        /*
        $('#primary-menu .sub-menu').addClass('vertical menu');
        
        const $menuToggle = $( '.js-menu-toggle' );

		if ( !MediaQuery.atLeast( 'xlarge' ) ) {
			$( $menuToggle.data( 'menu' ) ).hide();
		}

		$menuToggle.click( ( event ) => {
			$( $( event.target ).data( 'menu' ) ).slideToggle();
		} );

		$( window ).on( 'changed.zf.mediaquery', function( event, newSize, oldSize ) {
			if ( MediaQuery.atLeast( 'xlarge' ) ) {
				$( $menuToggle.data( 'menu' ) ).show();
			} else {
				$( $menuToggle.data( 'menu' ) ).hide();
			}
		} );
        */
	},
};
