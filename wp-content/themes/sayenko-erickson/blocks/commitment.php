<?php
// Block - Commitment

if( ! class_exists( 'Commitment_Block' ) ) {
    class Commitment_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'policies', get_field( 'policies' ) );
            
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
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            $description = $this->get_fields( 'description' );
            
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'award-icon' ), _s_format_string( $heading, 'h2' ), $description );
                
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
            
            $rows = $this->get_fields( 'policies' );
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $out = '';
            
            // compare lengths
            $first = count( array_filter( $rows[0]['items'] ) );
            $last = count( array_filter( $rows[1]['items'] ) );
            
            $difference = $first - $last;
                                       
            foreach( $rows as $key => $row ) {  
                                
                $title = _s_format_string( $row['title'], 'h3', [ 'class' => 'h4' ] ); 
                
                $items = $row['items'];
                
                if( empty( $items ) ) {
                    $items = [];
                }
                
                // let's balance the tables with empty cells                 
                if( ! $key && $difference < 0 ) {
                    $items = array_pad( $items, $last, ['text' => '' ] );
                } else if( $key && $difference > 0 ) {
                    $items = array_pad( $items, $first, ['text' => '' ] );
                }
                                
                $text = '';
                
                foreach( $items as $key => $item ) {
                    $classes = empty( $item['text'] ) ? ' hide-for-small-only' : '';
                    $text .= sprintf( '<div class="text%s" data-mh="text-height-%s">%s</div>', $classes, $key, $item['text'] );
                }
                    
                
                
                                                          
                $out .= sprintf( '<div class="cell large-auto">
                                        <div class="header" data-mh="commitment-heading-height">%s</div>
                                        <div class="panel">%s</div>
                                    </div>', 
                                    $title,
                                    $text
                             );
            }
            
            return sprintf( '<div class="grid-x small-up-1 medium-up-2 grid">%s</div>', 
                                    $out );
        }
                
    }
}
   
new Commitment_Block( $data );
