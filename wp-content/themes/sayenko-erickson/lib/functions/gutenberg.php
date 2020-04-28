<?php

// Editor Styles
add_theme_support( 'editor-styles' );
add_editor_style( 'public/css/editor.css' );

// Enable Block Styles
add_theme_support( 'wp-block-styles' );

add_theme_support( 'align-wide' );


// Disable custom colors
// -- Disable Custom Colors
add_theme_support( 'disable-custom-colors' );

add_theme_support( 'editor-gradient-palette', [] );

// Editor Color Pallete - match theme colors
add_theme_support( 'editor-color-palette', array(   
    array(
		'name'  => __( 'Light Gray', '_s' ),
		'slug'  => 'light-gray',
		'color' => '#F5F5F5',
	)
) );