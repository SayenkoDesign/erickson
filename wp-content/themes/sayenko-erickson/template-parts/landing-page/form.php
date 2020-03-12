<?php
// Landing Page - Form

if( ! class_exists( 'Landing_Page_Form' ) ) {
    class Landing_Page_Form extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields['form'] = get_field( 'form' );
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
                     $this->get_name() . '-form'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-form'
                ], true
            );            
            
        }  
        
        
        // Add content
        public function render() {
            
            if( empty( $this->get_fields( 'form' ) ) ) {
                return false;
            };
            
            $thumbnail = get_the_post_thumbnail( get_the_ID(), 'large' );
            
            if( ! empty( $thumbnail ) ) {
                $thumbnail = sprintf( '<div class="thumbnail">%s</div>', $thumbnail );
            }
         
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x grid-margin-bottom">
                                    <div class="cell large-6">%s</div>
                                    <div class="cell large-auto"><div class="panel">%s</div></div>
                                </div>
                            </div>',
                            $thumbnail, 
                            $this->get_fields( 'form' )
                         );
            
        }
                
    }
}
   
new Landing_Page_Form;
