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


function alter_specific_user_field( $result, $user, $field, $post_id ) {

    $result = $user->user_email;

    if( $user->first_name ) {
        
        $result .= ' (' .  $user->first_name;
        
        if( $user->last_name ) {
            
            $result .= ' ' . $user->last_name;
            
        }
        
        $result .= ')';
    }

    return $result;
}
// add_filter("acf/fields/user/result", 'alter_specific_user_field', 10, 4);