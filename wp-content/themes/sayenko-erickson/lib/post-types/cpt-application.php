<?php
 
/**
 * Create new CPT - Application
 */
 
class CPT_Application extends CPT_Core {

    const POST_TYPE = 'application';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Application', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Applications', self::TEXTDOMAIN, '_s' ), // Plural
				self::POST_TYPE // Registered name/slug
			),
			array( 
				'public'              => true,
				'publicly_queryable'  => true,
				'show_ui'             => true,
				'query_var'           => true,
				'capability_type'     => 'post',
				'has_archive'         => false,
				'hierarchical'        => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => true,
				'exclude_from_search' => true,
				//'rewrite'             => array( 'slug' => 'teams' ),
                //'show_in_rest' => true,
				'supports' => array( 'title', 'editor', 'thumbnail', 'revisions' )
			)

        );
		        
     }
 
}

new CPT_Application();
