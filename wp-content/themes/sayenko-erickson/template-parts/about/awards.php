<?php
// About - Awards

if( ! class_exists( 'About_Awards' ) ) {
    class About_Awards extends Element_section {
                
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'awards' );
            $this->set_fields( $fields );
            
            $settings = $this->get_fields( 'settings' );
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
                     $this->get_name() . '-awards',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-awards',
                ],
                true
            ); 
                                        
        } 
               
        
        // Add content
        public function render() {
            
            $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : __( 'You might also be interested in', '_s' );          
            $heading = _s_format_string( $heading, 'h2' );
            $heading = sprintf( '<header>%s%s</header>', get_svg( 'best-seller-icon' ), $heading  );  
                        
            $grid = $this->get_grid();
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s</div>
                                </div>
                            </div>
                            <div class="grid-container full">
                                %s
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
   
new About_Awards;
