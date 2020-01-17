<?php
 
/**
 * Create new CPT - Case Studies
 */
 
class CPT_CASE_STUDY extends CPT_Core {

    const POST_TYPE = 'case_study';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Case Study', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Case Studies', self::TEXTDOMAIN, '_s' ), // Plural
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
				'rewrite'             => array( 'slug' => 'case-studies' ),
				'supports' => array( 'title', 'editor', 'thumbnail' ),
				 )

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );

    
		
     }
     
     
    public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( 'case_study' ) ) ) {
            $query->set( 'posts_per_page', '8' );
        }
        
    }
 
}

new CPT_CASE_STUDY();