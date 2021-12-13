<?php
 
/**
 * Create new CPT - News
 */
 
class CPT_NEWS extends CPT_Core {

    const POST_TYPE = 'news';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'News', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'News', self::TEXTDOMAIN, '_s' ), // Plural
				self::POST_TYPE // Registered name/slug
			),
			array( 
				'public'              => true,
				'publicly_queryable'  => true,
				'show_ui'             => true,
				'query_var'           => true,
				'capability_type'     => 'post',
				'has_archive'         => 'erickson-in-the-news',
				'hierarchical'        => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => true,
				'exclude_from_search' => false,
				'show_in_rest' 		  => true,
				// 'taxonomies' => array( 'category' ),
				'rewrite'             => array( 'with_front' => false, 'slug' => 'news' ),
				'supports' => array( 'title', 'editor', 'thumbnail' ),
				 )

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );

    
		
     }
     
     
    public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( 'news' ) ) ) {
            $query->set( 'posts_per_page', '500' );
        }
        
    }
 
}

new CPT_NEWS();

$news_categories = array(
    __( 'News Category', '_s' ), // Singular
    __( 'News Categories', '_s' ), // Plural
    'news_cat' // Registered name
);

register_via_taxonomy_core( $news_categories, 
	array(
		'show_in_rest' => true,
        'rewrite' => array( 'with_front' => false, 'slug' => 'erickson-in-the-news' ),
	), 
	array( 'news' ) 
);