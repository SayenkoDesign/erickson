import $ from 'jquery';

export default {
	init() {
		$( 'a' ).not( 'svg a, [href*="mailto:"], [href*="tel:"], [class*="foobox"]' ).each( function() {
			var isInternalLink = new RegExp( '/' + window.location.host + '/' );
			if ( ! isInternalLink.test( this.href ) ) {
				$( this ).attr( 'target', '_blank' );
			}
		} );

		$( 'a[href*=".pdf"]' ).attr( 'target', '_blank' );
	},
};
