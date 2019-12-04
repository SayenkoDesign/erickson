<?php
 
/**
 * Create new CPT - Technology
 */
 
class CPT_Technology extends CPT_Core {

    const POST_TYPE = 'technology';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Technology', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Technologies', self::TEXTDOMAIN, '_s' ), // Plural
				self::POST_TYPE // Registered name/slug
			),
			array( 
				'public'              => false,
				'publicly_queryable'  => false,
				'show_ui'             => true,
				'query_var'           => true,
				'capability_type'     => 'post',
				'has_archive'         => false,
				'hierarchical'        => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => false,
				'exclude_from_search' => true,
				//'rewrite'             => array( 'slug' => 'teams' ),
				'supports' => array( 'title', 'revisions', 'page-attributes' )
			)

        );
		        
     }
 
}

new CPT_Technology();


$cpt_technology_categories = array(
    __( 'Technology Category', CPT_Technology::TEXTDOMAIN, '_s' ), // Singular
    __( 'Technologies Categories', CPT_Technology::TEXTDOMAIN, '_s' ), // Plural
    'technology_cat' // Registered name
);

register_via_taxonomy_core( $cpt_technology_categories, 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( CPT_Technology::POST_TYPE ) 
);