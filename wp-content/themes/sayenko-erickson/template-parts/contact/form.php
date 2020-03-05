<?php
// Contact - Form

if( ! class_exists( 'Contact_Form_Section' ) ) {
    class Contact_Form_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields['form'] = get_field( 'contact_form' );
            $this->set_fields( $fields );
            
            // print the section
            $this->print_element();        
        }
        
        public function before_render() {            
            return '';
        }
        
        public function after_render() {
            return '';
        }  
        
        // Add content
        public function render() {
            
            if( empty( $this->get_fields( 'form' ) ) ) {
                return false;
            };
                        
            return sprintf( '<div class="cell large-auto"><div class="entry-content">%s</div></div>',
                            $this->get_fields( 'form' )
                         );
            
        }
                
    }
}
   
new Contact_Form_Section;
