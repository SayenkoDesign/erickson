<?php
 
/**
 * Create new CPT - Press
 */
 
class CPT_Press extends CPT_Core {

    const POST_TYPE = 'press';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Press Release', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Press Releases', self::TEXTDOMAIN, '_s' ), // Plural
				self::POST_TYPE // Registered name/slug
			),
			array( 
				'public'              => true,
				'publicly_queryable'  => true,
				'show_ui'             => true,
				'query_var'           => true,
				'capability_type'     => 'post',
				'has_archive' 		  => 'press-releases',
				'hierarchical'        => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => true,
				'exclude_from_search' => false,
				'show_in_rest' 		  => true,
				// 'taxonomies' => array( 'category' ),
				'rewrite'             => array( 'with_front' => false, 'slug' => 'press-release' ),
				'supports' => array( 'title', 'editor', 'thumbnail' ),
				 )

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );

    
		
     }
     
     
    public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( 'press' ) ) ) {
            $query->set( 'posts_per_page', '10' );
        }
        
    }
 
}

new CPT_Press();


$press_categories = array(
    __( 'Press Category', '_s' ), // Singular
    __( 'Press Categories', '_s' ), // Plural
    'press_cat' // Registered name
);

register_via_taxonomy_core( $press_categories, 
	array(
		'show_in_rest' => true,
        'rewrite' => array( 'with_front' => false, 'slug' => 'press-releases' ),
	), 
	array( 'press' ) 
);