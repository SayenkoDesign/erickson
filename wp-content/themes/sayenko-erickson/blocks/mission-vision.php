<?php
// Block: Mission & Vision

if( ! class_exists( 'Mission_Vision_Block' ) ) {
    class Mission_Vision_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'grid', get_field( 'grid' ) );
            
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
            
            // Add custom classes
            /*
            $this->add_render_attribute(
                'wrapper', 'class', [ 'class-1', 'class-2' ]
            );  
            */ 

        }          
        
        // Add content
        public function render() {         
            
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );
            if( ! empty( $heading ) ) {
                $heading = sprintf( '<header>%s</header>', $heading  );  
            }
                        
            $grid = $this->get_grid();
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s%s</div>
                                </div>
                            </div>',
                            $heading,
                            $grid
                         );  
        }
        
        
        private function get_grid() {
            
            $rows = $this->get_fields( 'grid' );
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $items = '';
               
            foreach( $rows as $key => $row ) {  
                
                $image = _s_get_acf_image( $row['image'], 'large' );                                   
                $title = _s_format_string( $row['title'], 'h2' ); 
                $text = $row['text'];
                              
                if( ! empty( $image ) ) {
                    $image = sprintf( '<div class="cell large-auto object-fit-parent%s">%s</div>', $key % 2 == 0 ? '' : ' large-order-1', $image );
                }
                                        
                $items .=  sprintf( '
                                <div class="grid-x">
                                    <div class="cell large-auto align-self-middle%s"><div class="panel">%s%s</div></div>
                                    %s
                                </div>
                            ',
                            $key % 2 == 0 ? '' : ' large-order-2', 
                            $title,
                            $text,
                            $image
                         );  

            }
            
            return $items;
        }
                
    }
}
   
new Mission_Vision_Block( $data );
