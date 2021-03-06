<?php

// https://www.billerickson.net/building-a-header-block-in-wordpress/

// https://stackoverflow.com/questions/62915921/skip-certain-gutenberg-block-in-loop

/*
add_filter( 'gform_confirmation', function( $confirmation, $form, $entry, $ajax ) {
    $confirmation .= "<script>window.top.jQuery(document).on('gform_confirmation_loaded', function () { console.log('gform_confirmation_loaded running'); } );</script>";
 
    return $confirmation;
}, 10, 4 );
*/

// after submission redirect to video


// set cookie for webinars after form submission
/*
add_filter( "gform_confirmation", function( $confirmation, $form, $entry, $ajax ) {
    $cookie = sprintf( 'post_%s_form_%s', get_the_ID(), $form['id'] );
    setrawcookie( $cookie, 'true', strtotime( '+30 days' ), '/' );
}, 10, 4 );
*/


/*
function get_cookie() { 
$visit_time = date('F j, Y g:i a');
if(isset($_COOKIE['visit_time'])) {
function placeholder() {
}
}
}
*/


function get_ip_address() {

    //whether ip is from share internet
    if ( !empty($_SERVER['HTTP_CLIENT_IP'] ) ) {
        $ip_address = $_SERVER['HTTP_CLIENT_IP'];
    } 
    //whether ip is from remote address
    else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }
    
    return $ip_address;   
}


function _s_get_transient_name() {
    
    $ip = get_ip_address();
    return sprintf( 'webinar_%s_ip_%s', get_the_ID(), $ip ); 
       
}


function _s_set_webinar_transient() {

    $transient_name = _s_get_transient_name();
    
    $access_granted = get_transient( $transient_name );
    
    if ( false === $access_granted ) {
        set_transient( $transient_name, 'true', MONTH_IN_SECONDS );
    }

}


function _s_get_webinar_transient() {

    $transient_name = _s_get_transient_name();
    
    $access_granted = get_transient( $transient_name );
    
    if ( false === $access_granted ) {
        return false;
    }
    
    return true;

}


add_filter( "gform_confirmation", function( $confirmation, $form, $entry, $ajax ) {
    _s_set_webinar_transient();
    
    return $confirmation;
    
}, 10, 4 );



function remove_blocks() {
// Check if we're inside the main loop in a post or page
  if ( is_singular( 'webinar' ) && in_the_loop() && is_main_query() ) {
    //parse the blocks so they can be run through the foreach loop
    $blocks = parse_blocks( get_the_content() );
    foreach ( $blocks as $block ) {
        //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
        
        echo $block['blockName'];
        
        if ( 'lazyblock/top-of-page' === $block['blockName'] ) {
            continue;
        } else {
            echo render_block( $block );
        }
    }
  }
}

// add_filter( 'the_content', 'remove_blocks');


_s_get_webinar_transient()