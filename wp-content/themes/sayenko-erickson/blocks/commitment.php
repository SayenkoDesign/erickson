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
            
            if( is_admin() ) {
                return $this->render_backend();
            }
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            $description = $this->get_fields( 'description' );
            
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'award-icon' ), _s_format_string( $heading, 'h2' ), $description );
                
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
        
        
        private function render_backend() {
            return sprintf( '<div style="text-align: center; color: #fff; background: #333; padding: 50px 30px;">%s</div>', 'Commitment Block' );
        }
        
        
        private function get_grid() {
            
            $rows = $this->get_fields( 'policies' );
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $out = '';
               
            foreach( $rows as $key => $row ) {  
                
                $title = _s_format_string( $row['title'], 'h3', [ 'class' => 'h4' ] ); 
                
                $items = $row['items'];
                $text = '';
                
                if( ! empty( $items ) ) {
                    foreach( $items as $key => $item ) {
                        $text .= sprintf( '<div class="text" data-mh="text-height-%s">%s</div>', $key, $item['text'] );
                    }
                    
                }
                
                
                                                          
                $out .= sprintf( '<div class="cell large-auto">
                                        <div class="header">%s</div>
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
