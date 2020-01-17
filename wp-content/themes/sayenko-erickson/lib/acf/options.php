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
		'page_title' 	=> 'Company',
		'menu_title' 	=> 'Company',
        'menu_slug' 	=> 'theme-settings-company',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts'
	)); 
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Emergency Fire Fighting',
		'menu_title' 	=> 'Emergency Fire Fighting',
        'menu_slug' 	=> 'theme-settings-emergency',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts'
	)); 
    
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Mega Menu',
		'menu_title' 	=> 'Mega Menu',
        'menu_slug' 	=> 'theme-settings-mega-menu',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts'
	));   
    
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Notifications',
		'menu_title' 	=> 'Notifications',
        'menu_slug' 	=> 'theme-settings-notifications',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts'
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
		'page_title' 	=> 'Case Study Archive',
		'menu_title' 	=> 'Archive Settings',
        'menu_slug' 	=> 'archive-settings-case-study',
		'parent'     => 'edit.php?post_type=case_study',
		'capability' => 'manage_options'
	)); 
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Fleet Archive',
		'menu_title' 	=> 'Archive Settings',
        'menu_slug' 	=> 'archive-settings-fleet',
		'parent'     => 'edit.php?post_type=fleet',
		'capability' => 'manage_options'
	));     
    
    acf_add_options_sub_page(array(
		'page_title' 	=> 'Footer CTA',
		'menu_title' 	=> 'Footer CTA',
        'menu_slug' 	=> 'theme-settings-footer-cta',
        'parent' 		=> 'theme-settings',
		'capability' => 'edit_posts',
 		'redirect' 	=> false,
        'autoload' => true,
	));      

}