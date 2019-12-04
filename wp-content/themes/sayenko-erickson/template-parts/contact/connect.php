<?php
// Contact - Connect

if( ! class_exists( 'Contact_Connect_Section' ) ) {
    class Contact_Connect_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'connect' );
            $this->set_fields( $fields );
                                    
            // Render the section
            if( empty( $this->get_fields( 'form' ) ) ) {   
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
                     $this->get_name() . '-connect',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-connect',
                ],
                true
            ); 
                        
        }  
        
        
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );
            
            $subheading = $this->get_fields( 'subheading' );
            $subheading = _s_format_string( $subheading, 'p' );
            
            $form_id = absint( $this->get_fields( 'form' ) ); 
            $form = GFAPI::get_form( $form_id );
            $out = '';
            if( false !== $form ) {
               $out = do_shortcode( sprintf( '[gravityform id="%s" title="false" description="false" ajax="false"]', $form_id ) );
            }
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell"><div class="entry-content">%s%s%s</div></div>
                            </div></div>',
                            $heading,
                            $subheading,
                            $out
                         );
            
        }
        
        private function content() {
            
        }
        
    }
}
   
new Contact_Connect_Section;
