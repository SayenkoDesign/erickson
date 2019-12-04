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

	// Foundation
//	wp_register_script( 'foundation', trailingslashit( THEME_JS ) . 'foundation.min.js', array('jquery'), '', true );

	// Main
	wp_register_script( 'manifest', _s_asset_path( '/js/manifest.js' ), false, '', true );
	wp_register_script( 'vendor', _s_asset_path( '/js/vendor.js' ), false, '', true );
	wp_register_script( 'project', _s_asset_path( '/js/project.js' ),
		array(
			'jquery',
            'jquery-effects-core',
			'manifest',
			'vendor',
		),
		null, true );


	// Localize responsive menus script.
	wp_localize_script( 'project', 'genesis_responsive_menu', array(
		'mainMenu'         => __( 'Menu', '_s' ),
		'subMenu'          => __( 'Menu', '_s' ),
		'menuIconClass'    => null,
		'subMenuIconClass' => null,
		'menuClasses'      => array(
			'combine' => array(
				'.nav-primary',
			),
			//'others'  => array( '.nav-secondary' ),
		),
	) );


}


// Load Scripts
add_action( 'wp_enqueue_scripts', '_s_load_scripts' );
function _s_load_scripts() {

	wp_enqueue_script( 'modernizr' );

	wp_enqueue_script( 'project' );
}
