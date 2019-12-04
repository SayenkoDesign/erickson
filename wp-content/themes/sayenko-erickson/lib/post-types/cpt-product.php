<?php
 
/**
 * Create new CPT - Product
 */
 
class CPT_Product extends CPT_Core {

    const POST_TYPE = 'product';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Product', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Products', self::TEXTDOMAIN, '_s' ), // Plural
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
				'supports' => array( 'title', 'thumbnail', 'excerpt', 'revisions' )
			)

        );
		        
     }
 
}

new CPT_Product();
