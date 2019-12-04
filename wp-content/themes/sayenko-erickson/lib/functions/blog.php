<?php

// Wrap category links with an inner span so that we can better style them if needed this created <a href=""><span></span></a>
add_filter( 'the_category', function( $the_list ) {  

    if( is_admin() ) {
        return $the_list;
    }
  
    $dom = new DOMDocument();
    $dom->loadHTML( $the_list );
    foreach( $dom->getElementsByTagName('a') as $a ) {
        $span = $dom->createElement( 'span' );
        $span->nodeValue = $a->nodeValue;
        $a->nodeValue = '';
        $a->appendChild( $span );
    }
    
    return $dom->saveHtml();
});


// Custom paginate links function
function _s_paginate_links( $args = [] ) {
    
    $defaults = array(
        'prev_text'          => __('<span>« Previous Page</span>', '_s'),
        'next_text'          => __('<span>Next Page »</span>', '_s'),
        'type'               => 'array'
    );
    
    $args = wp_parse_args( $args, $defaults );
    
    $links =  paginate_links( $args );
    
    if( empty( $links ) ) {
        return false;
    }
    
    $out = [];
    
    $previous = $next = false;
    
    foreach( $links as $link ) {
        $class = 'number';
        if (strpos( $link, 'prev') !== false) {
            $previous = true;
            $class = 'nav-previous';
        } else if (strpos( $link, 'next') !== false) {
            $next = true;
            $class = 'nav-next';
        } else {
            $class = 'number';   
        }
        
        $out[] = sprintf( '<li class="%s">%s</li>', $class, $link );
    }
    
    if( ! $previous ) {
        array_unshift( $out, sprintf( '<li class="nav-previous"><a class="disable">%s</a></li>', $args['prev_text'] ) );
    }
    
    if( ! $next ) {
        $out[] = sprintf( '<li class="nav-next"><a class="disable">%s</a></li>', $args['next_text'] );
    }
    
    return sprintf( '<div class="posts-pagination"><ul class="nav-links">%s</ul>', join( '', $out ) );
}


// Custom post navigation function
function _s_get_the_post_navigation( $args = array() ) {
    $args = wp_parse_args( $args, array(
        'prev_text'          => '%title',
        'next_text'          => '%title',
        'in_same_term'       => false,
        'excluded_terms'     => '',
        'taxonomy'           => 'category',
        'screen_reader_text' => __( 'Post navigation', '_s' ),
        'type' => 'html'
    ) );
 
    $navigation = '';
 
    $next = get_previous_post_link(
        '<div class="nav-next">%link</div>',
        $args['next_text'],
        $args['in_same_term'],
        $args['excluded_terms'],
        $args['taxonomy']
    );
 
    $previous = get_next_post_link(
        '<div class="nav-previous">%link</div>',
        $args['prev_text'],
        $args['in_same_term'],
        $args['excluded_terms'],
        $args['taxonomy']
    );
 
    // Only add markup if there's somewhere to navigate to.
    if ( $previous || $next ) {
        
        if( 'array' == $args['type'] ) {
            $navigation = [ 'previous' => $previous, 'next' => $next ];
        } else {
           $navigation = _navigation_markup( $previous . $next, 'post-navigation', $args['screen_reader_text'] ); 
        }        
    }
 
    return $navigation;
}


/*
// adding custom post types to blog pagination
add_action( 'get_previous_post_where', 'misha_posts_and_page', 20 );
add_action( 'get_next_post_where', 'misha_posts_and_page', 20 );
 
function misha_posts_and_page( $where ){
	// $where looks like WHERE p.post_date < '2017-08-02 09:07:03' AND p.post_type = 'post' AND ( p.post_status = 'publish' OR p.post_status = 'private' )
	// In code $where looks like $wpdb->prepare( "WHERE p.post_date $op %s AND p.post_type = %s $where", $post->post_date, $post->post_type )
	// Parameters $op and another $where can not be passed to this action hook
	// So, I think the best way is to use str_replace()
	return str_replace(
		array( "p.post_type = 'post'", "p.post_type = 'story'", "p.post_type = 'event'" ),
		"(p.post_type = 'post' OR p.post_type = 'story' OR p.post_type = 'event')",
		$where
	);
 
}
*/


function _s_get_post_terms( $post_id ) {
    $taxonomy = 'category';
    $terms = wp_get_post_terms( $post_id, $taxonomy );
    if( !is_wp_error( $terms ) && !empty( $terms ) ) {
        $out = '';
        foreach( $terms as $term ) {
            $term_class = sanitize_title( $term->name );
        $out .= sprintf( '<li><a href="%s" class="term-link %s">%s<span>%s</span></a></li>', get_term_link( $term->slug, $taxonomy ), $term_class, get_svg( $term_class ), $term->name );
        }
        
        return sprintf( '<ul class="post-categories">%s</ul>', $out );
        
    }
    
}


function _s_get_post_term( $post_id ) {
    $taxonomy = 'category';
    $terms = wp_get_post_terms( $post_id, $taxonomy );
    if( !is_wp_error( $terms ) ) {
        $term = array_pop($terms);
        $term_class = sanitize_title( $term->name );
        return sprintf( '<a href="%s" class="term-link %s">%s<span>%s</span></a>', get_term_link( $term->slug, $taxonomy ), $term_class, get_svg( $term_class ), $term->name );
    }
    
}

// Switch comment form submit to a button, for better styling
function comment_form_submit_button($button) {
    $button = sprintf( "<button class='submit button'><span>%s</span></button>", 'Post Comment' ) . //Add your html codes here
    get_comment_id_fields();
    return $button;
}
add_filter('comment_form_submit_button', 'comment_form_submit_button');