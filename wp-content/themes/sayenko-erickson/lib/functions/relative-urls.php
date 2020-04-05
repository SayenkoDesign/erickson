<?php

//make other links relative
// add_filter ('site_url', 'wp_make_theme_links_protocols_relative');
// add_filter ('get_option_siteurl', 'wp_make_theme_links_protocols_relative');
// add_filter ('stylesheet_directory_uri', 'wp_make_theme_links_protocols_relative');
// add_filter ('template_directory_uri', 'wp_make_theme_links_protocols_relative');
add_filter ('wp_get_attachment_url', 'wp_make_theme_links_protocols_relative');
add_filter ('wp_get_attachment_thumb_url', 'wp_make_theme_links_protocols_relative');
// add_filter ('the_permalink', 'wp_make_theme_links_protocols_relative');
function wp_make_theme_links_protocols_relative( $link ){
	$link = str_replace("http://", "//", $link);
	$link = str_replace("https://", "//", $link);
	
	return $link;
}


//Make srcset internal
add_filter( 'wp_calculate_image_srcset', 'ssl_srcset' );
function ssl_srcset( $sources ) {
  foreach ( $sources as &$source ) {
	$link = str_replace("http://", "//", $source['url']);
	$link = str_replace("https://", "//", $link);
    $source['url'] = $link;
  }

  return $sources;
}


//Make internal links relative
// add_filter( 'the_permalink', 'wp_make_link_relative' );
// add_action( 'template_redirect', 'rw_relative_urls' );
function rw_relative_urls() {
    // Don't do anything if:
    // - In feed
    // - In sitemap by WordPress SEO plugin
    if ( is_feed() || get_query_var( 'sitemap' ) )
        return;
    $filters = array(
        'post_link',
        'post_type_link',
        'page_link',
        'attachment_link',
        'get_shortlink',
        'post_type_archive_link',
        'get_pagenum_link',
        'get_comments_pagenum_link',
		'get_template_directory_url',
        'term_link',
        'search_link',
        'day_link',
        'month_link',
        'year_link',
    );
    foreach ( $filters as $filter )
    {
        add_filter( $filter, 'wp_make_link_relative' );
    }
}