<?php

/*
Hero
		
*/


if( ! class_exists( 'Hero_Section' ) ) {
    class Hero_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                                
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
            
        } 
        
        // Add content
        public function render() {
                        
            
            if( is_tax() ) {
                $heading = single_term_title( '', false);
            } else {
                $heading = 'Erickson In The News';
            }
            
            
            
            
            $heading = _s_format_string( $heading, 'h1', [ 'class' => 'no-reveal' ] );
            $description = $this->get_fields( 'description' );
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'posts-icon' ), $heading, $description  );  


            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle"><div class="cell">%s</div></div></div>', 
                            $heading
                         );
        }
    }
}
   
new Hero_Section; 