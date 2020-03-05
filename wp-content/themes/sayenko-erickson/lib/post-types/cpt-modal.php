<?php
 
/**
 * Create new CPT - Modal
 */
 
class CPT_MODAL extends CPT_Core {

    const POST_TYPE = 'modal';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Modal', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'Modals', self::TEXTDOMAIN, '_s' ), // Plural
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
				'supports' => array( 'title', 'editor' )
			)

        );
        
        //add_action( 'admin_head' , [$this, 'remove_editor_upload' ] );
        
        //add_filter( 'gform_display_add_form_button', [$this, 'remove_gravity_forms_button' ] );
        
        add_action('wp_footer', [$this, 'add_modals_to_footer'] );
		        
     }
     
    
    public function remove_gravity_forms_button( $is_post_edit_page ) {
        global $post;
        return isset($post) && $post->post_type == 'modal' ? false : $is_post_edit_page;
    }
     
    public function remove_editor_upload(){
        global $post;
        if(isset($post) && $post->post_type == 'modal'){
            remove_action( 'media_buttons', 'media_buttons' );
        }
    }
     
     
     function add_modals_to_footer() {
        
        $args = array(
            'post_type'      => 'modal',
            'posts_per_page' => 100,
            'post_status'    => 'publish'
        );
    
        $loop = new WP_Query( $args );
    
        if ( $loop->have_posts() ) : 
            while ( $loop->have_posts() ) : $loop->the_post(); 
                $data = [ 'post_id' => get_the_ID() ];
                _s_get_template_part( 'template-parts/modal', 'form', $data );
    
            endwhile;
        endif;
    
        wp_reset_postdata();
 
     }
 
}

new CPT_MODAL();