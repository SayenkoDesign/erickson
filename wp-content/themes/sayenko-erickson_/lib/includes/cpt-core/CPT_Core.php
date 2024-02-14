<?php
/*
Plugin Name: WDS CPT Core
Plugin URI: http://webdevstudios.com
Description: CPT registration starter class
Version: 1.0.2
Author: WebDevStudios.com
Author URI: http://webdevstudios.com
License: GPLv2
Domain: cpt-core
Path: languages
*/

if ( ! class_exists( 'CPT_Core' ) ) :

	/**
	 * Plugin class for generating Custom Post Types.
	 * @version 1.0.1
	 * @author  Justin Sternberg
	 *
	 * Text Domain: cpt-core
	 * Domain Path: /languages
	 */
	class CPT_Core {

		/**
		 * Singlur CPT label
		 * @var string
		 */
		protected $singular;

		/**
		 * Plural CPT label
		 * @var string
		 */
		protected $plural;

		/**
		 * Registered CPT name/slug
		 * @var string
		 */
		protected $post_type;

		/**
		 * Optional argument overrides passed in from the constructor.
		 * @var array
		 */
		protected $arg_overrides = array();

		/**
		 * All CPT registration arguments
		 * @var array
		 */
		protected $cpt_args = array();

		/**
		 * An array of each CPT_Core object registered with this class
		 * @var array
		 */
		protected static $custom_post_types = array();

		/**
		 * Whether text-domain has been registered
		 * @var boolean
		 */
		protected static $l10n_done = false;

		/**
		 * Constructor. Builds our CPT.
		 * @since 0.1.0
		 * @param mixed  $cpt           Array with Singular, Plural, and Registered (slug)
		 * @param array  $arg_overrides CPT registration override arguments
		 */
		public function __construct( array $cpt, $arg_overrides = array() ) {

			if ( ! is_array( $cpt ) ) {
				wp_die( __( 'It is required to pass a single, plural and slug string to CPT_Core', '_s' ) );
			}

			if ( ! isset( $cpt[0], $cpt[1], $cpt[2] ) ) {
				wp_die( __( 'It is required to pass a single, plural and slug string to CPT_Core', '_s' ) );
			}

			if ( ! is_string( $cpt[0] ) || ! is_string( $cpt[1] ) || ! is_string( $cpt[2] ) ) {
				wp_die( __( 'It is required to pass a single, plural and slug string to CPT_Core', '_s' ) );
			}

			$this->singular  = $cpt[0];
			$this->plural    = ! isset( $cpt[1] ) || ! is_string( $cpt[1] ) ? $cpt[0] . 's' : $cpt[1];
			$this->post_type = ! isset( $cpt[2] ) || ! is_string( $cpt[2] ) ? sanitize_title( $this->plural ) : $cpt[2];

			$this->arg_overrides = (array) $arg_overrides;

			// load text domain
			add_action( 'plugins_loaded', array( $this, 'l10n' ), 5 );
			add_action( 'init', array( $this, 'register_post_type' ) );
			add_filter( 'post_updated_messages', array( $this, 'messages' ) );
			add_filter( 'bulk_post_updated_messages', array( $this, 'bulk_messages' ), 10, 2 );
			add_filter( 'manage_edit-' . $this->post_type . '_columns', array( $this, 'columns' ) );
			add_filter( 'manage_edit-' . $this->post_type . '_sortable_columns', array( $this, 'sortable_columns' ) );
			// Different column registration for pages/posts
			$h = isset( $arg_overrides['hierarchical'] ) && $arg_overrides['hierarchical'] ? 'pages' : 'posts';
			add_action( "manage_{$h}_custom_column", array( $this, 'columns_display' ), 10, 2 );
			add_filter( 'enter_title_here', array( $this, 'title' ) );
		}

		/**
		 * Gets the requested CPT argument
		 *
		 * @param string $arg
		 *
		 * @since  0.2.1
		 * @return array|false  CPT argument
		 */
		public function get_arg( $arg ) {
			$args = $this->get_args();
			if ( isset( $args->{$arg} ) ) {
				return $args->{$arg};
			}
			if ( is_array( $args ) && isset( $args[ $arg ] ) ) {
				return $args[ $arg ];
			}

			return false;
		}

		/**
		 * Gets the passed in arguments combined with our defaults.
		 * @since  0.2.0
		 * @return array  CPT arguments array
		 */
		public function get_args() {

			if ( ! empty( $this->cpt_args ) ) {
				return $this->cpt_args;
			}

			// Generate CPT labels
			$labels = array(
				'name'                  => $this->plural,
				'singular_name'         => $this->singular,
				'add_new'               => sprintf( __( 'Add New %s', '_s' ), $this->singular ),
				'add_new_item'          => sprintf( __( 'Add New %s', '_s' ), $this->singular ),
				'edit_item'             => sprintf( __( 'Edit %s', '_s' ), $this->singular ),
				'new_item'              => sprintf( __( 'New %s', '_s' ), $this->singular ),
				'all_items'             => sprintf( __( 'All %s', '_s' ), $this->plural ),
				'view_item'             => sprintf( __( 'View %s', '_s' ), $this->singular ),
				'search_items'          => sprintf( __( 'Search %s', '_s' ), $this->plural ),
				'not_found'             => sprintf( __( 'No %s', '_s' ), $this->plural ),
				'not_found_in_trash'    => sprintf( __( 'No %s found in Trash', '_s' ), $this->plural ),
				'parent_item_colon'     => isset( $this->arg_overrides['hierarchical'] ) && $this->arg_overrides['hierarchical'] ? sprintf( __( 'Parent %s:', '_s' ), $this->singular ) : null,
				'menu_name'             => $this->plural,
				'insert_into_item'      => sprintf( __( 'Insert into %s', '_s' ), strtolower( $this->singular ) ),
				'uploaded_to_this_item' => sprintf( __( 'Uploaded to this %s', '_s' ), strtolower( $this->singular ) ),
				'items_list'            => sprintf( __( '%s list', '_s' ), $this->plural ),
				'items_list_navigation' => sprintf( __( '%s list navigation', '_s' ), $this->plural ),
				'filter_items_list'     => sprintf( __( 'Filter %s list', '_s' ), strtolower( $this->plural ) ),
			);

			// Set default CPT parameters
			$defaults = array(
				'labels'             => array(),
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'has_archive'        => true,
				'supports'           => array( 'title', 'editor', 'excerpt' ),
			);

			$this->cpt_args = wp_parse_args( $this->arg_overrides, $defaults );
			$this->cpt_args['labels'] = wp_parse_args( $this->cpt_args['labels'], $labels );

			return $this->cpt_args;
		}

		/**
		 * Actually registers our CPT with the merged arguments
		 * @since  0.1.0
		 */
		public function register_post_type() {
			// Register our CPT
			$args = register_post_type( $this->post_type, $this->get_args() );
			// If error, yell about it.
			if ( is_wp_error( $args ) ) {
				wp_die( $args->get_error_message() );
			}

			// Success. Set args to what WP returns
			$this->cpt_args = $args;

			// Add this post type to our custom_post_types array
			self::$custom_post_types[ $this->post_type ] = $this;
		}

		/**
		 * Modies CPT based messages to include our CPT labels
		 * @since  0.1.0
		 * @param  array  $messages Array of messages
		 * @return array            Modied messages array
		 */
		public function messages( $messages ) {
			global $post, $post_ID;

			$cpt_messages = array(
				0 => '', // Unused. Messages start at index 1.
				2 => __( 'Custom field updated.', '_s' ),
				3 => __( 'Custom field deleted.', '_s' ),
				4 => sprintf( __( '%1$s updated.', '_s' ), $this->singular ),
				/* translators: %s: date and time of the revision */
				5 => isset( $_GET['revision'] ) ? sprintf( __( '%1$s restored to revision from %2$s', '_s' ), $this->singular , wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
				7 => sprintf( __( '%1$s saved.', '_s' ), $this->singular ),
			);

			if ( $this->get_arg( 'public' ) ) {

				$cpt_messages[1] = sprintf( __( '%1$s updated. <a href="%2$s">View %1$s</a>', '_s' ), $this->singular, esc_url( get_permalink( $post_ID ) ) );
				$cpt_messages[6] = sprintf( __( '%1$s published. <a href="%2$s">View %1$s</a>', '_s' ), $this->singular, esc_url( get_permalink( $post_ID ) ) );
				$cpt_messages[8] = sprintf( __( '%1$s submitted. <a target="_blank" href="%2$s">Preview %1$s</a>', '_s' ), $this->singular, esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) );
				// translators: Publish box date format, see http://php.net/date
				$cpt_messages[9] = sprintf( __( '%1$s scheduled for: <strong>%2$s</strong>. <a target="_blank" href="%3$s">Preview %1$s</a>', '_s' ), $this->singular, date_i18n( __( 'M j, Y @ G:i', '_s' ), strtotime( $post->post_date ) ), esc_url( get_permalink( $post_ID ) ) );
				$cpt_messages[10] = sprintf( __( '%1$s draft updated. <a target="_blank" href="%2$s">Preview %1$s</a>', '_s' ), $this->singular, esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) );

			} else {

				$cpt_messages[1] = sprintf( __( '%1$s updated.', '_s' ), $this->singular );
				$cpt_messages[6] = sprintf( __( '%1$s published.', '_s' ), $this->singular );
				$cpt_messages[8] = sprintf( __( '%1$s submitted.', '_s' ), $this->singular );
							// translators: Publish box date format, see http://php.net/date
				$cpt_messages[9] = sprintf( __( '%1$s scheduled for: <strong>%2$s</strong>.', '_s' ), $this->singular, date_i18n( __( 'M j, Y @ G:i', '_s' ), strtotime( $post->post_date ) ) );
				$cpt_messages[10] = sprintf( __( '%1$s draft updated.', '_s' ), $this->singular );

			}

			$messages[ $this->post_type ] = $cpt_messages;
			return $messages;
		}

		/**
		 * Custom bulk actions messages for this post type
		 * @author	Neil Lowden
		 *
		 * @param  array  $bulk_messages  Array of messages
		 * @param  array  $bulk_counts    Array of counts under keys 'updated', 'locked', 'deleted', 'trashed' and 'untrashed'
		 * @return array                  Modified array of messages
		 */
		function bulk_messages( $bulk_messages, $bulk_counts ) {
			$bulk_messages[ $this->post_type ] = array(
				'updated'   => sprintf( _n( '%1$s %2$s updated.', '%1$s %3$s updated.', $bulk_counts['updated'], '_s' ), $bulk_counts['updated'], $this->singular, $this->plural ),
				'locked'    => sprintf( _n( '%1$s %2$s not updated, somebody is editing it.', '%1$s %3$s not updated, somebody is editing them.', $bulk_counts['locked'], '_s' ), $bulk_counts['locked'], $this->singular, $this->plural ),
				'deleted'   => sprintf( _n( '%1$s %2$s permanently deleted.', '%1$s %3$s permanently deleted.', $bulk_counts['deleted'], '_s' ), $bulk_counts['deleted'], $this->singular, $this->plural ),
				'trashed'   => sprintf( _n( '%1$s %2$s moved to the Trash.', '%1$s %3$s moved to the Trash.', $bulk_counts['trashed'], '_s' ), $bulk_counts['trashed'], $this->singular, $this->plural ),
				'untrashed' => sprintf( _n( '%1$s %2$s restored from the Trash.', '%1$s %3$s restored from the Trash.', $bulk_counts['untrashed'], '_s' ), $bulk_counts['untrashed'], $this->singular, $this->plural ),
			);
			return $bulk_messages;
		}

		/**
		 * Registers admin columns to display. To be overridden by an extended class.
		 * @since  0.1.0
		 * @param  array  $columns Array of registered column names/labels
		 * @return array           Modified array
		 */
		public function columns( $columns ) {
			// placeholder
			return $columns;
		}

		/**
		 * Registers which columns are sortable. To be overridden by an extended class.
		 *
		 * @since  0.1.0
		 *
		 * @param  array $sortable_columns Array of registered column keys => data-identifier
		 *
		 * @return array           Modified array
		 */
		public function sortable_columns( $sortable_columns ) {
			// placeholder
			return $sortable_columns;
		}

		/**
		 * Handles admin column display. To be overridden by an extended class.
		 *
		 * @since  0.1.0
		 *
		 * @param array $column  Array of registered column names
		 * @param int   $post_id The Post ID
		 */
		public function columns_display( $column, $post_id ) {
			// placeholder
		}

		/**
		 * Filter CPT title entry placeholder text
		 * @since  0.1.0
		 * @param  string $title Original placeholder text
		 * @return string        Modifed placeholder text
		 */
		public function title( $title ) {

			$screen = get_current_screen();
			if ( isset( $screen->post_type ) && $screen->post_type == $this->post_type ) {
				return sprintf( __( '%s Title', '_s' ), $this->singular );
			}

			return $title;
		}

		/**
		 * Provides access to protected class properties.
		 * @since  0.2.0
		 * @param  string $key Specific CPT parameter to return
		 * @return mixed       Specific CPT parameter or array of singular, plural and registered name
		 */
		public function post_type( $key = 'post_type' ) {

			return isset( $this->$key ) ? $this->$key : array(
				'singular'  => $this->singular,
				'plural'    => $this->plural,
				'post_type' => $this->post_type,
			);
		}

		/**
		 * Provides access to all CPT_Core taxonomy objects registered via this class.
		 * @since  0.1.0
		 * @param  string $post_type Specific CPT_Core object to return, or 'true' to specify only names.
		 * @return mixed             Specific CPT_Core object or array of all
		 */
		public static function post_types( $post_type = '' ) {
			if ( true === $post_type && ! empty( self::$custom_post_types ) ) {
				return array_keys( self::$custom_post_types );
			}
			return isset( self::$custom_post_types[ $post_type ] ) ? self::$custom_post_types[ $post_type ] : self::$custom_post_types;
		}

		/**
		 * Magic method that echos the CPT registered name when treated like a string
		 * @since  0.2.0
		 * @return string CPT registered name
		 */
		public function __toString() {
			return $this->post_type();
		}

		/**
		 * Load this library's text domain
		 * @since  0.2.1
		 */
		public function l10n() {
			// Only do this one time
			if ( self::$l10n_done ) {
				return;
			}

			$locale = apply_filters( 'plugin_locale', get_locale(), 'cpt-core' );
			$mofile = dirname( __FILE__ ) . '/languages/cpt-core-' . $locale . '.mo';
			load_textdomain( 'cpt-core', $mofile );
		}

	}

	if ( ! function_exists( 'register_via_cpt_core' ) ) {
		/**
		 * Helper function to register a CPT via the CPT_Core class. An extended class is preferred.
		 * @since 0.2.0
		 * @param mixed     $cpt           Singular CPT name, or array with Singular, Plural, and Registered
		 * @param array     $arg_overrides CPT registration override arguments
		 * @return CPT_Core                An instance of the class.
		 */
		function register_via_cpt_core( $cpt, $arg_overrides = array() ) {
			return new CPT_Core( $cpt, $arg_overrides );
		}
	}

endif; // end class_exists check
