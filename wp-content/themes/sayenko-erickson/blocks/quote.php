<?php

/*
Block - Quote
		
*/    
    
if( ! class_exists( 'Quote_Block' ) ) {
    class Quote_Block extends Element_Block {
        
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'text', get_field( 'text' ) );

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
                        
            if( empty( $this->get_field( 'text' ) ) ) {
                return false;
            }
            
            $quote_mark = sprintf( '<div class="quote-mark">%s</div>', 
                                    get_svg( 'left-quote' ) );
                                                                                       
            return sprintf( '<div class="grid-x grid-margin-x">    
            <div class="cell"><div class="quote">%s%s</div></div>', $quote_mark, $this->get_field( 'text' ) );
        }
                      
    }
}
   
new Quote_Block( $data );

    