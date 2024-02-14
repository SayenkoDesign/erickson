<?php
 
/**
 * Create new CPT - History
 */
 
class CPT_History extends CPT_Core {

    const POST_TYPE = 'history';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'History', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'History', self::TEXTDOMAIN, '_s' ), // Plural
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
				'show_in_nav_menus'   => false,
				'exclude_from_search' => false,
				'rewrite'             => false,
				'supports' => array( 'title', 'thumbnail' ),
                'menu_icon' => 'dashicons-calendar-alt'
			)

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );
                		        
     }
     
     
     
     public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( self::POST_TYPE ) ) ) {
            $query->set( 'posts_per_page', '2' );
        }
        
    }
    
    
     /**
	 * Registers admin columns to display. Hooked in via CPT_Core.
	 * @since  0.1.0
	 * @param  array  $columns Array of registered column names/labels
	 * @return array           Modified array
	 */
	public function columns( $columns ) {
        
        $columns['date'] = 'Posted Date';
        
        unset( $columns['post_type'] );
        
		$new_column = array(
			'year' => 'Year',
		);
		return array_slice( $columns, 0, 2, true ) + $new_column + array_slice( $columns, 1, null, true );
	}

	/**
	 * Handles admin column display. Hooked in via CPT_Core.
	 * @since  0.1.0
	 * @param  array  $column Array of registered column names
	 */
	public function columns_display( $column, $post_id ) {
		switch ( $column ) {
			case 'year':
                echo get_field( 'year' );
				break;
		}
	}
        
}

new CPT_History();


$history_type = array(
    __( 'History Category', '_s' ), // Singular
    __( 'History Categories', '_s' ), // Plural
    'history_cat' // Registered name
);

register_via_taxonomy_core( $history_type, 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'history' ) 
);