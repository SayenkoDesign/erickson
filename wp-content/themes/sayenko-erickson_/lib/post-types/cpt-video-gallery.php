<?php
 
/**
 * Create new CPT - Video Gallery
 */
 
class CPT_Video_GALLERY extends CPT_Core {

    const POST_TYPE = 'video_gallery';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Video', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Video Gallery', self::TEXTDOMAIN, '_s' ), // Plural
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
				'rewrite'             => array( 'with_front' => false, 'slug' => 'video-gallery' ),
				'supports' => array( 'title', 'thumbnail', 'revisions' ),
				 )

        );
        
        add_action( 'pre_get_posts', array( $this,'pre_get_posts' ) );

        add_action( 'template_redirect', array( $this,'redirect_post' ) );
		
     }
     
     
    public function pre_get_posts( $query ){
    
        if ( $query->is_main_query() && ! is_admin() && ( is_post_type_archive( 'video_gallery' ) ) ) {
            $query->set( 'posts_per_page', '8' );
        }
        
    }
    

    function redirect_post() {
      $queried_post_type = get_query_var('post_type');
      if ( is_single() && 'video_gallery' ==  $queried_post_type ) {
        get_post_type_archive_link( 'video_gallery', 301 );
        exit;
      }
    }
 
}

new CPT_VIDEO_GALLERY();