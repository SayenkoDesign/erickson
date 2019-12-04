<?php


// Add modals to footer
function _s_footer() {
    _s_get_template_part( 'template-parts/modal', 'contact' );   
}
add_action( 'wp_footer', '_s_footer' );

/*
 * Modify TinyMCE editor to remove H1.
 */
function tiny_mce_remove_unused_formats($init) {
	// Add block format elements you want to show in dropdown
	$init['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;';
	return $init;
}

// add_filter('tiny_mce_before_init', 'tiny_mce_remove_unused_formats' );



function get_meta_values( $key = '', $type = 'post', $status = 'publish' ) {

    global $wpdb;

    if( empty( $key ) )
        return;

    $r = $wpdb->get_col( $wpdb->prepare( "
        SELECT pm.meta_value FROM {$wpdb->postmeta} pm
        LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
        WHERE pm.meta_key = '%s' 
        AND p.post_status = '%s' 
        AND p.post_type = '%s'
    ", $key, $status, $type ) );

    return $r;
}

// Exclude page templates from being used more than once.
function _s_remove_page_template( $pages_templates ) {
    
    // List of templates that can be used more than once
    $excludes = [ 'page-templates/page-builder.php', 'page-templates/redirect.php' ];
    
    
    // Don't touch anyhting below
    
    
    global $post;
    
    // Bail if not a page edit screen
    if( 'page' != get_post_type( $post ) ) {
        return $pages_templates;
    }
    
    // Get list of templates
    $templates = get_meta_values( '_wp_page_template', 'page' ); 
    
    // Bail if no templates set
    if( empty( $templates ) ) {
        return $pages_templates;
    }
            
    if( ! empty( $excludes ) ) {
        foreach( $excludes as $exclude ) {
            unset( $templates[$exclude] );
        }
    }
    
    foreach( $templates as $template ) {
        if( $template != get_page_template_slug( $post->ID ) ) {
            unset( $pages_templates[$template] );
        }
    }
           
    return $pages_templates;
}

// add_filter( 'theme_page_templates', '_s_remove_page_template', 20 );


add_filter( 'upload_mimes', 'my_myme_types', 1, 1 );
function my_myme_types( $mime_types ) {
  $mime_types['step'] = 'text/plain';     // Adding .svg extension
  
  return $mime_types;
}
