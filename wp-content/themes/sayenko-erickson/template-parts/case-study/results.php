<?php
// Case Study - Results

if( ! class_exists( 'Results_Section' ) ) {
    class Results_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'results' );
            $this->set_fields( $fields );
                        
            $settings = $this->get_fields( 'results' );
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
                     $this->get_name() . '-results'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-results'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading    = _s_format_string( __( 'Results', '_s' ), 'h2' );
            $heading    = sprintf( '<header>%s</header>', $heading  ); 
            $rows       = array_filter( $this->get_fields() );
            
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
                                      
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell">%s</div>
                                </div>
                                <div class="grid-x grid-margin-x grid-margin-bottom numbers align-center %s">
                                    %s
                                </div>
                            </div>',
                            $heading,
                            $classes,
                            $cells
                         );  
        }
        
        
    }
}
   
new Results_Section;
