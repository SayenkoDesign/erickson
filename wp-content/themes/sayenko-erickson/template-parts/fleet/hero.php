<?php

/*
Case Studies - Hero
		
*/


if( ! class_exists( 'Hero_Section' ) ) {
    class Hero_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'fleet_archive', 'options' );            
            $this->set_fields( $fields );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-hero'
                ]
            );
            
            $background_image       = $this->get_fields( 'background_image' );
            $background_position_x  = strtolower( $this->get_fields( 'background_position_x' ) ) ?: 'center';
            $background_position_y  = strtolower( $this->get_fields( 'background_position_y' ) ) ?: 'center';
            $background_overlay     = $this->get_fields( 'background_overlay' );
            
            
            
            if( ! empty( $background_image ) ) {
                $background_image = _s_get_acf_image( $background_image, 'hero', true );
                
                $this->add_render_attribute( 'wrapper', 'class', 'has-background' );
                $this->add_render_attribute( 'wrapper', 'class', 'background-image' );
                $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-image: url(%s);', $background_image ) );
                $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-position: %s %s;', 
                                                                          $background_position_x, $background_position_y ) );
                
                if( true == $background_overlay ) {
                     $this->add_render_attribute( 'wrapper', 'class', 'background-overlay' ); 
                }
            }
            
            
            
        } 
        
        // Add content
        public function render() {
            
            $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : __( 'Our<br />Fleet', '_s' );
            $heading = _s_format_string( $heading, 'h2' );
            $heading = sprintf( '<header>%s</header>', $heading  );  


            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle"><div class="cell">%s</div></div></div>', 
                            $heading
                         );
        }
    }
}
   
new Hero_Section; 