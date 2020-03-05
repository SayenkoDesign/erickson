<?php
// About - Vision

if( ! class_exists( 'About_Vision_Section' ) ) {
    class About_Vision_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'vision' );
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
                     $this->get_name() . '-vision',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-vision',
                ],
                true
            ); 
                        
        }  
        
        
        public function before_render() {            
            return '';
        }
        
        
        public function after_render() {
            return '';
        }
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );

            $text = $this->get_fields( 'text' );
            
            $image = _s_get_acf_image( $this->get_fields( 'image' ), 'large' );
            if( ! empty( $image ) ) {
                $style = sprintf( ' style="background-image: url(%s);"', $image );
                $image = sprintf( '<div class="cell large-auto large-order-1 object-fit-parent">%s</div>', $image );
            }
                                        
            return sprintf( '
                                <div class="grid-x">
                                    <div class="cell large-auto large-order-2 align-self-middle"><div class="panel">%s%s</div></div>
                                    %s
                                </div>
                            ',
                            $heading,
                            $text,
                            $image
                         );  
            
        }
        
    }
}
   
new About_Vision_Section;
