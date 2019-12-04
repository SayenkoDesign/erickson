import $ from 'jquery';

export default {
	init() {
		$( '.js-superfish' ).superfish( {
			delay: 100,
			//animation:{opacity:"show",height:"show"},
			dropShadows: ! 1,
		} );
	},
};
