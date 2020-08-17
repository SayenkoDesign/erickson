<?php
// Block - Core Values

if( ! class_exists( 'Core_Values_Block' ) ) {
    class Core_Values_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'grid', get_field( 'grid' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */
                                    
            // print the block
            $this->print_element();        
        }
              
        // Add default attributes to block        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
            
            $this->add_render_attribute(
                'container', 'id', 'core-values-container' );
            
            $this->add_render_attribute(
                'container', 'data-toggler', '.slider-show' );                  
            
        }          
        
        // Add content
        public function render() {
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            
            $description = $this->get_fields( 'description' );
            
            $heading = sprintf( '<header>%s%s</header>', _s_format_string( $heading, 'h2' ), $description );
                                    
            $grid = $this->get_grid();
            
            $slider = $this->get_slider();
                                    
            return sprintf( '
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s</div>
                                </div>%s%s
                            ',
                            $heading,
                            $slider,
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
                
                $image = _s_get_acf_image( $row['grid_image'], 'thumbnail' );                                   
                $title = _s_format_string( $row['grid_title'], 'h4' ); 
                                                          
                $items .= sprintf( '<div class="cell">
                                    <div class="grid-item" data-toggle="core-values-container">
                                        <div class="grid-image">%s</div>
                                        <footer>%s</footer>
                                    </div>
                                </div>', 
                                $image,
                                $title
                             );
            }
            
            return sprintf( '<div class="grid-x grid-margin-x grid-margin-bottom small-up-1 medium-up-2 large-up-4 align-center grid" aria-hidden="true">%s</div>', 
                                    $items );
        }
        
        
        
        
        private function get_slider() {
            
            $rows = $this->get_fields( 'grid' );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $items = '';            
                                
            foreach( $rows as $row ) {     
                
                $image = _s_get_acf_image( $row['grid_image'], 'thumbnail' );                                   
                $title = _s_format_string( $row['grid_title'], 'h4' ); 
                $text  = $row['grid_text'];
               
                $items .= sprintf( '<div><div class="slide-content"><div class="slide-image">%s</div>%s%s</div></div>', 
                                 $image, $title, $text );
            }
            
            $button = '<button class="close-slider" data-toggle="core-values-container" aria-hidden="true"><span class="screen-reader-text">close</span></button>';
            
            return sprintf( '<div class="slider" id="slider">%s<div class="slick">%s</div></div>', $button, $items );  
        }
        
    }
}
   
new Core_Values_Block( $data );
