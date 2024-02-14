<?php
// Case Study - Challenge

if( ! class_exists( 'Challenge_Section' ) ) {
    class Challenge_Section extends Element_Section {

        private $enable_hubspot = true;
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'challenge' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'case_study_archive', 'option' );
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
                'wrapper', 'class', [
                        'hubspot-enabled'
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
                                          
            $heading = _s_format_string( __( 'Challenge', '_s' ), 'h2' );
            $text = $this->get_fields( 'text' ); 
            $hubspot = $this->get_fields( 'hubspot' );

            if( ! empty( $hubspot ) ) {
                $right_column = sprintf( '<div class="hubspot-form" style="margin-top: 30px;">
                <h4>Fill out this form below to download PDF:</h4>%s</div>', $hubspot );
            } else {
                $right_column = _s_get_template_part( 'template-parts/case-study', 'hubspot', [], true );
            }
            
                            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x">
                                    <div class="cell large-6 xxlarge-6"><div>%s%s</div></div>
                                    <div class="cell large-6 xxlarge-auto">%s</div>
                                </div>
                            </div>',
                            $heading,
                            $text,
                            $right_column
                         );  
        }
        
    }
}
   
new Challenge_Section;
