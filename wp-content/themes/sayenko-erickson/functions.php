<?php
/**
 * _s functions and definitions.
 *
 * @link    https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package _s
 */

if ( ! function_exists( '_s_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function _s_setup() {

		/****************************************
		 * Define Child Theme Definitions
		 *****************************************/
		define( 'THEME_DIR', get_template_directory() );
		define( 'THEME_URL', get_template_directory_uri() );
		define( 'THEME_PUBLIC', THEME_URL . '/public' );
		define( 'THEME_LANG', THEME_URL . '/language' );
		define( 'THEME_LIB', THEME_URL . '/lib' );
		define( 'THEME_FAVICONS', THEME_URL . '/favicon' );
		define( 'THEME_CSS', THEME_PUBLIC . '/css' );
		define( 'THEME_IMG', THEME_PUBLIC . '/images' );
		define( 'THEME_JS', THEME_PUBLIC . '/js' );

		define( 'THEME_NAME', sanitize_title( wp_get_theme() ) );
		define( 'THEME_VERSION', '1.0' );

		/**
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on _s, use a find and replace
		 * to change '_s' to the name of your theme in all the template files.
		 * You will also need to update the Gulpfile with the new text domain
		 * and matching destination POT file.
		 */
		load_theme_textdomain( '_s', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/**
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );
                
        add_theme_support( 'responsive-embeds' );

		/**
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
        
        /****************************************
         * Image Sizes
         *****************************************/
        
        add_image_size( 'hero', 2000, 9999 ); // 2000 x 510
        

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary'       => esc_html__( 'Primary Menu', '_s' ),
			'secondary'     => esc_html__( 'Secondary Menu', '_s' ),
            'services'      => esc_html__( 'Services Menu', '_s' ),
			'copyright'     => esc_html__( 'Copyright Menu', '_s' )
		) );

		/**
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );


		/****************************************
		 * Theme Library
		 *****************************************/

		include( THEME_DIR . '/lib/init.php' );

	}
endif; // _s_setup
add_action( 'after_setup_theme', '_s_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function _s_content_width() {
	$GLOBALS['content_width'] = apply_filters( '_s_content_width', 1260 );
}

add_action( 'after_setup_theme', '_s_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function _s_widgets_init() {

	// Define sidebars.
	$sidebars = array(
		'footer'      => esc_html__( 'Footer', '_s' )
   	);

	// Loop through each sidebar and register.
	foreach ( $sidebars as $sidebar_id => $sidebar_name ) {
		register_sidebar( array(
			'name'          => $sidebar_name,
			'id'            => $sidebar_id,
			'description'   => sprintf( esc_html__( 'Widget area for %s', '_s' ), $sidebar_name ),
			'before_widget' => '<div class="cell medium-large-auto xxlarge-shrink"><aside class="widget %2$s">',
			'after_widget'  => '</aside></div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		) );
	}

}

add_action( 'widgets_init', '_s_widgets_init' );


// Login Styles
function _s_login_stylesheet() {
	wp_enqueue_style( 'custom-login', trailingslashit( THEME_CSS ) . '/login.css' );
}

add_action( 'login_enqueue_scripts', '_s_login_stylesheet' );

// changing the login logo
function _s_login_logo() {
	$logo = sprintf( '%slogo.svg', trailingslashit( THEME_IMG ) );
	printf( '<style type="text/css">h1 a { background-image:url(%s)!important; }</style>', $logo );
}

add_action( 'login_head', '_s_login_logo' );



// ACF upload prefilter
function gist_acf_upload_dir_prefilter( $errors ) {
    
    // Only allow editors and admins, change capability as you see fit
    if( !current_user_can('edit_pages') ) {
        $errors[] = 'Only Editors and Administrators may upload attachments';
    }
    
    // This filter changes directory just for item being uploaded
    add_filter('upload_dir', 'gist_acf_upload_dir');
    
}

// ACF hook, set to field key of your file upload field
add_filter('acf/upload_prefilter/key=field_5ceae3d5065cd', 'gist_acf_upload_dir_prefilter');
add_filter('acf/upload_prefilter/key=field_611aecbcc244f', 'gist_acf_upload_dir_prefilter');


// Custom upload directory
function gist_acf_upload_dir($param) {
    
    // Set to whatever directory you want the ACF file field to upload to
    $custom_dir = '/uploads/edd';
    $param['path'] = WP_CONTENT_DIR . $custom_dir;
    $param['url'] = WP_CONTENT_URL . $custom_dir;

    return $param;
    
}



// add_filter( 'acf/prepare_field/key=field_5ceae3d5065cd', 'secure_files_field_display' );
// add_filter( 'acf/prepare_field/key=field_611aecbcc244f', 'secure_files_field_display' );

function secure_files_field_display( $field ) {

  // update paths accordingly before displaying link to file
  add_filter( 'upload_dir', 'secure_upload_directory' );

  return $field;

}

if (isset($_GET['investor_pdf'])) {

	if( !is_user_logged_in() ) {
		wp_redirect(home_url(), 301 );
		exit;
	}

    $id = absint( $_GET['investor_pdf'] );

	$url = get_attached_file( $id );

    // Force download
    header('Content-type: application/octet-stream');
    header("Content-Disposition: attachment; filename=".basename($url));
    ob_end_clean();
    readfile($url);
    exit;
}