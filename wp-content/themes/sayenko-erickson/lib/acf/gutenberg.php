<?php
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
		esc_html__( 'Light Gray', '_s' )     => '#ECECEC',
		esc_html__( 'White', '_s' )          => '#ffffff',
        esc_html__( 'Navy', '_s' )           => '#123759'
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
        esc_html__( 'Dark Blue', '_s' )      => '#123759'
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




function _s_has_h1_block( $blocks = array() ) {
	foreach ( $blocks as $block ) {

		if( ! isset( $block['blockName'] ) )
			continue;

		// Custom header block
		if( 'acf/hero' === $block['blockName'] ) {
			return true;

		// Heading block
		} elseif( 'core/heading' === $block['blockName'] && isset( $block['attrs']['level'] ) && 1 === $block['attrs']['level'] ) {
			return true;

		// Scan inner blocks for headings
		} elseif( isset( $block['innerBlocks'] ) && !empty( $block['innerBlocks'] ) ) {
			$inner_h1 = be_has_h1_block( $block['innerBlocks'] );
			if( $inner_h1 )
				return true;
		}
	}

	return false;
}
