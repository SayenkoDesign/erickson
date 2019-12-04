<?php

/*
Product - Options
*/


if( ! class_exists( 'Product_Options' ) ) {
    class Product_Options extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'options' );          
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-product-options'
                ]
            );            
        } 
           
        
        // Add content
        public function render() {
            
            /*
            options - heading, list -> item
*/                        
            $options = $this->get_options();
            if( empty( $options ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-x-margin"><div class="cell">%s</div></div></div>',
                            $options
            );
               
        }
        
        
        
        
        private function get_options() {
            $field = $this->get_fields();
            if( empty( $field[ 'heading' ] ) || empty( $field[ 'list' ] )  ) {
                return false;
            }
            
            $heading = _s_format_string( $field[ 'heading' ], 'h2' );
            
            $rows = $field[ 'list' ];
            $list = '';
            foreach( $rows as $row ) {
                $item = $row['item'];
                $link = $row['link'];
                if( ! empty( $item ) ) {
                    if( $link ) {
                        $item = sprintf( '<a href="%s" target="_blank">%s</a>', $link, $item );
                    } 
                    $list .= sprintf( '<li><span>%s</span></li>', $item );
                }
            }
            
            if( ! empty( $list ) ) {
                $list = sprintf( '<ul>%s</ul>', $list );
            }
            
            return sprintf( '%s%s', $heading, $list );
        }
        
    }
}
   
new Product_Options; 