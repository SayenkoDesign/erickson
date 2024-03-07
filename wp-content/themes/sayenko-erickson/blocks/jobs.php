<?php
// Block - Jobs

if( ! class_exists( 'Jobs_Block' ) ) {
    class Jobs_Block extends Element_Block {
        
        public function __construct( $data ) {
            parent::__construct( $data );
                                    
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'text', get_field( 'text' ) );
            $this->set_fields( 'code', get_field( 'code' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */

            $this->set_settings( 'background_color', get_field( 'background_color' ) );
            
            // print the section
            $this->print_element();        
        }
        
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
           
            if( ! empty( $this->get_settings( 'background_color' ) ) ) {                                                              
                $this->add_render_attribute( 'wrapper', 'class', 'background-color-' . strtolower( $this->get_settings( 'background_color' ) ) ); 
            }   
        }  
        
        
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = sprintf( '<header>%s%s</header>', get_svg( 'search-icon' ),  _s_format_string( $heading, 'h2' ) );
            
            $text = $this->get_fields( 'text' ); 
            
            $code = $this->get_fields( 'code' );
            
            if( ! $heading && ! $code ) {
                return false;
            }
            
            return sprintf( '<div class="grid-x grid-margin-x grid-margin-bottom">
                                <div class="cell">%s<div class="entry-content">%s%s</div></div>
                            </div>',
                            $heading,
                            $text,
                            $code
                         );
            
        }
        
    }
    
    new Jobs_Block( $data );
}
   

