<?php

/**
 * Get paths for assets
 */
class JsonManifest {
	private $manifest;

	public function __construct( $manifest_path ) {
		if ( file_exists( $manifest_path ) ) {
			$this->manifest = json_decode( file_get_contents( $manifest_path ), true );
		} else {
			$this->manifest = [];
		}
	}

	public function get() {
		return $this->manifest;
	}

	public function getPath( $key = '', $default = null ) {
		$collection = $this->manifest;
		if ( is_null( $key ) ) {
			return $collection;
		}
		if ( isset( $collection[ $key ] ) ) {
			return $collection[ $key ];
		}
		foreach ( explode( '.', $key ) as $segment ) {
			if ( ! isset( $collection[ $segment ] ) ) {
				return $default;
			} else {
				$collection = $collection[ $segment ];
			}
		}

		return $collection;
	}
}

function _s_asset_path( $filename ) {
    $filename = ltrim( $filename, '/' );
	$dist_path = get_template_directory_uri() . '/public/';
	static $manifest;

	if ( empty( $manifest ) ) {
		$manifest_path = get_template_directory() . '/public/mix-manifest.json';
		$manifest      = new JsonManifest( $manifest_path );
	}

	if ( array_key_exists( $filename, $manifest->get() ) ) {
		return $dist_path . $manifest->get()[ $filename ];
	} else {
		return $dist_path . $filename;
	}
}

/****************************************
 * Enqueue theme stylesheet
 *****************************************/

function _s_enqueue_stylesheet() {

	$version = defined( 'THEME_VERSION' ) && THEME_VERSION ? THEME_VERSION : '1.0';
	$handle  = defined( 'THEME_NAME' ) && THEME_NAME ? sanitize_title_with_dashes( THEME_NAME ) : 'theme';

	//$stylesheet = SCRIPT_DEBUG === true ? 'style.css' : 'style.min.css';
	$stylesheet = 'style.css';

	wp_enqueue_style( $handle, _s_asset_path( '/css/style.css' ), false, $version );
}

add_action( 'wp_enqueue_scripts', '_s_enqueue_stylesheet', 15 );


/****************************************
 * Image Sizes
 *****************************************/

add_image_size( 'hero', 1440, 9999 ); // 1440 x 510
