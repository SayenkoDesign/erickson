<?php
// About - Core Values

if( ! class_exists( 'About_Core_Values' ) ) {
    class About_Core_Values extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'core_values' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'settings' );
            $this->set_settings( $settings );
                        
            // Render the section
            if( empty( $this->render() ) ) {
                return;   
            }
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-core-values'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-core-values'
                ], true
            );  

        }          
        
        // Add content
        public function render() {
                        
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );
            if( ! empty( $heading ) ) {
                $heading = sprintf( '<header>%s</header>', $heading  );  
            }
                        
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
   
new About_Core_Values;
