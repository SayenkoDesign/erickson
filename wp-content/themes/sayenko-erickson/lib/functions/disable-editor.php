<?php

/**
 * Exclude Templates and Page IDs from Gutenberg editor
 *
 */
function _s_disable_editor( $id = false ) {

	$excluded_templates = array(
        'page-templates/contact.php',
        'page-templates/history.php',
        'page-templates/investor-relations.php',
        'page-templates/photo-gallery.php',
        'page-templates/team.php',
        'page-templates/thank-you.php',
        
	);

	$excluded_ids = array(
		//get_option( 'page_on_front' )
	);

	if( empty( $id ) )
		return false;

	$id = intval( $id );
	$template = get_page_template_slug( $id );

	return in_array( $id, $excluded_ids ) || in_array( $template, $excluded_templates );
}



/**
 * Disable Gutenberg by template
 *
 */
function _s_disable_gutenberg( $can_edit, $post_type ) {

	if( ! ( is_admin() && !empty( $_GET['post'] ) ) )
		return $can_edit;

	if( _s_disable_editor( $_GET['post'] ) )
		$can_edit = false;
        
    // Choose posts types to include
    $include_post_types = [ 'post', 'page' ];
    
    if ( ! in_array( $post_type, $include_post_types ) ) 
        $can_edit = false;
    
	return $can_edit;

}
add_filter( 'gutenberg_can_edit_post_type', '_s_disable_gutenberg', 10, 2 );
add_filter( 'use_block_editor_for_post_type', '_s_disable_gutenberg', 10, 2 );

/**
 * Disable Classic Editor by template
 *
 */
function _s_disable_classic_editor() {

	$screen = get_current_screen();
	if( 'page' !== $screen->id || ! isset( $_GET['post']) )
		return;

	if( _s_disable_editor( $_GET['post'] ) ) {
		remove_post_type_support( 'page', 'editor' );
	}

}
add_action( 'admin_head', '_s_disable_classic_editor' );


/**
 * Modifies the TinyMCE settings array
 */
function _s_tiny_mce_before_init( $init ) {

	// Restrict the Formats available in TinyMCE. Currently excluded: h1,h5,h6,address,pre
	$init['block_formats'] = 'Paragraph=p;Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4;';
	return $init;

}
add_filter( 'tiny_mce_before_init', '_s_tiny_mce_before_init' );


/**
 * Removes buttons from the first row of the tiny mce editor
 *
 * @link     http://thestizmedia.com/remove-buttons-items-wordpress-tinymce-editor/
 *
 * @param    array    $buttons    The default array of buttons
 * @return   array                The updated array of buttons that exludes some items
 */
add_filter( 'mce_buttons', '_s_remove_tiny_mce_buttons_from_editor');
function _s_remove_tiny_mce_buttons_from_editor( $buttons ) {
    $remove_buttons = array(
        //'bold',
        //'italic',
        //'strikethrough',
        //'bullist',
        //'numlist',
        'blockquote',
        'hr', // horizontal line
        'alignleft',
        'aligncenter',
        'alignright',
        //'link',
        //'unlink',
        'wp_more', // read more link
        'spellchecker',
        'dfw', // distraction free writing mode
        //'wp_adv', // kitchen sink toggle (if removed, kitchen sink will always display)
    );
    foreach ( $buttons as $button_key => $button_value ) {
        if ( in_array( $button_value, $remove_buttons ) ) {
            unset( $buttons[ $button_key ] );
        }
    }
    return $buttons;
}


/**
 * Removes buttons from the second row (kitchen sink) of the tiny mce editor
 *
 * @link     http://thestizmedia.com/remove-buttons-items-wordpress-tinymce-editor/
 *
 * @param    array    $buttons    The default array of buttons in the kitchen sink
 * @return   array                The updated array of buttons that exludes some items
 */
add_filter( 'mce_buttons_2', '_s_remove_tiny_mce_buttons_from_kitchen_sink');
function _s_remove_tiny_mce_buttons_from_kitchen_sink( $buttons ) {
    $remove_buttons = array(
        'formatselect', // format dropdown menu for <p>, headings, etc
        'underline',
        'alignjustify',
        'forecolor', // text color
        //'pastetext', // paste as text
        'removeformat', // clear formatting
        'charmap', // special characters
        //'outdent',
        //'indent',
        'undo',
        'redo',
        'wp_help', // keyboard shortcuts
    );
    foreach ( $buttons as $button_key => $button_value ) {
        if ( in_array( $button_value, $remove_buttons ) ) {
            unset( $buttons[ $button_key ] );
        }
    }
    return $buttons;
}