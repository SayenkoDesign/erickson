<?php
// If ACF isn't activated, then bail.
if ( ! class_exists( 'acf' ) ) {
	return false;
}


// Google API KEY, Key is stored inside functions.php
function my_acf_init() {
	acf_update_setting( 'google_api_key', GOOGLE_API_KEY );
}

add_action( 'acf/init', 'my_acf_init' );


// filter for a specific field based on it's name
function my_relationship_query( $args, $field, $post_id ) {
	
    // exclude current post from being selected
    $args['exclude'] = $post_id;
	
	
	// return
    return $args;
    
}
add_filter('acf/fields/relationship/query/name=related_posts', 'my_relationship_query', 10, 3);
add_filter('acf/fields/relationship/query/name=related_products', 'my_relationship_query', 10, 3);



/**
 * Populate ACF select field options with Gravity Forms forms
 */
function acf_populate_gf_forms_ids( $field ) {
	if ( class_exists( 'GFFormsModel' ) ) {
		$choices = [];

		foreach ( \GFFormsModel::get_forms() as $form ) {
			$choices[ $form->id ] = $form->title;
		}

		$field['choices'] = $choices;
	}

	return $field;
}
add_filter( 'acf/load_field/name=gravity_form', 'acf_populate_gf_forms_ids' );