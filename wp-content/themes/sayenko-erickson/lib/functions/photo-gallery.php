<?php

/**
 * FacetWP Query Args
 *
 */
 
add_filter( 'facetwp_is_main_query', function( $is_main_query, $query ) {
    if ( '' !== $query->get( 'facetwp' ) ) {
        $is_main_query = (bool) $query->get( 'facetwp' );
    }
    return $is_main_query;
}, 10, 2 );
  
add_filter( 'facetwp_query_args', function( $args ) {
	$args['post_status'] = 'any';
	return $args;
}, 10 );

/** inherit adds attachment indexing **/
add_filter( 'facetwp_indexer_query_args', function( $args ) {
    $args['post_status'] = array( 'publish', 'inherit' );
    return $args;
});

/** modifies string for mine type
 ** example image/png becomes image
 **/
add_filter( 'facetwp_index_row', function( $params, $class ) {
    if ( 'photo_gallery_service' == $params['facet_name'] ) {
          
          $post_id = $params['facet_value'];
          //$params['facet_value'] = sanitize_title_with_dashes( get_the_title( $post_id ) );
          $params['facet_display_value'] = get_the_title( $post_id );
          error_log( print_r( $params, 1));
    }
    return $params;
}, 10, 2 );



function _s_get_gallery_photos() {
    global $post;
    $post_id = $post->ID;
    $photos = [];
    
    $repeater = 'photos'; // the field name of the repeater field
    $subfield1 = 'service'; // the field I want to get
    $subfield2 = 'gallery'; // the field I want to set
    
    // get the number of rows in the repeater
    $count = intval( get_post_meta( $post_id, $repeater, true ) );
    // loop through the rows
    for ( $i = 0; $i < $count; $i++ ) {
        $service = get_post_meta($post_id, $repeater.'_'.$i.'_'.$subfield1, true );
        $gallery = get_post_meta($post_id, $repeater.'_'.$i.'_'.$subfield2, true );
        if( ! empty( $gallery ) ) {
            foreach( $gallery as $attachment_id ) {
                array_push( $photos, $attachment_id );
            }
        }
        
    }
    
    return $photos;   
}


// Add filters from repeater fields.
function _s_save_gallery_attachment_service( $post_id, $post ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// We need to prevent trying to assign when trashing or untrashing posts in the list screen.
	// get_current_screen() was not providing a unique enough value to use here.
	if ( isset( $_REQUEST['action'] ) && in_array( $_REQUEST['action'], array( 'trash', 'untrash' ) ) ) {
		return;
	}
    
    $repeater = 'photos'; // the field name of the repeater field
    $subfield1 = 'service'; // the field I want to get
    $subfield2 = 'gallery'; // the field I want to set
    
    // get the number of rows in the repeater
    $count = intval( get_post_meta( $post_id, $repeater, true ) );
    // loop through the rows
    for ( $i = 0; $i < $count; $i++ ) {
        $service = get_post_meta($post_id, $repeater.'_'.$i.'_'.$subfield1, true );
        $gallery = get_post_meta($post_id, $repeater.'_'.$i.'_'.$subfield2, true );
        if( ! empty( $gallery ) ) {
            foreach( $gallery as $attachment_id ) {
                update_post_meta( $attachment_id, 'gallery_service', $service );
            }
        }
        
    }
}

// Check on save if content contains video.
add_action( 'save_post', '_s_save_gallery_attachment_service', 10, 2 );