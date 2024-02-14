<?php

function _s_mega_menu_default_image() {
    $mega_menu = get_field( 'mega_menu', 'option' );
    if( ! empty( $mega_menu['image'] ) ) {
        $image = _s_get_acf_image( $mega_menu['image'], 'large', true );
        return sprintf( '<div class="image object-fit-parent"><img src="%s" /></div>', $image );
    }  
    
    return false; 
}

function _s_emergency_message() {
    $emergency = get_field( 'emergency', 'option' );
    $display = false;
    $link = false;
    if( ! empty( $emergency['display'] ) ) {
        $display = $emergency['display'] ? true : false;
    }
    if( ! empty( $emergency['link'] ) ) {
        $link = $emergency['link'];
        $link_url = $link['url'];
        $link_title = $link['title'];
        $link_target = $link['target'] ? $link['target'] : '_self';        
        if( $display ) {
            return sprintf( '<div class="emergency"><a href="%s" target="%s">%s</a></div>', $link_url, $link_target, $link_title );
        }
    } 
    
    return false;  
}

// Add the mega menu image and emergency menu items
function _s_add_mega_menu_image( $items ) {
  
  $menu_item_parent = false;
  
  foreach ( $items as $item ) {
      //var_dump( $item );
      $mega_menu = get_post_meta( $item->ID, 'mega_menu', true );
      if( $mega_menu ) {
          $menu_item_parent = $item->ID;
      }
      //get_post_meta( $item->ID, '_menu_item_object_id', true );
  }
  
  if( !wp_is_mobile() && $menu_item_parent && _s_mega_menu_default_image() ) {
  
    $link = array (
        'target'           => '',
        'xfn'              => '',
        'current'          => '',
        'title'            => '##IMAGE##',
        'menu_item_parent' => $menu_item_parent,
        'ID'               => '0',
        'db_id'            => '',
        'url'              => '',
        'classes'          => ['menu-item',  'menu-item-image']
    );
    // array_unshift( $items, (object) $link );
  }
  
  if( $menu_item_parent && _s_emergency_message() ) {
      $link = array (
        'target'           => '',
        'xfn'              => '',
        'current'          => '',
        'title'            => '##EMERGENCY##',
        'menu_item_parent' => $menu_item_parent,
        'ID'               => '0',
        'db_id'            => '',
        'url'              => '',
        'classes'          => ['menu-item',  'menu-item-emergency']
    );
    $items[] = (object) $link;
  }
  
  return $items;    
}
add_filter( 'wp_nav_menu_objects', '_s_add_mega_menu_image' );


// Add the placeholder image from the theme settings
function _s_mega_menu_placeholder_image($item_output, $item) {
    if ('##IMAGE##' == $item->title ) {
        // Add the default image
        return _s_mega_menu_default_image();
    }
    
    if ('##EMERGENCY##' == $item->title ) {
        // Add the details
       return  _s_emergency_message();
    }
    
    // Remove links from menu-item-object-service_cat
    $mega_menu = get_post_meta( $item->menu_item_parent, 'mega_menu', true );
    if( $mega_menu ) {
        $icon = '';
        $term = get_term( $item->object_id, 'service_cat' );
       
        if( ! is_wp_error( $term ) ) {
            $icon = get_field( 'image', $term );
            $icon = _s_get_acf_image( $icon );
        }
        return sprintf( '<a class="disabled">%s<h5>%s</h5></a>', $icon, $item->title );
    }    

    return $item_output;
}
add_filter('walker_nav_menu_start_el','_s_mega_menu_placeholder_image',10,2);

global $images;



function _s_primary_menu_menu_atts( $atts, $item, $args ) {
              
    if( 'primary' != $args->theme_location ) {
        return $atts;
    }
    
    if( wp_is_mobile() ) {
        return $atts;
    }
    
    global $images;
    
    $classes = $item->classes;
    if( ! empty( $classes ) ) {
        foreach( $classes as $class ) {
                    
            if( strpos( $class, 'menu-item-object-service' ) !== false ) {
                $post_id = $item->object_id;
                $image = get_field( 'mega_menu_image', $post_id );
                if( ! empty( $image ) ) {
                    $image = _s_get_acf_image( $image, 'medium', true );
                    $images .= $image;
                    $atts['data-image'] = esc_html( $image );
                }
            }
                
        }
    }
      
    return $atts;
}
add_filter( 'nav_menu_link_attributes', '_s_primary_menu_menu_atts', 99, 3 );

/*
add_action('wp_footer', function() {
    global $images;
    if( ! empty( $images ) ) {
        printf( '<div class="hide">%s</div>', $images );
    }
}); 
*/

function S_mega_menu_nav_class( $classes, $item, $args ) {
 
    $mega_menu = get_post_meta( $item->ID, 'mega_menu', true );
    if( $mega_menu ) {
        $classes[] = 'mega-menu-item';
        
        if( _s_emergency_message() ) {
            $classes[] = 'has-menu-item-emergency';
        }
    }
 
    return $classes;
}
add_filter( 'nav_menu_css_class' , 'S_mega_menu_nav_class' , 10, 4 );
