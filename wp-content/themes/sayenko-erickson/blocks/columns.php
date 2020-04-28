<?php
// Block: Columns

if( ! class_exists( 'Columns_Block' ) ) {
    class Columns_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'columns', get_field( 'columns' ) );
            
            $this->set_settings( 'layout', get_field( 'layout' ) );
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
            $heading = _s_format_string( $heading, 'h2' );
            if( ! empty( $heading ) ) {
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
            
            $rows = $this->get_fields( 'columns' );
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $items = '';
               
            foreach( $rows as $key => $row ) {  
                
                $title = _s_format_string( $row['title'], 'h3' ); 
                $text = $row['text'];
                                                  
                $items .=  sprintf( '<div class="cell"><div class="panel">%s%s</div></div>',
                            $title,
                            $text
                         );  

            }
            
            $layout = $this->get_settings( 'layout' );
                        
            $classes  = '';
            
            if( 2 == $layout ) {
                $classes = ' medium-up-2';
            } else {
                $classes = ' large-up-3';
            }
            
            return sprintf( '<div class="grid-x grid-margin-x grid-margin-bottom grid%s">
                                %s
                                </div>', $classes,  $items );
        }
                
    }
}
   
new Columns_Block( $data );
