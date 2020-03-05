<?php
// About - Commitment

if( ! class_exists( 'About_Commitment' ) ) {
    class About_Commitment extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'commitment' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'settings' );
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-commitment'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-commitment'
                ], true
            );  

        }          
        
        // Add content
        public function render() {
                        
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
   
new About_Commitment;
