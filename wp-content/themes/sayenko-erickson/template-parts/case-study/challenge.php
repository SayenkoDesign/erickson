<?php
// Case Study - Challenge

if( ! class_exists( 'Challenge_Section' ) ) {
    class Challenge_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'challenge' );
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
                     $this->get_name() . '-challenge'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-challenge'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( __( 'Challenge' ), 'h2' );
            $text = $this->get_fields( 'text' ); 
            
            $image = _s_get_acf_image( $this->get_fields( 'image' ), 'thumbnail' );
            
            $button = '';
            $file = $this->get_fields( 'file' );             
            if( ! empty( $file['url'] ) ) {
                $args = [
                    'link' => [ 'title' => sprintf( '%s %s', __( 'download' ), $file['subtype'] ), 'url' => $file['url'] ],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '%s', _s_acf_button( $args ) );
            }
                            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x">
                                    <div class="cell large-6 xxlarge-7"><div class="panel">%s%s<footer>%s%s</footer></div></div>
                                    <div class="cell large-6 xxlarge-auto">%s</div>
                                </div>
                            </div>',
                            $heading,
                            $text,
                            $image, 
                            $button,
                            $this->get_terms()
                         );  
        }
        
        
        private function get_terms() {
            
            $columns = '';
            
            $industry = _s_get_post_terms( [ 'taxonomy' => 'industry', 'link' => false, 'svg' => false ] ); 
            if( ! empty( $industry ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'industry' ), $industry );
            }
            $services = _s_get_post_terms( [ 'taxonomy' => 'service_cat', 'link' => false, 'svg' => false ] ); 
            if( ! empty( $services ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'services' ), $services );
            }
            $location = _s_get_post_terms( [ 'taxonomy' => 'location', 'link' => false, 'svg' => false ] );    
            if( ! empty( $location ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'location' ), $location );
            }
            
            
            if( ! empty( $columns ) ) {
                return sprintf( '<div class="post-terms-group"><div class="grid-x grid-padding-x small-up-1 medium-up-3">%s</div></div>', $columns );
            }
            
            return false;
        }
        
    }
}
   
new Challenge_Section;
