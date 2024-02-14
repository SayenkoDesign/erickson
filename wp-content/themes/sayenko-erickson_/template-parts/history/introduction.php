<?php
// History - Introduction

if( ! class_exists( 'History_Introduction_Section' ) ) {
    class History_Introduction_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'introduction' );
            $this->set_fields( $fields );
                                    
            // Render the section
            if( empty( $this->render() ) ) {   
                return;
            }
            
            // print the section
            $this->print_element();        
        }
        
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-introduction',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-introduction',
                ],
                true
            ); 
                        
        }
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );

            $text = $this->get_fields( 'text' );
            
            $image = _s_get_acf_image( $this->get_fields( 'image' ), 'large' );
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell"><div class="panel">%s%s%s</div></div>
                                </div>
                            </div>',
                            $heading,
                            $text,
                            $image
                         );  
            
        }
        
    }
}
   
new History_Introduction_Section;
