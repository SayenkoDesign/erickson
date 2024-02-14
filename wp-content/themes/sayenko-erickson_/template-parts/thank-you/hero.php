<?php

/*
Thank You - Hero
		
*/


if( ! class_exists( 'Thanks_Hero' ) ) {
    class Thanks_Hero extends Element_Section {
        
        public function __construct() {
            parent::__construct();
            
            $fields['heading'] = get_field( 'heading' );
            $this->set_fields( $fields );
                                    
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-hero'
                ]
            );
                                                                                      
        }

        
        // Add content
        public function render() {
            
            
            // Sanitize things
            $request = [];
            
            foreach( $_REQUEST as $key => $value ) {
                $request[sanitize_text_field( $key )] = sanitize_text_field( $value ); 
            }
            
            $heading = $this->get_fields( 'heading' );
            
            
            // Replace any template tags
            if( ! empty( $heading ) && ! empty( $request ) ) {
                foreach($request as $key => $value ){
                    if( ! empty( $value ) ) {
                        $heading = str_replace('{'.$key.'}', $value, $heading );
                    }
                }
            } else {
                $heading = get_the_title();
            }

            
            $heading = _s_format_string( $heading, 'h1', ['class' => '' ] );
            
    
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell"><div class="hero-content">%s</div></div>
                            </div></div>',
                            $heading
                         );
        }
    }
}
   
new Thanks_Hero; 