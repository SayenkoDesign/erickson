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
                                    
            $heading    = _s_format_string( __( 'Results' ), 'h2' );
            $heading    = sprintf( '<header>%s</header>', $heading  ); 
            $rows       = $this->get_fields();
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $cells = '';
            foreach( $rows as $row ) {
                $prepend        = _s_format_string( $row['prepend'], 'span', [ 'class' => 'prepend' ] ); 
                $number         = _s_format_string( $row['number'], 'span', [ 'class' => 'number' ] ); 
                $append         = _s_format_string( $row['append'], 'span', [ 'class' => 'append' ] ); 
                $description    = _s_format_string( $row['description'], 'p' ); 
                
                $cells .= sprintf( '<div class="cell large-auto"><div class="panel">%s%s%s%s</div></div>',
                                    $prepend,
                                    $number,
                                    $append,
                                    $description
                         );
            }
            
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x">
                                    <div class="cell">%s</div>
                                </div>
                                <div class="grid-x numbers">
                                    %s
                                </div>
                            </div>',
                            $heading,
                            $cells
                         );  
        }
        
        
    }
}
   
new Results_Section;
