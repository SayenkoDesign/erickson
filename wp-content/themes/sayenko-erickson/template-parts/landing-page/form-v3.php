<?php
// Landing Page - Details

if( ! class_exists( 'Landing_Page_Form_V3' ) ) {
    class Landing_Page_Form_V3 extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'details' );
            $fields['form'] = get_field( 'form' );
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
                     $this->get_name() . '-form-v3'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-form-v3'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                                
            $image = _s_get_acf_image( $this->get_fields( 'image' ), 'thumbnail' );
            
                            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x">
                                    <div class="cell large-shrink"><div class="panel">%s</div></div>
                                    <div class="cell large-auto"><div class="grid-x grid-padding-x details"><div class="cell large-shrink">%s</div><div class="cell large-auto">%s</div></div></div>
                                </div>
                            </div>',
                            $this->get_fields( 'form' ),
                            $image, 
                            $this->get_terms()
                         );  
        }
        
        
        private function get_terms() {
            
            $columns = '';
            
            $industry = $this->get_fields( 'industry' ); 
            if( ! empty( $industry ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'industry', '_s' ), $industry );
            }
            $services = $this->get_fields( 'services' ); 
            if( ! empty( $services ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'services', '_s' ), $services );
            }
            $location = $this->get_fields( 'location' ); 
            if( ! empty( $location ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'location', '_s' ), $location );
            }
            
            
            if( ! empty( $columns ) ) {
                return sprintf( '<div class="post-terms-group"><div class="grid-x grid-padding-x small-up-3">%s</div></div>', $columns );
            }
            
            return false;
        }
        
    }
}
   
new Landing_Page_Form_V3;
