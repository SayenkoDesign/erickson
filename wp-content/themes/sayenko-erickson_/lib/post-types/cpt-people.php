<?php
 
/**
 * Create new CPT - People
 */
 
class CPT_People extends CPT_Core {

    const POST_TYPE = 'people';
	const TEXTDOMAIN = '_s';
	
	/**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

 		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Person', self::TEXTDOMAIN, '_s' ), // Singular
				__( 'People', self::TEXTDOMAIN, '_s' ), // Plural
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
				'exclude_from_search' => false,
				//'rewrite'             => array( 'slug' => 'teams' ),
				'supports' => array( 'title', 'editor', 'thumbnail' ),
                'menu_icon' => 'dashicons-businessman'
			)

        );
        
        // Remove media upload button
        add_action( 'admin_head' , [$this, 'remove_editor_upload' ] );
        
        // Remove Gravity forms button
        add_filter( 'gform_display_add_form_button', [$this, 'remove_gravity_forms_button' ] );
        
        // Remove Tinymce buttons
        add_filter( 'mce_buttons', [ $this, 'remove_tinymce_buttons' ] );
        add_filter( 'mce_buttons_2', [ $this, 'remove_tinymce_buttons' ] );
        
        // Choose formats select
        add_filter('tiny_mce_before_init', [ $this, 'tiny_mce_remove_unused_formats' ] );
		        
     }
     
     
    
    public function remove_editor_upload(){
        global $post;
        if(isset($post) && $post->post_type == self::POST_TYPE ){
            remove_action( 'media_buttons', 'media_buttons' );
        }
    }
    
    
    public function remove_gravity_forms_button( $is_post_edit_page ) {
        global $post;
        return isset($post) && $post->post_type == self::POST_TYPE ? false : $is_post_edit_page;
    }
     
     public function remove_tinymce_buttons( $buttons ) {
        
        global $post;
        
        if( ! isset($post) ) {
            return $buttons;   
        }
        
        if( isset($post) && $post->post_type != self::POST_TYPE ) {
            return $buttons;   
        }
        
        $remove = array(
            'bold',
            'italic',
            'strikethrough',
            //'bullist',
            'numlist',
            'blockquote',
            'hr', // horizontal line
            'alignleft',
            'aligncenter',
            'alignright',
            'link',
            'unlink',
            'wp_more', // read more link
            'spellchecker',
            'dfw', // distraction free writing mode
            'wp_adv', // kitchen sink toggle (if removed, kitchen sink will always display)
            
            
            //'formatselect', // format dropdown menu for <p>, headings, etc
            'underline',
            'alignjustify',
            'forecolor', // text color
            'pastetext', // paste as text
            'removeformat', // clear formatting
            'charmap', // special characters
            'outdent',
            'indent',
            'undo',
            'redo',
            'wp_help', // keyboard shortcuts
        );
                    
        return array_diff( $buttons, $remove );
    }

     
    public function tiny_mce_remove_unused_formats( $init ) {
        global $post;
        
        if( ! isset($post) ) {
            return $init;   
        }
        
        if( isset($post) && $post->post_type != self::POST_TYPE ) {
            return $init;   
        }
        
        $init['block_formats'] = 'Paragraph=p;Heading 4=h4;';
        return $init;
    }
 
}

new CPT_People();

$departments = array(
    __( 'Department', '_s' ), // Singular
    __( 'Departments', '_s' ), // Plural
    'department' // Registered name
);

register_via_taxonomy_core( $departments, 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'people' ) 
);