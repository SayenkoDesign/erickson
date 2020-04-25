<?php
// Block - Jobs

if( ! class_exists( 'Jobs_Block' ) ) {
    class Jobs_Block extends Element_Block {
        
        public function __construct( $data ) {
            parent::__construct( $data );
                                    
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'code', get_field( 'code' ) );
            
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
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-jobs',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-jobs',
                ],
                true
            ); 
                        
        }  
        
        
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = sprintf( '<header>%s%s</header>', get_svg( 'search-icon' ),  _s_format_string( $heading, 'h2' ) );
            
            $code = $this->get_fields( 'code' );
            
            if( ! $heading && ! $code ) {
                return false;
            }
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x grid-margin-bottom">
                                <div class="cell">%s<div class="entry-content">%s</div></div>
                            </div></div>',
                            $heading,
                            $code
                         );
            
        }
        
    }
    
    new Jobs_Block( $data );
}
   

