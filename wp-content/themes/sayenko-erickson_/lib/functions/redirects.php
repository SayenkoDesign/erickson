<?php

// Redirect single resource if page is blocked

function _redirect_single_people()
{
    if ( is_singular( 'people' ) ) {
        
        $team_page = 5958;
        $term = _s_get_primary_term( 'department' );
        if( absint( $team_page ) ) {
            wp_safe_redirect( get_permalink( $team_page ), 302 );
            exit();
        }
    }
}
// add_action( 'template_redirect', '_redirect_single_people' );


function _redirect_single_press()
{
    if ( is_singular( 'press' ) ) {
        wp_safe_redirect( get_post_type_archive_link( 'press' ), 302 );
        exit();
    }
}
// add_action( 'template_redirect', '_redirect_single_press' );