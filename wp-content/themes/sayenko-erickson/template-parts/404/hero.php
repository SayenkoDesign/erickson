<?php

/*
404 - Hero
		
*/


if( ! class_exists( 'Page_404__Hero' ) ) {
    class Page_404__Hero extends Element_Section {
        
        public function __construct() {
            parent::__construct();
            
            $fields['heading'] = get_field( 'error_404_heading', 'option' );
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
                     $this->get_name() . '-hero'
                ]
            );
                                     
        }

        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : 'Page Not Found';
            $heading = _s_format_string( $heading, 'h1', ['class' => 'h2' ] );
            
            $description = empty( $this->get_fields( 'description' ) ) ? '' : _s_format_string( $this->get_fields( 'description' ), 'p' );
                
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell"><div class="hero-content">%s%s</div></div>
                            </div></div>',
                            $heading,
                            $description
                         );
        }
    }
}
   
new Page_404__Hero; 