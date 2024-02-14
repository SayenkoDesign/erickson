<?php
// Block: Customers

if( ! class_exists( 'Customers_Block' ) ) {
    class Customers_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'logos', get_field( 'logos' ) );
            
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
                                    
            $heading = _s_format_string( $this->get_fields('heading'), 'h2' ); 
            $heading = sprintf( '<header>%s</header>', $heading  );  
            
            $grid = $this->get_grid();
                        
            return sprintf( '
                                <div class="grid-x grid-margin-x"><div class="cell">%s%s</div></div>
                            ',
                            $heading,
                            $grid
                         );  
        }
        
        
        private function get_grid() {
            
            $rows = $this->get_fields( 'logos' );
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $items = '';
               
            foreach( $rows as $key => $row ) {  
                $items .= $this->get_item( $row );
            }
            
            return sprintf( '<ul class="logos">%s</ul>', 
                                    $items );
        }
        
        
        private function get_item( $row ) {
            
            $image = $row['image'];  
            $image = sprintf( '<span>%s</span>', _s_get_acf_image( $image ) );    
                                                                                                       
            $url = $row['url'];
            if( ! empty( $url ) ) {
                $image = sprintf( '<a href="%s">%s</a>', $url, $image );
            }
                      
            return sprintf( '<li>%s</li>', 
                            $image
                         );
        }        
    }
}
   
new Customers_Block( $data );
