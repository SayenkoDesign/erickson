<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor section element class.
 *
 * Elementor repeater handler class is responsible for initializing the section
 * element.
 *
 * @since 1.0.0
 */
class Element_Section extends Element_Base {
            
    static public $count;
    
    static public $row_layouts = [];
    
    /**
	 * Get section name.
	 *
	 * Retrieve the section name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Section name.
	 */
	public function get_name() {
		return 'section';
	}
    
    
    /**
	 * Get default data.
	 *
	 * Retrieve the default data. Used to reset the data on initialization.
	 *
	 * @since 1.4.0
	 * @access protected
	 *
	 * @return array Default data.
	 */
	protected function get_default_data() {
		        
        $default_data = parent::get_default_data();
        
        if( ! self::$count ) {
            self::$count ++;
        }
        
        return [
			'id' => self::$count,
			'settings' => [],
            'fields' => [],
		];
	}
        
    /**
	 * Before section rendering.
	 *
	 * Used to add stuff before the section element.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function before_render() {            
        
        $this->add_render_attribute( 'wrap', 'class', 'wrap' );
        
        $this->add_render_attribute( 'container', 'class', 'container' );
        
        return sprintf( '<%s %s><div %s><div %s>', 
                        esc_html( $this->get_html_tag() ), 
                        $this->get_render_attribute_string( 'wrapper' ),
                        $this->get_render_attribute_string( 'wrap' ),
                        $this->get_render_attribute_string( 'container' )
                        );
    }
    

	/**
	 * After section rendering.
	 *
	 * Used to add stuff after the section element.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function after_render() {
        return sprintf( '</div></div></%s>', esc_html( $this->get_html_tag() ) );
	}
    

	/**
	 * Add section render attributes.
	 *
	 * Used to add render attributes to the section element.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _add_render_attributes() {
        
        parent::_add_render_attributes();
                
        // Default        
        $this->add_render_attribute(
            'wrapper', 'class', [
                $this->get_name(),
                $this->get_name() . '-' . $this->get_id()
            ]
        );
        
        // Set layout index
        self::$row_layouts[]['name'] = get_row_layout() ? get_row_layout() : 'section';
        // Get row layout
        $count = 0;
        $criteria = array( 'name' => get_row_layout() );
        $row_layout = wp_list_filter( self::$row_layouts, $criteria );
        if( $row_layout ) { 
            $count = count( $row_layout );
        }
        
        if( $row_layout ) {

            // Set default classes
            $row_layout = str_replace( '_', '-', get_row_layout() . '-section-' . $count ); 
            $this->add_render_attribute( 'wrapper', 'class', $row_layout );
            $even_odd = $count % 2 == 0 ? 'even' : 'odd';
            $even_odd_class = str_replace( '_', '-', get_row_layout() . '-section-' . $even_odd );  
            $this->add_render_attribute( 'wrapper', 'class', $even_odd_class );
            
            // Set default ID
            $row_layout = get_row_layout() ? str_replace( '_', '-', get_row_layout() . '-' . $count ) : ''; 
            if( $row_layout ) {
                $this->add_render_attribute( 'wrapper', 'id', $row_layout, true );
            }
        } else {
                            
            if( empty( $this->get_render_attribute_string( 'id' ) ) ) {
                $this->add_render_attribute(
                    'wrapper', 'id', [
                        $this->get_name() . '-' . $this->get_id()
                    ]
                );   
            }
        }
        
		
	}

	/**
	 * Get HTML tag.
	 *
	 * Retrieve the section element HTML tag.
	 *
	 * @since 1.5.3
	 * @access private
	 *
	 * @return string Section HTML tag.
	 */
	public function get_html_tag() {
	
		$html_tag = 'section';

		return $html_tag;
	} 
    
    
    function __destruct() {
        self::$count ++;
    }   
}
