<?php

add_filter( 'facetwp_is_main_query', function( $bool, $query ) {
    return ( true === $query->get( 'facetwp' ) ) ? true : $bool;
}, 10, 2 );   


add_filter( 'facetwp_preload_url_vars', function( $url_vars ) {
    if ( 'about/team' == FWP()->helper->get_uri() ) {
        if ( empty( $url_vars['departments'] ) ) {
            $url_vars['departments'] = array( 'all' );
        }
    }
    return $url_vars;
} );


// History Years index as decade

add_filter( 'facetwp_index_row', function( $params, $class ) {
	if ( 'years' == $params['facet_name'] ) { // change date_as_year to name of your facet
		$raw_value = $params['facet_value'];
        if( is_numeric( $raw_value ) ) {
            $params['facet_value'] = floor( $raw_value/10 ) *10;
            $params['facet_display_value'] = $params['facet_value'];
        }
	}
	return $params;
}, 10, 2 );


add_filter( 'facetwp_indexer_row_data', function( $rows, $params ) {
  if ( 'years' == $params['facet']['name'] ) {
    $new_row = $params['defaults'];
    $new_row['facet_value'] = 'all years';
    $new_row['facet_display_value'] = 'View All Years';
    $rows[] = $new_row;
  }
  return $rows;
}, 10, 2 );


// Add "View All"
add_filter( 'facetwp_indexer_row_data', function( $rows, $params ) {
  if ( 'departments' == $params['facet']['name'] ) {
    $new_row = $params['defaults'];
    $new_row['facet_value'] = 'all';
    $new_row['facet_display_value'] = 'View All';
    $rows[] = $new_row;
  }
  return $rows;
}, 10, 2 );




// Run the facet index on save_post

add_action( 'save_post', '_s_facet_index_post', 10, 3 );

/* When a specific post type's post is saved, saves our custom data
 * @param int     $post_ID Post ID.
 * @param WP_Post $post    Post object.
 * @param bool    $update  Whether this is an existing post being updated or not.
*/
function _s_facet_index_post( $post_id, $post, $update ) {
  // verify if this is an auto save routine. 
  // If it is our form has not been submitted, so we dont want to do anything
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
      return;
      
  if( ! class_exists( 'FWP' ) ) {
      return;
  }

  FWP()->indexer->index();
  
}

// Create custom FacetWP pagination to match our custom archive pagination
function my_facetwp_pager_html( $output, $params ) {
    $output = '<ul class="nav-links">';
    $page = (int) $params['page'];
    $total_pages = (int) $params['total_pages'];
 
    // Only show pagination when > 1 page
    if ( 1 < $total_pages ) {
 
        if ( 1 < $page ) {
            $output .= sprintf( '<li class="nav-previous"><a class="facetwp-page" data-page="%s"><span>&laquo; %s</span></a></li>',
                                ( $page - 1 ), __( 'Previous Page', '_s' ) );
        }
        else {
             $output .= sprintf( '<li class="nav-previous"><a class="disable"><span>&laquo; %s</span></a></li>',
             __( 'Previous Page', '_s' ) );
        }
        
        if ( 3 < $page ) {
            $output .= '<li><a class="facetwp-page first-page" data-page="1">1</a></li>';
            $output .= ' <span class="dots">…</span> ';
        }
        for ( $i = 2; $i > 0; $i-- ) {
            if ( 0 < ( $page - $i ) ) {
                $output .= '<li class="number"><a class="facetwp-page" data-page="' . ($page - $i) . '">' . ($page - $i) . '</a></li>';
            }
        }
 
        // Current page
        $output .= '<li class="number active" aria-label="Current page"><a class="facetwp-page active" data-page="' . $page . '">' . $page . '</a></li>';
 
        for ( $i = 1; $i <= 2; $i++ ) {
            if ( $total_pages >= ( $page + $i ) ) {
                $output .= '<li class="number"><a class="facetwp-page" data-page="' . ($page + $i) . '">' . ($page + $i) . '</a></li>';
            }
        }
        if ( $total_pages > ( $page + 2 ) ) {
            $output .= ' <span class="dots">…</span> ';
            $output .= '<li class="number"><a class="facetwp-page last-page" data-page="' . $total_pages . '">' . $total_pages . '</a></li>';
        }
        
        if ( $page < $total_pages ) {
            $output .= sprintf( '<li class="nav-next"><a class="facetwp-page" data-page="%s"><span>%s &raquo;</span></a></li>',
            ( $page + 1 ), __( 'Next Page', '_s' ) );
        }
        else {
             $output .= sprintf( '<li class="nav-next"><a class="disable"><span>%s &raquo;</span></a></li>', 
             __( 'Next Page', '_s' ) );
        }
    }
 
    $output .= '</ul>';
 
    return $output;
}

add_filter( 'facetwp_pager_html', 'my_facetwp_pager_html', 10, 2 );


// Customize the FacetWP sort options

add_filter( 'facetwp_sort_options', function( $options, $params ) {
    $options['default']['label'] = 'Select One';
    return $options;
}, 10, 2 );


add_filter( 'facetwp_sort_options', function( $options, $params ) {
    unset( $options['title_asc'] );
    unset( $options['title_desc'] );
    return $options;
}, 10, 2 );
