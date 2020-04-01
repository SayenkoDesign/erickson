<?php
/**
 * Gutenberg scripts and styles
 */
function be_gutenberg_scripts() {

	wp_enqueue_script(
		'be-editor', 
		_s_asset_path( 'js/editor.js' ), 
		array( 
        'wp-i18n',
		'wp-blocks',
		'wp-dom-ready',
		'wp-edit-post',
		'wp-element',
		'wp-token-list'
        ), 
        '',
		true
	);
}
//add_action( 'enqueue_block_editor_assets', 'be_gutenberg_scripts' );



// Register scripts to load later as needed
add_action( 'wp_enqueue_scripts', '_s_register_scripts' );
function _s_register_scripts() {

	wp_register_script( 'modernizr', _s_asset_path( '/js/modernizr-custom.js' ), false, '', false );
            
    wp_register_script( 'gmaps', 
						sprintf( '//maps.googleapis.com/maps/api/js?key=%s', GOOGLE_API_KEY ), 
						false, '', true );
    

    // wp_register_script( 'scrollreveal-config', _s_asset_path( '/js/scrollreveal-config.js' ), false, '', true ); 

	// Main
	wp_register_script( 'manifest', _s_asset_path( '/js/manifest.js' ), false, '', true );
	wp_register_script( 'vendor', _s_asset_path( '/js/vendor.js' ), false, '', true );
	wp_register_script( 'project', _s_asset_path( '/js/project.js' ),
		array(
			'jquery',
            //'jquery-effects-core',
			'manifest',
            'gmaps',
			'vendor',
		),
		null, true );


	wp_localize_script( 'project', 
			'map_params', 
			array( 'icon' => sprintf( '%sservice/map-pin.svg', trailingslashit( THEME_IMG ) ),
                   'cross' => sprintf( '%sservice/cross.svg', trailingslashit( THEME_IMG ) )
            )
	);


}


// Load Scripts
add_action( 'wp_enqueue_scripts', '_s_load_scripts' );
function _s_load_scripts() {

	wp_enqueue_script( 'modernizr' );

	wp_enqueue_script( 'project' );
    
    //wp_enqueue_script( 'scrollreveal-config' );
}
