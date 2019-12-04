<?php

/*
About - Hero
		
*/


if( ! class_exists( 'Contact_Map' ) ) {
    class Contact_Map extends Element_Section {
        
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'map' );
            $this->set_fields( $fields );
                                    
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-map'
                ]
            );
            
            $background_image       = $this->get_fields( 'background_image' );
            $background_position_x  = strtolower( $this->get_fields( 'background_position_x' ) ) ?: 'center';
            $background_position_y  = strtolower( $this->get_fields( 'background_position_y' ) ) ?: 'center';
            $background_overlay     = $this->get_fields( 'background_overlay' );
            
            
            
            if( ! empty( $background_image ) ) {
                $background_image = _s_get_acf_image( $background_image, 'hero', true );
            } else  {
                $background_image = get_the_post_thumbnail_url( get_the_ID(), 'hero' );
                
                if( empty( $background_image ) ) {
                    $background_image = get_field( 'post_image_fallback', 'option' );
                    if( ! empty( $background_image ) ) {
                        $background_image = wp_get_attachment_image_src( $background_image, 'hero' );
                    }   
                }
            }
            
            $this->add_render_attribute( 'wrapper', 'class', 'has-background' );
            $this->add_render_attribute( 'wrapper', 'class', 'background-image' );
            $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-image: url(%s);', $background_image ) );
            $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-position: %s %s;', 
                                                                      $background_position_x, $background_position_y ) );
            
            if( true == $background_overlay ) {
                 $this->add_render_attribute( 'wrapper', 'class', 'background-overlay' ); 
            }
                                                                          
        }

        
        // Add content
        public function render() {
            
            $title = $this->get_fields( 'title' );
            $text = $this->get_fields( 'text' );
            
            $location = sprintf( '<div class="location"><h6>%s</h6><p>%s</p></div>', $title, $text );
    
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell"><div class="map-content">%s</div></div>
                            </div></div>',
                            $location
                         );
        }
    }
}
   
new Contact_Map; 