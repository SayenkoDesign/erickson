<?php
// Block: Webinar

if( ! class_exists( 'Webinar_Block' ) ) {
    class Webinar_Block extends Element_Block {

        private $enable_hubspot = true;
        
        static public $section_count;
                
        public function __construct( $data ) {
            parent::__construct( $data );
                                    
            
            $this->set_fields( 'image', get_field( 'image' ) );
            $this->set_fields( 'text', get_field( 'text' ) );
            $this->set_fields( 'button_text', get_field( 'button_text' ) );
            
            $this->set_fields( 'hubspot', get_field( 'hubspot', get_the_ID() ) );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
            
        } 

        
        // Add content
        public function render() {
            
            $columns = '';        
            $cells = '';
            $button = '';
            
            $image = $this->get_fields( 'image' );
                        
            if( ! empty($image ) ) {
                $columns = ' large-auto';
                $cell_order = '';
                $cells .= sprintf( '<div class="cell%s%s"><div class="image-wrapper">%s</div></div>', $columns, $cell_order, _s_get_acf_image( $image, 'large' ) );
            }
            
            if( ! empty( $this->get_fields( 'hubspot' ) ) ) {
                $content = sprintf( '<h4>Fill out form below to view this webinar:</h4>%s', $this->get_fields( 'hubspot' ) );
            } else {
                $content = _s_get_template_part( 'template-parts/webinar', 'hubspot', [], true );
            }

            
            $cells .= sprintf( '<div class="cell%s"><div class="panel">%s%s</div></div>', $columns, $this->get_fields( 'text' ), $content  );
                                                
            return sprintf( '
                                <div class="grid-x grid-padding-x grid-margin-bottom">
                                %s
                                </div>
                              
                            ',
                            $cells
                         );  
            
        }
        
    }
}
   
new Webinar_Block( $data );
