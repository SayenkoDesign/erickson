import $ from 'jquery';
import { MediaQuery } from 'foundation-sites/js/foundation.util.mediaQuery';

export default {
	init() {
		
		$( window ).on( 'changed.zf.mediaquery', function( event, newSize, oldSize ) {
			if ( MediaQuery.atLeast( 'xlarge' ) ) {
				// new Foundation.Accordion('.accordion');
			} 
		} );
	},
};
