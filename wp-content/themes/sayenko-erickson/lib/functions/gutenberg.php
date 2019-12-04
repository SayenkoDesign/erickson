<?php

// Editor Styles
add_theme_support( 'editor-styles' );
add_editor_style( 'public/css/editor-style.css' );

// Enable Block Styles
add_theme_support( 'wp-block-styles' );

//add_theme_support( 'align-wide' );


// Disable custom colors
// -- Disable Custom Colors
add_theme_support( 'disable-custom-colors' );

// Editor Color Pallete - match theme colors
add_theme_support( 'editor-color-palette', array(   
    array(
		'name'  => __( 'Light Gray', '_s' ),
		'slug'  => 'light-gray',
		'color' => '#F5F5F5',
	)
) );


 
function _s_allowed_block_types( $allowed_blocks, $post ) {
    
    if ( $post->post_type == 'page' ) {
        
        $page_template = get_post_meta( $post->ID, '_wp_page_template', true );
        
        if( 'page-templates/contact.php' == $page_template ) {
            return array(
                'core/block',
                'core/media-text',
                'core/image',
                'core/paragraph',
                'core/heading',
                'core/list',
                'core/button'
            );   
        } else {
            return array(
                'acf/button',
                'core/block',
                'core-embed/youtube',
                'core/image',
                'core/paragraph',
                'core/heading',
                'core/list',
                //'core/button'
            );   
        }
        
    } else {
        // core/freeform
    }
    
    
    
    return $allowed_blocks;
 
}
add_filter( 'allowed_block_types', '_s_allowed_block_types', 10, 2 );



// block templates


function wp4378295342_maybe_add_template() {
    if ( ! is_admin() || ! isset( $_GET['post'] ) || '1234' !== $_GET['post'] ) {
        // This is not the post/page we want to limit things to.
        return false;
    }

    $post_type_object = get_post_type_object( 'post' );
    $post_type_object->template = array(
        array( 'core/paragraph', array(
            'placeholder' => 'Add Description...',
        ) ),
    );
    $post_type_object->template_lock = 'all';
}
//add_action( 'init', 'wp4378295342_maybe_add_template' );