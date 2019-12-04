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
class Element_Block extends Element_Base {
        
    private $_block;
    
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
        
        return sanitize_title_with_dashes( str_replace( 'acf/', '', $this->_block['name'] ) ); 
        
	}
    
    /**
	 * Get element ID.
	 *
	 * Retrieve the element generic ID.
	 *
	 * @since 1.4.0
	 * @access public
	 *
	 * @return string The ID.
	 */
	public function get_id() {
        
        if( ! empty( $this->_block['anchor'] ) ) {
            return sanitize_title_with_dashes( $this->_block['anchor'] ); 
        }
        
		return $this->_block['id'];
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
                
        $this->add_render_attribute(
            'wrapper', 'class', [
                $this->get_name()
             ]
        );
        
        if( ! empty( $this->_block['className'] ) ) {       
            $this->add_render_attribute(
                'wrapper', 'class', [
                    $this->_block['className']
                 ]
            );
        }
        
        if( ! is_admin() ) {
            $this->add_render_attribute(
                'wrapper', 'id', [
                    $this->get_id()
                ]
            );
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
    
    
    public function __construct( array $data = [], array $args = null ) {
        if ( $args ) {
			$this->_default_args = $args;
		}
        
        $this->_block = $data['block'];
                                
        parent::__construct( $data );
	}
    
}
