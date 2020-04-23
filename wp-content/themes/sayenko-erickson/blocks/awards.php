<?php
// Block: Awards

if( ! class_exists( 'Awards_Block' ) ) {
    class Awards_Block extends Element_Block {
                
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
                                        
        } 
               
        
        // Add content
        public function render() {
            
            if( ! empty( $this->get_fields( 'heading' ) ) ) {
                $heading = sprintf( '<header>%s%s</header>', get_svg( 'best-seller-icon' ), _s_format_string( $this->get_fields( 'heading' ), 'h2' )  );  
            }
                        
            $grid = $this->get_grid();
                        
            return sprintf( '
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s</div>
                                </div>
                                %s
                            ',
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
               
            foreach( $rows as $row ) {  
                
                $image = _s_get_acf_image( $row['image'], 'thumbnail' );                                   
                $title = _s_format_string( $row['title'], 'h3', [ 'class' => 'h4' ] ); 
                $text = $row['text']; 
                                                          
                $items .= sprintf( '<div class="cell small-12 medium-6 large-4 xxxlarge-auto">
                                        <div class="panel">
                                            <div class="grid-image">%s</div>
                                            %s
                                            <footer>
                                                <div class="tooltip">
                                                  <div class="tooltip--container">
                                                    <div class="tooltip--text">
                                                      %s
                                                    </div>
                                                    <div class="tooltip--tip"></div>
                                                  </div>
                                                </div>
                                            </footer>
                                        </div>
                                    </div>', 
                                    $image,
                                    $title,
                                    $text
                             );
            }
            
            return sprintf( '<div class="grid-x grid-margin-x align-center grid">%s</div>', 
                                    $items );
        }
        
    }
}
   
new Awards_Block( $data );
