<?php
// Case Study - Solution

if( ! class_exists( 'Solution_Section' ) ) {
    class Solution_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'solution' );
            $this->set_fields( $fields );
                        
            $settings = $this->get_fields( 'solution' );
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-solution'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-solution'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( __( 'Solution', '_s' ), 'h2' );
            
            $text = $this->get_fields( 'text' ); 
            
            $image = _s_get_acf_image( $this->get_fields( 'image' ), 'large' );
            if( ! empty( $image ) ) {
                $style = sprintf( ' style="background-image: url(%s);"', $image );
                $image = sprintf( '<div class="cell large-auto small-order-1 large-order-2 object-fit-parent">%s</div>', $image );
            }
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x">
                                    <div class="cell large-auto small-order-2 large-order-1"><div class="panel">%s%s</div></div>
                                    %s
                                </div>
                            </div>',
                            $heading,
                            $text,
                            $image
                         );  
        }
        
        
    }
}
   
new Solution_Section;
