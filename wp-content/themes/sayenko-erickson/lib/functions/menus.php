<?php
// Create jump links with "Link Relationship" text input as cheat
function child_enable_menu_description( $item_output, $item ) {
		
    $contains = strpos( $item->xfn, 'section' ) !== false;
            
	if ( $contains ) {
		$new_page_anchor =  sprintf( '%s#%s', trailingslashit( get_permalink( $item->object_id ) ), $item->xfn );
		return str_replace( get_permalink( $item->object_id ), $new_page_anchor, $item_output );
	}
	return $item_output;
}

// add_filter( 'walker_nav_menu_start_el', 'child_enable_menu_description', 10, 2 );

// Add data attribute to menu item
function _s_contact_menu_atts( $atts, $item, $args ) {
      if( ! empty( $item->classes ) ) {
          $classes = $item->classes;      
          if ( in_array( 'lets-talk', (array) $classes ) ) {
            $atts['data-open'] = 'contact';
          }
      }
	  return $atts;
}

add_filter( 'nav_menu_link_attributes', '_s_contact_menu_atts', 10, 3 );

                
add_filter('nav_menu_item_args', function ($args, $item, $depth) {
    if( ! empty( $item->classes ) ) {
        $classes = $item->classes;
        if ( in_array('button', (array) $classes ) ) {
            $args->link_before = '<span>';
            $args->link_after  = '</span>';
        }
    }
    return $args;
}, 10, 3);


function new_submenu_class( $menu, $args ) {  
    if ( ! empty( $args->theme_location ) && $args->theme_location == 'primary' ) {
        $menu = preg_replace('/ class="sub-menu"/','/ class="sub-menu is-dropdown-submenu" /', $menu ); 
    }
    return $menu;      
}

add_filter('wp_nav_menu','new_submenu_class', 11, 2 ); 


// Filter menu items as needed and set a custom class etc....
function set_current_menu_class( $classes, $item ) {
	global $post;
	
	/*if( is_singular( 'team' ) ) {
		
		$classes = array_filter($classes, "remove_parent_classes");
		
		if ( in_array('menu-item-27', $classes ) )
			$classes[] = 'current-menu-item';
	}*/
        
    if( ! empty( $item->object ) && 'service_cat' == $item->object ){
        $term = get_term( $item->object_id, 'service_cat' );
        $classes[] = 'menu-item-' . $term->slug;
    }
			
	return $classes;
}

add_filter('nav_menu_css_class', 'set_current_menu_class',1,2); 


// check for current page classes, return false if they exist.
function remove_parent_classes($class){
  return in_array( $class, array( 'current_page_item', 'current_page_parent', 'current_page_ancestor', 'current-menu-item' ) )  ? FALSE : TRUE;
}


// Modal links open in fancybox
function _s_menu_item_fancybox($item_output, $item ) {
    if( ! empty( $item->object ) && 'modal' === $item->object ) {
        $slug = sanitize_title_with_dashes( $item->title );
        $post_id = $item->object_id;
        $menu_modals[] = $post_id;
        return sprintf( '<a class="button modal-form" data-fancybox="%s" data-src="#%s" href="javascript:;">%s</a>', $slug, $slug, $item->title );
    }

    return $item_output;
}
add_filter('walker_nav_menu_start_el','_s_menu_item_fancybox',10,2);





// footer menu

// Add accordion classes to menu
function widget_wp_nav_menu_services( $nav_menu_args, $nav_menu, $args, $instance ) {
    if ( $nav_menu->term_id == 8 ) {
        $nav_menu_args['menu_class'] = 'vertical menu accordion-menu';
        $nav_menu_args['items_wrap'] = '<ul id="%1$s" class="%2$s" data-accordion-menu data-multi-open="false">%3$s</ul>';
    }
    
     
    return $nav_menu_args;
}
add_filter( 'widget_nav_menu_args', 'widget_wp_nav_menu_services', 10, 4 );

// Add accordion sub menu classes
function wp_nav_menu_accordion_sub_menu_classes( $menu, $args ) {      
    // Add accordion sub menu classes
    $classes = explode( ' ', $args->menu_class );
    if ( ! empty( $classes ) && in_array( 'accordion-menu', $classes ) ) {
        
        $menu = preg_replace('/ class="sub-menu"/','/ class="sub-menu vertical-nested" /', $menu ); 
    }
    
    return $menu;      
}

add_filter('wp_nav_menu','wp_nav_menu_accordion_sub_menu_classes', 11, 2 ); 


function _s_menu_item_accordion( $item_output, $item, $depth, $args ) {
    
    $classes = explode( ' ', $args->menu_class );
    if ( ! empty( $classes ) && in_array( 'accordion-menu', $classes ) ) {
        return preg_replace('/href="(.*?)"/', '', $item_output );
    }


    return $item_output;
}
add_filter('walker_nav_menu_start_el','_s_menu_item_accordion', 10, 4 );