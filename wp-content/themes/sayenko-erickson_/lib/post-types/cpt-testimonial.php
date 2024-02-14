<?php
 
/**
 * Create new CPT - Testimonial
 */
 
class CPT_Testimonial extends CPT_Core {

    const POST_TYPE = 'testimonial';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Testimonial', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Testimonials', self::TEXTDOMAIN, '_s' ), // Plural
				self::POST_TYPE // Registered name/slug
			),
			array( 
				'public'              => false,
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
				'supports' => array( 'title', 'thumbnail', 'revisions' ),
                'template'            => array( array( 'core/quote' ) ),
			    'template_lock'      => 'all',
			)

        );
        
        
        // add_filter( 'wp_insert_post_data', array( $this, 'set_testimonial_title' ), 99, 2 );
		        
     }
     
     
     /**
	 * Set testimonial title
	 *
	 */
	public function set_testimonial_title( $data, $postarr ) {
		if( 'testimonial' == $data['post_type'] ) {
			$title = get_post_meta( $postarr['ID'], 'name', true );
			if( empty( $title ) ) {
				$title = 'Testimonial ' . $postarr['ID'];
            }
			$data['post_title'] = $title;
		}
		return $data;
	}
 
}

new CPT_Testimonial();