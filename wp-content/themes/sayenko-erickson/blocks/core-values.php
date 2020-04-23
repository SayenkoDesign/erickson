<?php
// Block: Core Values

if( ! class_exists( 'Core_Values_Block' ) ) {
    class Core_Values_Block extends Element_Block {
                
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
            if( ! empty( $heading ) ) {
                $heading = _s_format_string( $heading, 'h2' );
                $heading = sprintf( '<header>%s</header>', $heading  );  
            }
                        
            $grid = $this->get_grid();
                        
            return sprintf( '
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s%s</div>
                                </div>
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
               
            foreach( $rows as $key => $row ) {  
                
                $image = _s_get_acf_image( $row['image'], 'thumbnail' );                                   
                $title = _s_format_string( $row['title'], 'h3', [ 'class' => 'h4' ] ); 
                                
                $count = $key + 1;
                          
                $items .= sprintf( '<div class="cell medium-4 large-auto">
                                        <div class="grid-image">%s</div>
                                        %s
                                    </div>', 
                                    $image,
                                    $title
                             );
            }
            
            return sprintf( '<div class="grid-x grid-margin-x align-center grid">%s</div>', 
                                    $items );
        }
                
    }
}
   
new Core_Values_Block( $data );
