<?php
// Block - Values

if( ! class_exists( 'Values_Block' ) ) {
    class Values_Block extends Element_Block {
        
        public function __construct( $data ) {
            parent::__construct( $data );
                                    
            $this->set_fields( 'title', get_field( 'title' ) );
            $this->set_fields( 'text', get_field( 'text' ) );
            $this->set_fields( 'images', get_field( 'images' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */
            
            // print the section
            $this->print_element();        
        }
        
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
      
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
   
new Values_Block( $data );
