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
      $classes = $item->classes;
      
 	  if ( in_array( 'lets-talk', $classes ) ) {
		$atts['data-open'] = 'contact';
	  }
	  return $atts;
}

add_filter( 'nav_menu_link_attributes', '_s_contact_menu_atts', 10, 3 );



function add_telephone( $items, $args ) {
    if ( 'secondary' === $args->theme_location ) {
        
        $phone = get_field( 'phone', 'option' );
        if( ! empty( $phone ) ) {
            $phone = sprintf('<a href="%s">%s</a>', _s_format_telephone_url( $phone ), $phone );
            $phone = sprintf( '<li class="menu-item phone-number show-for-xxlarge">%s</li>', $phone );
        }
    }
    return $phone . $items;
}
                


add_filter('nav_menu_item_args', function ($args, $item, $depth) {
    $classes = $item->classes;
    if ( in_array('button', $classes ) ) {
        $args->link_before = '<span>';
        $args->link_after  = '</span>';
    }
    return $args;
}, 10, 3);


function new_submenu_class($menu) {    
    $menu = preg_replace('/ class="sub-menu"/','/ class="sub-menu is-dropdown-submenu" /',$menu);        
    return $menu;      
}

add_filter('wp_nav_menu','new_submenu_class'); 


// Filter menu items as needed and set a custom class etc....
function set_current_menu_class($classes) {
	global $post;
	
	if( is_singular( 'team' ) ) {
		
		$classes = array_filter($classes, "remove_parent_classes");
		
		if ( in_array('menu-item-27', $classes ) )
			$classes[] = 'current-menu-item';
	}
			
	return $classes;
}

//add_filter('nav_menu_css_class', 'set_current_menu_class',1,2); 


// check for current page classes, return false if they exist.
function remove_parent_classes($class){
  return in_array( $class, array( 'current_page_item', 'current_page_parent', 'current_page_ancestor', 'current-menu-item' ) )  ? FALSE : TRUE;
}


class Walker_Nav_Menu_Dropdown extends Walker_Nav_Menu {
	function start_lvl(&$output, $depth = 0, $args = array()){
		$indent = str_repeat("\t", $depth); // don't output children opening tag (`<ul>`)
	}

	function end_lvl(&$output, $depth = 0, $args = array()){
		$indent = str_repeat("\t", $depth); // don't output children closing tag
	}

	/**
	* Start the element output.
	*
	* @param  string $output Passed by reference. Used to append additional content.
	* @param  object $item   Menu item data object.
	* @param  int $depth     Depth of menu item. May be used for padding.
	* @param  array $args    Additional strings.
	* @return void
	*/
	function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
 		$url = '#' !== $item->url ? $item->url : '';
 		$output .= '<option value="' . $url . '">' . $item->title;
	}	

	function end_el(&$output, $item, $depth = 0, $args = array()){
		$output .= "</option>\n"; // replace closing </li> with the option tag
	}
}