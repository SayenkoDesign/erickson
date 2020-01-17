<?php
// Footer - CTA

if( ! class_exists( 'Footer_CTA_Section' ) ) {
    class Footer_CTA_Section extends Element_Section {
        
        var $post_id = 'option';
        
        public function __construct() {
            parent::__construct();
            
            /*
            is this a single page? 
            is it turned off?
            does it exist?
            fallback to options page
            */
                        
            $hide_call_to_action = false;
            
            // default to TRUE for the blog
            if( is_singular() ) {
                $fields = get_field( 'footer_cta' );
                if( ! empty( $fields['title'] ) && ! empty( $fields['button_url'] ) && ! empty( $fields['button_text'] ) ) {
                    // $this->post_id = get_the_ID();
                }
                
                $hide_call_to_action = $fields['hide_call_to_action'];   
                
            }
            
            $fields = get_field( 'footer_cta', $this->post_id );
            
            if( $hide_call_to_action ) {
                return false;
            }
                                                                                    
            $this->set_fields( $fields );  
            
            // Render the section
            if( empty( $this->render() ) ) {
                //return;   
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
                     $this->get_name() . '-footer-cta'
                ]
            ); 
        }  
        
        
        // Add content
        public function render() {
                                                
            $heading = $this->get_fields( 'heading' );
            $button = $this->get_fields( 'button' );
                      
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '<p>%s</p>', _s_acf_button( $args ) );
            } else {
                $button = '';
            }
            
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x"><div class="cell"><div class="call-to-action">%s%s</div></div></div>
                            </div>',
                            $heading,
                            $button
                         );  
               
        }
        
    }
}
   
new Footer_CTA_Section;
