<?php
 
/**
 * Create new CPT - Fleet
 */
 
class CPT_FLEET extends CPT_Core {

    const POST_TYPE = 'fleet';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Fleet', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Fleet', self::TEXTDOMAIN, '_s' ), // Plural
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
				'rewrite'             => array( 'slug' => 'fleet' ),
				'supports' => array( 'title', 'thumbnail', 'revisions' ),
				 )

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );
        
        // add_filter('acf/load_value/key=field_5e20ed5017a45',  [ $this, 'afc_load_my_repeater_value'], 10, 3); // preload descrption repeater
		
     }
     
     public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( 'fleet' ) ) ) {
            $query->set( 'posts_per_page', '4' );
        }
        
    }
     
    public function afc_load_my_repeater_value( $value, $post_id, $field ) {
 
        //Optional: Check for post_status otherwise published values will be changed.
		if ( get_post_status( $post_id ) === 'auto-draft' ) {
            
             //Optional: Check for post_type.
			if( get_post_type( $post_id ) == 'fleet' ){
				
                $value	= array();
                
                


                // Add field key for the field you would to put a default value (text field in this case)
				$value[] = array(
					'field_5e20f95f17a46' => 'Max internal cargo*',
                    'field_5e20f9e017a48' => ''
				);
				$value[] = array(
					'field_5e20f95f17a46' => 'Max ext. load*',
                    'field_5e20f9e017a48' => ''
				);
				$value[] = array(
					'field_5e20f95f17a46' => 'Max speed',
                    'field_5e20f9e017a48' => ''
				);
				$value[] = array(
					'field_5e20f95f17a46' => 'Max eange',
                    'field_5e20f9e017a48' => ''
				);
                $value[] = array(
					'field_5e20f95f17a46' => 'Capacity',
                    'field_5e20f9e017a48' => ''
				);
                $value[] = array(
					'field_5e20f95f17a46' => 'Powerplant',
                    'field_5e20f9e017a48' => ''
				);
			}			
		}
		return $value;
	}
 
}

new CPT_FLEET();
