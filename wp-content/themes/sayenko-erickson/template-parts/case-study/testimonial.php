<?php
// Case Study - Testimonial

if( ! class_exists( 'Testimonial_Section' ) ) {
    class Testimonial_Section extends Element_Section {
                        
        public function __construct() {
            parent::__construct();
                        
            $fields['testimonial'] = get_field( 'testimonial' );
            $this->set_fields( $fields );
            
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
                     $this->get_name() . '-testimonial',
                     $this->get_name() . '-testimonial' . '-' . $this->get_id(),
                ]
            ); 
                        
        }  
                
        
        // Add content
        public function render() {
                        
            $post_id = $this->get_fields( 'testimonial' );  
                        
            if( empty( $post_id ) ) {
                return false;
            }
                                        
            $photo = get_the_post_thumbnail( $post_id, 'large' );
            
            $quote = get_field( 'quote', $post_id );
            
            $name = get_field( 'name', $post_id );
            
            if( $name ) {
                $name = _s_format_string( '- ' . $name, 'h6' );
            }
            
            if( empty( $photo ) || empty( $quote )  ) {
                return false;
            }
 
            
            $quote_mark = sprintf( '<div class="quote-mark"><span>&ldquo;</span></div>', 
                                    trailingslashit( THEME_IMG ) );
            
            $quote = sprintf( '<div class="quote">%s%s%s</div>', $quote_mark, $quote, $name );
                
            return sprintf( '<div class="grid-container fluid"><div class="grid-x grid-margin-x">    
            <div class="cell large-5">%s</div><div class="cell large-auto">%s</div></div></div>', $photo, $quote );
           
        }
        

        
    }
}
   
new Testimonial_Section;
