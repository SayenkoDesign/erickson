<?php
// Block: Approach

if( ! class_exists( 'Approach_Block' ) ) {
    class Approach_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'text', get_field( 'text' ) );
            $this->set_fields( 'list', get_field( 'list' ) );
            $this->set_fields( 'button', get_field( 'button' ) );
            
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
                                    
            $heading = $this->get_fields( 'heading' );
            if( ! empty( $heading ) ) {
                $heading = _s_format_string( $heading, 'h2' );
                $heading = sprintf( '<header>%s</header>', $heading  );  
            }
            
            $text = $this->get_fields( 'text' ); 
            
            if( empty( $text ) ) {
                return false;
            }
            
            $list = $this->get_fields( 'list' );
            
            if( empty( $list ) ) {
                return false;
            }
            
            $button = $this->get_fields( 'button' );
                                    
            if( ! empty( $button['button']['link'] ) ) {
                                
                $args = [
                    'link' => $button['button']['link'],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '<p class="button-wrapper">%s</p>', _s_acf_button( $args ) );
            } else {
                $button = '';   
            }
            
            $items = explode("\n", str_replace("\r", "", trim( $list ) ) );
            $list = sprintf( '<div class="cell large-5 large-order-1"><div class="panel">%s %s</div></div>', ul( $items ), $button  );
                                        
            return sprintf( '
                                <div class="grid-x grid-padding-x">
                                    <div class="cell">%s</div>
                                </div>
                                <div class="grid-x grid-padding-x grid-margin-bottom">
                                    <div class="cell large-7 large-order-2">%s</div>
                                    %s
                                </div>
                            ',
                            $heading,
                            $text,
                            $list
                         );  
        }
        
    }
}
   
new Approach_Block( $data );
