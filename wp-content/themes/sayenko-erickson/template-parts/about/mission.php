<?php
// About - Mission

if( ! class_exists( 'About_Mission_Section' ) ) {
    class About_Mission_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'mission' );
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
                     $this->get_name() . '-mission',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-mission',
                ],
                true
            ); 
                        
        }  
        
        
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );
            $content = $this->get_fields( 'content' );
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell"><div class="entry-content">%s%s</div></div>
                            </div></div>',
                            $heading,
                            $content
                         );
            
        }
        
    }
}
   
new About_Mission_Section;
