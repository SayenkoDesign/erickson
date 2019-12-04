<?php

// If ACF isn't activated, then bail.
if ( ! class_exists( 'acf' ) ) {
	return false;
}


/**
*  Creates ACF Options Page(s)
*/

if( function_exists('acf_add_options_sub_page') ) {

	acf_add_options_page(array(
		'page_title' 	=> 'Theme Settings',
		'menu_title' 	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-settings',
		'capability' 	=> 'edit_posts',
 		'redirect' 	=> true
	));
    
    acf_add_options_sub_page(array(
		'page_title' 	=> '404 Page',
		'menu_title' 	=> '404 Page',
        'menu_slug' 	=> 'theme-settings-error-404',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts',
 		'redirect' 	=> false,
        'autoload' => false,
	));
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Social Profiles',
		'menu_title' 	=> 'Social Profiles',
        'menu_slug' 	=> 'theme-settings-social',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts',
 		'redirect' 	=> false,
        'autoload' => false,
	));    
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Company',
		'menu_title' 	=> 'Company',
        'menu_slug' 	=> 'theme-settings-company',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts',
 		'redirect' 	=> false,
        'autoload' => false,
	));  
      

}