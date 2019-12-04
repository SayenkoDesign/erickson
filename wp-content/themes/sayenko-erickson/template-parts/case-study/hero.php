<?php

/*
Case Studies - Hero
		
*/


if( ! class_exists( 'Hero_Section' ) ) {
    class Hero_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            // Render the section
            //$this->render();
            
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
            
            $heading = __( 'Case Studies' );
            
            $heading      = sprintf( '%s', _s_format_string( $heading, 'h1', [ 'class' => 'h2' ] ) );
                        
            $heading      = sprintf( '<div class="hero-title">%s</div>', $heading );


            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle"><div class="cell"><div class="hero-content">%s</div></div></div></div>', 
                            $heading
                         );
        }
    }
}
   
new Hero_Section; 