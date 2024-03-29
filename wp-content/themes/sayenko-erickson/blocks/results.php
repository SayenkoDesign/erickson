<?php
// Block- Results

if( ! class_exists( 'Block_Results' ) ) {
    class Block_Results extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'results', get_field( 'results' ) );
            
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
                                    
            $heading = $this->get_fields( 'heading' );
            if( ! empty( $heading ) ) {
                $heading = _s_format_string( $heading, 'h2' );
                $heading = sprintf( '<header>%s</header>', $heading  );  
            }
            
            $rows = array_filter( $this->get_fields( 'results' ) );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $total = count( $rows );
            $classes = 4 > $total ? 'medium-auto' : 'medium-2';
                        
            $cells = '';
            foreach( $rows as $row ) {
                $number        = $row['number']; 
                $prefix        = $row['prefix']; 
                $suffix        = $row['suffix']; 
                $format        = $row['format']; 
                $description   = _s_format_string( $row['description'], 'h4' ); 
                
                $cells .= sprintf( '<div class="cell %s"><div class="panel">
                <h3 class="number animate" data-prefix="%s" data-suffix="%s" data-format="%s" data-value="%s">&nbsp;</h3>%s</div></div>',
                                    $classes,
                                    $prefix,
                                    $suffix,
                                    $format,
                                    $number,
                                    $description
                         );
            }
            
            $classes = 4 > $total ? 'three-up' : 'four-up';
                                      
            return sprintf( '
                                <div class="grid-x grid-margin-x">
                                    <div class="cell">%s</div>
                                </div>
                                <div class="grid-x grid-margin-x grid-margin-bottom numbers align-center %s">
                                    %s
                                </div>
                            ',
                            $heading,
                            $classes,
                            $cells
                         );  
        }
        
        
    }
}
   
new Block_Results( $data );
