<?php
 
/**
 * Create new CPT - Service
 */
 
class CPT_Service extends CPT_Core {

    const POST_TYPE = 'service';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Service', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Services', self::TEXTDOMAIN, '_s' ), // Plural
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
				'exclude_from_search' => false,
                'show_in_rest'        => true,
				'rewrite'             => array( 'with_front' => false, 'slug' => 'aviation-services' ),
				'supports' => array( 'title', 'editor', 'thumbnail', 'revisions' ),
                'template' => array(
                    array( 'acf/hero' ),
                    array( 'acf/approach' ),
                    array( 'acf/results' ),
                    array( 'acf/clients' ),
                    array( 'acf/case-studies' ),
                    array( 'acf/photo-gallery' )
                )
			)

        );
		        
     }
     
}

new CPT_Service();