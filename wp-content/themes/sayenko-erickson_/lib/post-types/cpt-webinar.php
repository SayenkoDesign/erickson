<?php
 
/**
 * Create new CPT - Webinar
 */
 
class CPT_WEBINAR extends CPT_Core {

    const POST_TYPE = 'webinar';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Webinar', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Webinars', self::TEXTDOMAIN, '_s' ), // Plural
				self::POST_TYPE // Registered name/slug
			),
			array( 
				'public'              => true,
				'publicly_queryable'  => true,
				'show_ui'             => true,
				'query_var'           => true,
				'capability_type'     => 'post',
				'has_archive'         => true,
				'hierarchical'        => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => true,
				'exclude_from_search' => false,
        'show_in_rest'        => true,
				'rewrite'             => array( 'with_front' => false, 'slug' => 'webinars' ),
				'supports' => array( 'title', 'editor', 'thumbnail' ),
				 )

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );

    
		
     }
     
     
    public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( 'webinar' ) ) ) {
            $query->set( 'posts_per_page', '8' );
        }
        
    }
 
}

new CPT_WEBINAR();




/*
 * Add columns to exhibition post list
 */
 function add_acf_columns ( $columns ) {
   return array_merge ( $columns, array ( 
     'webinar_date' => __ ( 'Webinar Date', '_s' ),
   ) );
 }
 add_filter ( 'manage_webinar_posts_columns', 'add_acf_columns' );
 
 
  /*
 * Add columns to exhibition post list
 */
 function npm_webinars_custom_column ( $column, $post_id ) {
   switch ( $column ) {
     case 'webinar_date':
       echo get_field ( 'webinar_date' );
       break;
   }
 }
 add_action ( 'manage_webinar_posts_custom_column', 'npm_webinars_custom_column', 10, 2 );