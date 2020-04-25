<?php
// Block - Benefits

if( ! class_exists( 'Benefits_Block' ) ) {
    class Benefits_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
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
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-benefits'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-benefits'
                ], true
            );  
            
            $this->add_render_attribute(
                'wrapper', 'data-toggler', '.slider-show' );                  
            
        }          
        
        // Add content
        public function render() {
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            
            $description = $this->get_fields( 'description' );
            
            $heading = sprintf( '<header>%s%s</header>', _s_format_string( $heading, 'h2' ), $description );
                                    
            $grid = $this->get_grid();
            
            $slider = $this->get_slider();
                                    
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s</div>
                                </div>%s%s
                            </div>',
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
                                    <div class="grid-item" data-toggle="section-benefits">
                                        <div class="grid-image">%s</div>
                                        <footer>%s</footer>
                                    </div>
                                </div>', 
                                $image,
                                $title
                             );
            }
            
            return sprintf( '<div class="grid-x grid-margin-x small-up-1 medium-up-3 large-up-5 align-center grid" aria-hidden="true">%s</div>', 
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
                $text  = _s_format_string( $row['grid_text'], 'p' );
               
                $items .= sprintf( '<div><div class="slide-content"><div class="slide-image">%s</div>%s%s</div></div>', 
                                 $image, $title, $text );
            }
            
            $button = '<button class="close-slider" data-toggle="section-benefits" aria-hidden="true"><span class="screen-reader-text">close</span></button>';
            
            return sprintf( '<div class="slider" id="slider">%s<div class="slick">%s</div></div>', $button, $items );  
        }
        
    }
}
   
new Benefits_Block( $data );
