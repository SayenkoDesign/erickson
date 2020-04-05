<?php

add_filter ('wp_get_attachment_url', 'wp_make_theme_links_protocols_relative');
function wp_make_theme_links_protocols_relative( $link ){
    if( empty( get_option( 'autoptimize_cdn_url' ) ) {
        return;
    }
    //$url = 'https://39mzo2r2vex16vj0czuuv21m-wpengine.netdna-ssl.com';  
    $url = get_option( 'autoptimize_cdn_url' );
    $url = rtrim( $url, '/');
    $link = str_replace( site_url(), $url, $link );	
	return $link;
}