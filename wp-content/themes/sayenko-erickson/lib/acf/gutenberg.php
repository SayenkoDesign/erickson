<?php

function _s_acf_block_render_callback( $block ) {

	// convert name ("acf/testimonial") into path friendly slug ("testimonial")
	$slug = str_replace( 'acf/', '', $block['name'] );
            
	// include a template part from within the "template-parts/block" folder
    
    _s_get_template_part( "template-parts/block", $slug, [ 'data' => [ 'block' => $block ] ] ); 
    
    /*
    if( is_admin() ) {
        //$template = get_theme_file_path( "/template-parts/block/{$slug}/backend.php" );
        _s_get_template_part( "template-parts/block/{$slug}", "backend", $data ); 
    } else {
        //$template = get_theme_file_path( "/template-parts/block/{$slug}/frontend.php" );  
        _s_get_template_part( "template-parts/block/{$slug}", "frontend", $data ); 
    }
    */
}



/**
 * Load colors dynamically into select field from _s_get_theme_colors()
 *
 * @param array $field field options.
 * @return array new field choices.
 *
 * @author Corey Colins <corey@webdevstudios.com>
 */
function _s_acf_load_color_picker_field_choices( $field ) {

	// Reset choices.
	$field['choices'] = array();

	// Grab our colors array.
	$colors = _s_get_theme_colors();

	// Loop through colors.
	foreach ( $colors as $key => $color ) {

		// Create display markup.
		$color_output = '<div style="display: flex; align-items: center;"><span style="background-color:' . esc_attr( $color ) . '; border: 1px solid #ccc;display:inline-block; height: 15px; margin-right: 10px; width: 15px;"></span>' . esc_html( $key ) . '</div>';

		// Set values.
		$field['choices'][ sanitize_title( $key ) ] = $color_output;
	}

	// Return the field.
	return $field;
}
//add_filter( 'acf/load_field/name=color_picker', '_s_acf_load_color_picker_field_choices' );


/**
 * Get the theme colors for this project. Set these first in the Sass partial then migrate them over here.
 *
 * @return array The array of our color names and hex values.
 * @author Corey Collins
 */
function _s_get_theme_colors() {
	return array(
		esc_html__( 'Gray', '_s' )           => '#4A4A4A',
		esc_html__( 'White', '_s' )          => '#ffffff',
        esc_html__( 'Blue', '_s' )           => '#00ACCA'
	);
}


/**
 * Load colors dynamically into select field from _s_get_theme_colors()
 *
 * @param array $field field options.
 * @return array new field choices.
 *
 * @author Corey Colins <corey@webdevstudios.com>
 */
function _s_acf_load_background_color_picker_field_choices( $field ) {

	// Reset choices.
	$field['choices'] = array();

	// Grab our colors array.
	$colors = _s_get_theme_background_colors();

	// Loop through colors.
	foreach ( $colors as $key => $color ) {

		// Create display markup.
		$color_output = '<div style="display: flex; align-items: center;"><span style="background-color:' . esc_attr( $color ) . '; border: 1px solid #ccc;display:inline-block; height: 15px; margin-right: 10px; width: 15px;"></span>' . esc_html( $key ) . '</div>';

		// Set values.
		$field['choices'][ sanitize_title( $key ) ] = $color_output;
	}

	// Return the field.
	return $field;
}
//add_filter( 'acf/load_field/name=background_color_picker', '_s_acf_load_background_color_picker_field_choices' );

/**
 * Get the theme colors for this project. Set these first in the Sass partial then migrate them over here.
 *
 * @return array The array of our color names and hex values.
 * @author Corey Collins
 */
function _s_get_theme_background_colors() {
	return array(
		esc_html__( 'White', '_s' )          => '#ffffff',
        esc_html__( 'Gray', '_s' )           => '#EFF3F1',
        esc_html__( 'Dark Blue', '_s' )      => '#0F3D4A'
	);
}



add_image_size( 'acf-thumbnail', 150, 150, false );
add_image_size( 'acf-medium', 320, 999, false );
add_image_size( 'acf-large', 640, 999, false );

function _s_acf_block_image_sizes( $sizes ) {
    return array_merge( $sizes, array(
    'homepage-thumb' 	=> __( 'Homepage Thumb', '_s' ),
    'search-thumb' 		=> __( 'Search Thumb', '_s' ),
    ) );
}
// add_filter( 'image_size_names_choose', '_s_acf_block_image_sizes' );
