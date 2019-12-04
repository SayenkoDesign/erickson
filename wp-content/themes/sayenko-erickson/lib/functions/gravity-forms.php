<?php

// Turn on label visibility
add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

// On submit scroll back down to form
add_filter( 'gform_confirmation_anchor', '__return_true' );

// Remove scroll to a specific form #5
//add_filter( 'gform_confirmation_anchor_5', '__return_false' );



/**
 * Filters the next, previous and submit buttons.
 * Replaces the forms <input> buttons with <button> while maintaining attributes from original <input>.
 *
 * @param string $button Contains the <input> tag to be filtered.
 * @param object $form Contains all the properties of the current form.
 *
 * @return string The filtered button.
 */
add_filter( 'gform_next_button', 'input_to_button', 10, 2 );
add_filter( 'gform_previous_button', 'input_to_button', 10, 2 );
add_filter( 'gform_submit_button', 'input_to_button', 10, 2 );
function input_to_button( $button, $form ) {
    $dom = new DOMDocument();
    $dom->loadHTML( $button );
    $input = $dom->getElementsByTagName( 'input' )->item(0);
    $new_button = $dom->createElement( 'button' );
    $new_button->appendChild( $dom->createTextNode( $input->getAttribute( 'value' ) ) );
    $input->removeAttribute( 'value' );
    foreach( $input->attributes as $attribute ) {
        $new_button->setAttribute( $attribute->name, $attribute->value );
    }
    $input->parentNode->replaceChild( $new_button, $input );
    
    $new_button_text = sprintf( '<span>%s</span>', $form['button']['text'] );
 
    $button =  $dom->saveHtml( $new_button );
    $button = str_replace( $form['button']['text'], $new_button_text, $button );
    
    return $button;
}



function _s_get_dropdown_posts( $post_type = false ) {
    
    if( empty( $post_type ) || ! post_type_exists( $post_type ) ) {
        return false;
    }
    
    // arguments, adjust as needed
	$args = array(
		'post_type'      => $post_type,
		'posts_per_page' => 100,
		'post_status'    => 'publish',
        'order'          => 'ASC',
        'orderby'        => 'title'
	);

	// Use $loop, a custom variable we made up, so it doesn't overwrite anything
	$loop = new WP_Query( $args );
    
    $list = [];

	// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
	// don't want to use $wp_query, use our custom variable instead.
	if ( $loop->have_posts() ) : 
		while ( $loop->have_posts() ) : $loop->the_post(); 

			$list[] = get_the_title();

		endwhile;
	endif;

	// We only need to reset the $post variable. If we overwrote $wp_query,
	// we'd need to use wp_reset_query() which does both.
	wp_reset_postdata();
    
    return $list;   
}


function _s_gf_populate_dropdown( $form, $class ) {
     
    
    
    foreach ( $form['fields'] as &$field ) {
         
        if ( $field->type != 'radio' || strpos( $field->cssClass, $class ) === false ) {
            continue;
        }
                
        $post_type = str_replace( 'populate_', '', $class );
        
        $rows = _s_get_dropdown_posts( $post_type );
         
        $choices = array();
 
        foreach ( $rows as $row ) {
            $choices[] = array( 'text' => $row, 'value' => $row );
        }
 
        // update 'Select a Post' to whatever you'd like the instructive option to be
        // $field->placeholder = 'Select a Location';
        $field->choices = $choices;
 
    }
 
    return $form;
}


function _s_gf_populate_application( $form ) {
    return _s_gf_populate_dropdown( $form, 'populate_application' );
}

//add_filter( 'gform_pre_render', '_s_gf_populate_application' );
//add_filter( 'gform_pre_validation', '_s_gf_populate_application' );
//add_filter( 'gform_pre_submission_filter', '_s_gf_populate_application' );
//add_filter( 'gform_admin_pre_render', '_s_gf_populate_application' );


function _s_gf_populate_product( $form ) {
    return _s_gf_populate_dropdown( $form, 'populate_product' );
}

//add_filter( 'gform_pre_render', '_s_gf_populate_product' );
//add_filter( 'gform_pre_validation', '_s_gf_populate_product' );
//add_filter( 'gform_pre_submission_filter', '_s_gf_populate_product' );
//add_filter( 'gform_admin_pre_render', '_s_gf_populate_product' );

function _s_gf_populate_technology( $form ) {
    return _s_gf_populate_dropdown( $form, 'populate_technology' );
}

//add_filter( 'gform_pre_render', '_s_gf_populate_technology' );
//add_filter( 'gform_pre_validation', '_s_gf_populate_technology' );
//add_filter( 'gform_pre_submission_filter', '_s_gf_populate_technology' );
//add_filter( 'gform_admin_pre_render', '_s_gf_populate_technology' );