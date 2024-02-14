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
				'supports' => array( 'title', 'thumbnail', 'editor' )
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

    /**
	 * Registers admin columns to display. Hooked in via CPT_Core.
	 * @since  0.1.0
	 * @param  array  $columns Array of registered column names/labels
	 * @return array           Modified array
	 */
	public function columns( $columns ) {
		                
        $columns = array_insert_after( $columns, 
                                       'title', 
                                        [ 
                                           'active' => 'Active', 
                                           'shortcode' =>'Shortcode' 
                                        ]
                                    );     
                
        return $columns;
        
    }


	/**
	 * Handles admin column display. Hooked in via CPT_Core.
	 * @since  0.1.0
	 * @param  array  $column Array of registered column names
	 */
	public function columns_display( $column, $post_id ) {
		switch ( $column ) {
			case 'active':
            echo get_field( 'active', $post_id ) ? 'Active' : 'Not Active (Used for Convert Plus)';
            break;
            case 'shortcode':
            printf( '[erickson_modal_form id="%s"]', $post_id );
            break;
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

                // only load active forms
                $active  = get_field( 'active' );
                if( $active ) {
                    _s_get_template_part( 'template-parts/modal', 'form', $data );
                }
    
            endwhile;
        endif;
    
        wp_reset_postdata();
 
     }
 
}

new CPT_MODAL();



function erickson_modal_form( $atts ) {
    $a = shortcode_atts(
        array (
            'id'   => false,
        ), $atts );

    $id   = $a [ 'id' ];

    // bad id
    if ( ! is_numeric( $id ) ) {
        return '';
    }

    // find the post
    $post = get_post( $id );

    // bad post
    if ( ! $post ) {
        return '';
    }

    $logo = sprintf('<img src="%slogo.svg" alt="site logo" class="logo" />', trailingslashit( THEME_IMG ) ); 


    $content =  $id === get_the_ID() || $id === get_queried_object_id()
        ? '' // no recursive loops!
        : apply_filters( 'the_content', $post->post_content );

    if( ! empty( $content ) ) {
        
        $thumbnail = get_the_post_thumbnail( $id, 'medium' );

        if( $thumbnail ) {
            return sprintf( '<div class="convert-plus-modal-body">
            <div class="grid-x grid-margin-x align-middle">
            <div class="cell large-4 show-for-large">%s</div>
            <div class="cell small-12 large-8"><div class="modal-content">%s%s</div></div>
            </div>
            <button type="button" class="cp-inner-close" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">
            <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
            </button>
            </div>', $thumbnail, $logo, $content );
        }
    }
    return '';
}

add_shortcode( 'erickson_modal_form', 'erickson_modal_form' );