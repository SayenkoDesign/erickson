<?php

// install plugin delete-expired-transients

// https://www.billerickson.net/building-a-header-block-in-wordpress/

// https://stackoverflow.com/questions/62915921/skip-certain-gutenberg-block-in-loop


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
    
    if( is_singular( 'webinar' ) ) {
        
        $youtube_id = wds_check_for_youtube( get_field( 'video', get_the_ID() ) );
        
        if( ! empty( $youtube_id ) ) {
            
            $params = array(
                'hd'       => 1,
                'rel'      => 0,
            );
    
            $video_embed_url = add_query_arg( $params, 'https://www.youtube.com/embed/' . $youtube_id );
                        
            $confirmation .= sprintf( '<div class="wide-embed"><div class="responsive-embed widescreen">
              <iframe width="560" height="315" src="%s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>
            </div></div>', $video_embed_url );
        }        
        
    }
    
    return $confirmation;
    
}, 10, 4 );

/*
add_filter( 'gform_confirmation', function ( $confirmation, $form, $entry ) {
        
    $settings = get_field( 'case_study_archive', 'option' );
    
    if( ! empty( $settings['gated_form']['form_id']) ) {
        $form_id = $settings['gated_form']['form_id'];
        
        if( $form_id == $form['id'] ) {
            $url = $form['confirmation']['url'];
            $find =  defined( 'JSON_HEX_TAG' ) ? json_encode( $url, JSON_HEX_TAG ) : json_encode( $url );
            $find = str_replace( '"', '', $find );
            GFCommon::log_debug( 'case study confirmation url old: ' . $find );
            $redirect = rgar( $entry, '6' );
            $replace =  defined( 'JSON_HEX_TAG' ) ? json_encode( $redirect, JSON_HEX_TAG ) : json_encode( $redirect );
            $replace = str_replace( '"', '', $replace );
            GFCommon::log_debug( 'case study confirmation url new: ' . $replace );
            GFCommon::log_debug( 'case study old confirmation: ' . $confirmation );
            $confirmation = str_replace( $find, $replace, $confirmation );
        }
    }
            
    return $confirmation;
}, 10, 3 );
*/



add_filter( 'gform_field_value_form_handler', function() {
    if( is_singular( 'webinar' ) ) {
        $form_handler = get_field( 'form_handler' );
        if( ! empty( $form_handler ) ) {
            return $form_handler;
        }
    }
});


function remove_blocks( $content ) {
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

//add_filter( 'the_content', 'remove_blocks');