<?php
// Page Builder - Block

if( ! class_exists( 'Block_Section' ) ) {
    class Block_Section extends Element_Section {
        
        static public $section_count;
                
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_sub_field( 'block' );
            $fields['content_width'] = sprintf( 'content-width-%s', strtolower( $fields['content_width'] ) ); 
            $fields['content_alignment'] = sprintf( 'content-align-%s', strtolower( $fields['content_alignment'] ) );          
            $fields['photo_alignment'] = sprintf( 'photo-align-%s', strtolower( $fields['photo_alignment'] ) );
            
            if( ! empty( $fields[ 'photo' ] ) ) {
                $fields['content_width'] = ''; 
                $fields['content_alignment'] = ''; 
            }
            
            $this->set_fields( $fields );
            
            $settings = get_sub_field( 'settings' );
            $this->set_settings( $settings );
                        
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
                     $this->get_name() . '-block'
                ]
            );
                        
            if( empty( $this->get_fields( 'photo' ) ) ) {                                                  
                $this->add_render_attribute( 'wrapper', 'class', [$this->get_fields( 'content_width' ), $this->get_fields( 'content_alignment' )] );               
            } else {
                $this->add_render_attribute( 'wrapper', 'class', $this->get_fields( 'photo_alignment' ) ); 
            }
            
        } 

        
        // Add content
        public function render() {
            
            $fields = $this->get_fields();
            
            $cells = '';
            
            $photo = $this->get_fields( 'photo' );
            
            $columns = '';
            
            if( ! empty($photo ) ) {
                $columns = ' large-6';
                $cell_order = 'photo-align-right' == $this->get_fields( 'photo_alignment' ) ? ' large-order-2' : '';
                $cells .= sprintf( '<div class="cell%s%s">%s</div>', $columns, $cell_order, _s_get_acf_image( $photo, 'large' ) );
            }
            
            $button = $this->get_fields( 'button' );
            
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'Button' == $button['style'] ? 'button' : 'button',
                ];
                $button  = sprintf( '<p class="button-wrapper">%s</p>', _s_acf_button( $args ) );
            }
            
            
            
            $cells .= sprintf( '<div class="cell%s">%s%s</div>', $columns, $this->get_fields( 'editor' ), $button  );
                                                
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                %s
                                </div>
                            </div>',
                            $cells
                         );  
            
        }
        
    }
}
   
new Block_Section;
