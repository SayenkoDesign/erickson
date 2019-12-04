<?php
// If ACF isn't activated, then bail.
if ( ! class_exists( 'acf' ) ) {
	return false;
}

function _s_get_acf_options() {
    
    $all_options = wp_load_alloptions();
    $acf_options  = array();
     
    foreach ( $all_options as $name => $value ) {
        if ( substr( $name, 0, 8 ) === "options_" ) {
            $name = str_replace( 'options_', '', $name );
            $acf_options[ $name ] = $value;
        }
    }
        
    return $acf_options;
   
}


function _s_get_acf_option( $name = '' ) {
    
    $acf_options = _s_get_acf_options();
    
    if( isset( $acf_options[$name] ) && !empty( $acf_options[$name] ) ) {
        return $acf_options[$name];
    }
    
    return false;
}


function _s_get_acf_image( $attachment = false, $size = 'large', $background = false, $attr = array() ) {

	if( empty( $attachment ) ) {
        return false;
    }
    
    if( is_array( $attachment ) ) {
        $attachment = $attachment['ID'];
    } 
    
	if( wp_is_mobile() ) {
 		$size = 'large';
	}

	if( $background ) {
		$background = wp_get_attachment_image_src( $attachment, $size );
		return $background[0];
	}

	return wp_get_attachment_image( $attachment, $size, false, $attr );

}


function _s_get_acf_image_url( $attachment_id = false, $size = 'large' ) {

	return _s_get_acf_image( $attachment_id, $size = 'large', true );

}


/**
 * Echo or return the target for use in an anchor tag.
 *
 * @param $link
 *
 * @return string
 */
function _s_acf_link_target( $link, $echo = true ) {
	$type = $link['type'];

	switch ( $type ) {
		case 'anchor':
			$target = sprintf( '#%s', esc_attr( $link['target'] ) );
			break;
		default:
			$target = esc_url( $link['target'] );
			break;
	}

	if ( $echo ) {
		echo $target;
	}

	return $target;
}

/**
 * Echo or return an ACF button.
 *
 * @param $button
 *
 * @return string|bool
 */
function _s_acf_button( $args = [] ) {
    
    if( empty( $args ) ) {
        return false;
    }
    
    $defaults = array(
        'type' => 'default',
        'link' => '',
        'modal' => '',
        'classes' => '',
        'echo' => TRUE
    );
    
    /**
     * Parse incoming $args into an array and merge it with $defaults
     */ 
    $args = wp_parse_args( $args, $defaults );
    
    extract( $args );
    
    $type    = strtolower( $type );
	$title   = $link['title'] ?? '';
    $url     = $link['url'] ?? '';
    $target  = $link['target'] ? sprintf(' %s', $link['target'] ) : '';
    
    // No link title, bail here!
	if ( empty( $title ) ) {
		return false;
	}
    
    // Type
    switch ( $type ) {
		case 'modal':
			$url = sprintf( ' data-open="%s"', $modal );
			break;
		default:
			$url = sprintf( ' href="%s"', esc_url( $url ) );
			break;
	}
    
    // Classes
    if( ! empty( $classes ) ) {
        if( is_array( $classes ) ) {
            $classes = implode( ' ', $classes );
        }
        
        $classes = sprintf( ' class="%s"', esc_attr( $classes ) );
    }

	$output = sprintf(
		'<a%s%s%s>%s</a>',
		$url,
		$classes,
        esc_attr( $target ),
		esc_html( $title )
	);

	if ( $echo ) {
		echo $output;
	}

	return $output;
}


function _s_acf_section_classes( $settings, $echo = true ) {
	$classes = [];
	// Background Color
	switch ( $settings['background_color'] ) {
		case 'blue' :
			$classes[] = 'blue';
			break;
		default:
			break;
	}

	if ( $echo ) {
		echo esc_attr( implode( ' ', $classes ) );
	}

	return $classes;
}


function _s_acf_section_id( $id = false, $echo = true ) {
	global $slug;
    
    $section_id = ! empty( $id ) ? $id : $slug; 

	if ( $echo ) {
		echo esc_attr( $section_id );
	}

	return $section_id;
}




function _s_get_acf_link( $link, $args = [] ) {
    if( ! is_array( $link ) ) {
        $link = [ 'url' => $link ];
    }
    
    $link = wp_parse_args( $link, $args );
    
    if( empty( $link['title'] ) ) {
        return false;
    }
    
    return sprintf( '<a href="%s">%s</a>', $link['url'], $link['title'] );
}


function _s_get_acf_oembed( $iframe ) {


	// use preg_match to find iframe src
	preg_match('/src="(.+?)"/', $iframe, $matches);
	$src = $matches[1];


	// add extra params to iframe src
	$params = array(
		'controls'    => 1,
		'hd'        => 1,
		'autohide'    => 1,
		'rel' => 0
	);

	$new_src = add_query_arg($params, $src);

	$iframe = str_replace($src, $new_src, $iframe);


	// add extra attributes to iframe html
	$attributes = 'frameborder="0"';

	$iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);

	$iframe = sprintf( '<div class="embed-container">%s</div>', $iframe );


	// echo $iframe
	return $iframe;
}
