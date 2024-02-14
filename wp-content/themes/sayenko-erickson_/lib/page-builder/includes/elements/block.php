<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Block class
 *
 * @since 1.0.0
 */
class Element_Block extends Element_Base {
        
    private $_block;
    
    /**
	 * Get block name.
	 *
	 * Retrieve the block name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Block name.
	 */
	public function get_name() {
        return sanitize_title_with_dashes( str_replace( 'acf/', '', $this->_block['name'] ) ); 
	}
    
    /**
	 * Get block ID.
	 *
	 * Retrieve the block generic ID.
	 *
	 * @since 1.4.0
	 * @access public
	 *
	 * @return string The ID.
	 */
	public function get_id() {
       return $this->_block['id']; 
	}
    
    /**
	 * Get block IDs.
	 *
	 * Retrieve the block generic IDs.
	 *
	 * @since 1.4.0
	 * @access public
	 *
	 * @return array The IDs.
	 */
    public function get_block_ids() {
        
        if( ! is_singular() ) {
            return false;
        }
        
        
        global $post;
        
        // get all blocks
        $parse_blocks = parse_blocks( $post->post_content );
        
        // Remove empty blocks
        $parse_blocks = array_filter($parse_blocks);
        
        if( empty( $parse_blocks ) ) {
            return NULL;
        }
                
        $ids = [];
        foreach( $parse_blocks as $block ) {
            if( ! empty( $block['attrs']['id'] ) ) {
                $ids[] = $block['attrs']['id'];
            }
        }
        
        return $ids;   
    }
    
    
    /**
	 * Get block anchor.
	 *
	 * Retrieve the block anchor.
	 *
	 * @since 1.4.0
	 * @access public
	 *
	 * @return string The ID.
	 */
	public function get_anchor() {
        if( ! empty( $this->_block['anchor'] ) ) {
            return $this->_block['anchor']; 
        }
	}
    
    
    /**
	 * Get block index
	 *
	 * Retrieve the block index.
	 *
	 *
	 * @return integer
	 */
    public function get_block_index() {
               
        $ids = $this->get_block_ids();
        
        if( empty( $ids ) ) {
            return false;
        }
        
        // Find the id by key
        $key = array_search( $this->get_id(), $ids ) ;
        
        if( false !== $key ) {
            return $key + 1;
        }
        
        return false;
    }
    
    
    /**
	 * Is First Block
	 *
	 * Find the first block
	 *
	 *
	 * @return boolean
	 */
    public function is_first_block() {
       
        $ids = $this->get_block_ids();
        
        if( empty( $ids ) ) {
            return false;
        }
        
        $key = NULL;

        if ( is_array( $ids ) ) {
            
            if( reset( $ids ) == $this->get_id() ) {
                return true;
            }
        }
        
        return false;
    }
    
    
    /**
	 * Is Last Block
	 *
	 * Find the last block
	 *
	 *
	 * @return boolean
	 */
    public function is_last_block() {
       
        $ids = $this->get_block_ids();
        
        if( empty( $ids ) ) {
            return false;
        }
        
        $key = NULL;

        if ( is_array( $ids ) ) {
            
            if( end( $ids ) == $this->get_id() ) {
                return true;
            }
        }
        
        return false;
    }
    
            
    /**
	 * Before block rendering.
	 *
	 * Used to add stuff before the block block.
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
	 * After block rendering.
	 *
	 * Used to add stuff after the block block.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function after_render() {
        return sprintf( '</div></div></%s>', esc_html( $this->get_html_tag() ) );
	}
    

	/**
	 * Add block render attributes.
	 *
	 * Used to add render attributes to the block block.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _add_render_attributes() {
        
        parent::_add_render_attributes();
                
        $this->add_render_attribute(
            'wrapper', 'class', [
                'block'
             ]
        );
        
        $this->add_render_attribute(
            'wrapper', 'class', [
                'block-' . $this->get_name()
             ]
        );
        
        if( ! empty( $this->_block['className'] ) ) {       
            $this->add_render_attribute(
                'wrapper', 'class', [
                    $this->_block['className']
                 ]
            );
        }
                
        if( $this->get_block_index() ) {
            $this->add_render_attribute(
            'wrapper', 'class', [
                'block-' . $this->get_block_index()
             ]
            );
        }
        
        if( $this->is_first_block() ) {
            $this->add_render_attribute(
            'wrapper', 'class', [
                'block-first'
             ]
            );
        }
        
        if( $this->is_last_block() ) {
            $this->add_render_attribute(
            'wrapper', 'class', [
                'block-last'
             ]
            );
        }
        
        if( ! empty( $this->_block['align'] ) ) {       
            $this->add_render_attribute(
                'wrapper', 'class', [
                    $this->_block['align']
                 ]
            );
        }
        
        if( ! is_admin() && $this->get_anchor() ) {
            $this->add_render_attribute(
                'wrapper', 'id', [
                    $this->get_anchor()
                ]
            );
        }
        
		
	}

	/**
	 * Get HTML tag.
	 *
	 * Retrieve the block block HTML tag.
	 *
	 * @since 1.5.3
	 * @access private
	 *
	 * @return string Block HTML tag.
	 */
	public function get_html_tag() {
	
		$html_tag = 'section';

		return $html_tag;
	}
    
    
    /**
	 * Print block.
	 *
	 * Used to generate the block final HTML on the frontend and the editor.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function print_element() {        
		echo $this->get_element();
	}
    
    /**
	 * Get block.
	 *
	 * Used to get the block final HTML on the frontend.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function get_element() {   
    
        if( is_admin() ) {
            return $this->get_admin_block();
        }
        
        $content = $this->render();
        
		if ( $content ) {
                        
			$this->_add_render_attributes();
            
            $output  = '';
            $output .= $this->before_render();
            $output .= $content;
            $output .= $this->after_render();
            
            return $output;            
		}

        
	}
    
    
    public function get_admin_block() {
        $name = ucwords( str_replace( '-', ' ', $this->get_name() ) );
        return sprintf( '<div class="acf-block-placeholder">%s Block</div>', $this->_block['title'] );
    }
        
    public function __construct( array $data = [], array $args = null ) {
        if ( $args ) {
			$this->_default_args = $args;
		}
        
        $this->_block = $data['block'];
                                        
        parent::__construct( $data );
	}
    
}
