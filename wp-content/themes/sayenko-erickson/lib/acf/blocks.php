<?php
/**
 * ACF Blocks
 *
 * A place to custom functionality related to Advanced Custom Fields.
 *
 * @package _s
 */

// If ACF isn't activated, then bail.
if ( ! class_exists( 'acf' ) ) {
	return false;
}


add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		[
			[
				'slug'  => 'theme-blocks',
				'title' => __( 'Theme Blocks', '_s' ),
			]
		],
		$categories
	);
}, 10, 2 );

/**
 * Register Gutenberg Blocks
 */
function _s_acf_register_blocks() {

	// check function exists
	if ( function_exists( 'acf_register_block_type' ) ) {

		// Hero
		acf_register_block_type( array(
			'name'            => 'hero',
			'title'           => __( 'Hero', '_s' ),
			'description'     => __( 'Hero', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'hero' ),
            //'post_types' => array('post', 'page'),
            'mode' => 'edit',
            'supports' => ['anchor' => true]
		) );		
        
        // Button
		acf_register_block_type( array(
			'name'            => 'button',
			'title'           => __( 'Button', '_s' ),
			'description'     => __( 'Button', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path fill="none" d="M0 0h24v24H0V0z"></path><g><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"></path></g></svg>',
			'keywords'        => array( 'button' ),
            //'post_types' => array('post', 'page'),
            'mode' => 'edit',
            'supports' => ['anchor' => false]
		) );		
        
        // Grid
        /*
		acf_register_block( array(
			'name'            => 'grid',
			'title'           => __( 'Grid', '_s' ),
			'description'     => __( 'Grid', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'acf grid' ),
            //'post_types' => array('post', 'page'),
            //'mode' => 'auto',
            'supports' => ['anchor' => true]
		) );		*/
        
        // About - core Values
        /*
		acf_register_block( array(
			'name'            => 'core-values',
			'title'           => __( 'Core Values', '_s' ),
			'description'     => __( 'About - core values', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'acf core values' ),
            'post_types' => array('page'),
            //'mode' => 'auto',
            'supports' => ['anchor' => true]
		) );
        */
	}
}

add_action( 'acf/init', '_s_acf_register_blocks' );


