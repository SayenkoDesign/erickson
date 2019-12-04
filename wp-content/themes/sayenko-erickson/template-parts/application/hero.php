<?php

/*
Blog - Hero
		
*/


if( ! class_exists( 'Hero_Section' ) ) {
    class Hero_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
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
                     $this->get_name() . '-hero'
                ]
            );
            
            $this->add_render_attribute( 'wrapper', 'class', 'hero-bottom-gray' );            
        } 
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            
            /*if( is_category() ) {
                $heading = single_cat_title( '', false );
            }
            
            if( is_post_type_archive() ) {
                $heading = post_type_archive_title( '', false );
            }*/
            
            $heading      = sprintf( '%s', _s_format_string( $heading, 'h1', [ 'class' => 'h3' ] ) );
            
            $subheading   = $this->get_fields( 'subheading' ) ? '' : _s_format_string( $this->get_fields( 'subheading' ), 'h2' );
            
            $heading      = sprintf( '<div class="hero-title">%s%s</div>', $heading, $subheading );
            
            $description  = $this->get_fields( 'description' );
            if( ! empty( $description ) ) {
                $description = sprintf( '<div class="hero-description">%s</div>', $description );
            }
            
            

            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle"><div class="cell"><div class="hero-content">%s%s</div></div></div></div>', 
                            $heading,
                            $description
                         );
        }
    }
}
   
new Hero_Section; 