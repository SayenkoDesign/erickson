<?php
// Service Approach

if( ! class_exists( 'Approach_Section' ) ) {
    class Approach_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'approach' );
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
                     $this->get_name() . '-approach'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-approach'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : __( 'Approach', '_s' );
            $heading = _s_format_string( $heading, 'h2' );
            
            $text = $this->get_fields( 'text' ); 
            
            $list = $this->get_fields( 'list' );
            
            if( ! empty( $list ) ) {
                $items = explode("\n", str_replace("\r", "", trim( $list ) ) );
                $list = sprintf( '<div class="cell large-3 large-order-1 large-offset-1"><div class="panel">%s</div></div>', ul( $items )  );
            }
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x">
                                    <div class="cell">%s</div>
                                </div>
                                <div class="grid-x grid-padding-x">
                                    <div class="cell large-7 large-order-2">%s</div>
                                    %s
                                </div>
                            </div>',
                            $heading,
                            $text,
                            $list
                         );  
        }
        
    }
}
   
new Approach_Section;
