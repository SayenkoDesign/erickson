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
                        
            return $this->get_testimonial( $post_id );
           
        }
        

        private function get_testimonial( $post_id = false ) {
            
            if( empty( $post_id ) ) {
                return false;
            }
                                              
            $quote = get_field( 'quote', $post_id );
            
            if( empty( $quote ) ) {
                return false;
            }
                        
            $name = _s_format_string( '- ' . get_field( 'name', $post_id ), 'h6' );
            
            $quote = sprintf( '<div class="quote">%s%s</div>', $quote, $name );
                
            
            $photo = get_the_post_thumbnail_url( $post_id, 'medium' );
            if( ! empty( $photo ) ) {
                $photo = sprintf( '<div class="thumbnail" style="background-image: url(%s);"></div>', $photo );
            }
            
            $quote_mark = sprintf( '<div class="quote-mark">%s</div>', 
                                    get_svg( 'left-quote' ) );
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-padding-x grid-margin-bottom">    
            <div class="cell large-3">%s%s</div><div class="cell large-auto">%s</div></div></div>', $quote_mark, $photo, $quote );   
        }
        
    }
}
   
new Testimonial_Section;
