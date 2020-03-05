<?php

/*
Case Studies - Hero
		
*/


if( ! class_exists( 'Hero_Section' ) ) {
    class Hero_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'case_study_archive', 'options' );            
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
            
        } 
        
        // Add content
        public function render() {
            
            $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : __( 'Case Studies', '_s' );
            $heading = _s_format_string( $heading, 'h1' );
            $description = $this->get_fields( 'description' );
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'posts-icon' ), $heading, $description  );  


            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle"><div class="cell">%s</div></div></div>', 
                            $heading
                         );
        }
    }
}
   
new Hero_Section; 