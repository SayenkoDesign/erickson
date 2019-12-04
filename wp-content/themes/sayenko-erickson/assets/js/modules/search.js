import $ from 'jquery';

export default {
	init() {
		$( document ).on(
			'open.zf.reveal', '#modal-search', function() {
				$( this ).find( 'input' ).first().focus();
			},
		);
	},
};
