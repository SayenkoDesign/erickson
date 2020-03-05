<?php
// Careers - Values

if( ! class_exists( 'Careers_Values_Section' ) ) {
    class Careers_Values_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'values' );
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
                     $this->get_name() . '-values',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-values',
                ],
                true
            ); 
                        
        }
              
        
        // Add content
        public function render() {
            
            
            
            $title = $this->get_fields( 'title' );
            $title = sprintf( '<header>%s%s</header>', get_svg( 'world-icon' ),  _s_format_string( $title, 'h2' ) );

            $text = $this->get_fields( 'text' );
            
            $grid = '';
            $images = $this->get_fields( 'images' );
            
            if( ! empty( $images ) ) {
                foreach( $images as $image ) { 
                    $background = sprintf( ' style="background-image: url(%s);"', _s_get_acf_image( $image, 'large', true ) );
                    $grid .= sprintf( '<div class="grid-item"><div class="background"%s></div></div>', $background );
                }
                
                $grid = sprintf( '<div class="cell large-auto small-order-2 large-order-1"><div class="grid">%s</div></div>', $grid ); 
            }
                           
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x">
                                    <div class="cell large-auto small-order-1 large-order-2"><div class="panel">%s%s</div></div>
                                    %s
                                </div>
                            </div>',
                            $title,
                            $text,
                            $grid
                         );  
            
        }
        
    }
}
   
new Careers_Values_Section;
