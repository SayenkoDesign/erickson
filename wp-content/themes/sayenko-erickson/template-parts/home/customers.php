<?php
// Home - Customers

if( ! class_exists( 'Home_Customers_Section' ) ) {
    class Home_Customers_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'customers' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'settings' );
            $this->set_settings( $settings );
                        
            // Render the section
            if( empty( $this->render() ) ) {
                //return;   
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
                     $this->get_name() . '-customers'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-customers'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( $this->get_fields('heading'), 'h2' ); 
            $heading = sprintf( '<header>%s</header>', $heading  );  
            
            $grid = $this->get_grid();
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x"><div class="cell">%s%s</div></div>
                            </div>',
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
   
new Home_Customers_Section;
