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
            $fields['image_alignment'] = sprintf( 'image-align-%s', strtolower( $fields['image_alignment'] ) );
            
            if( ! empty( $fields[ 'image' ] ) ) {
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
                        
            if( empty( $this->get_fields( 'image' ) ) ) {                                                  
                $this->add_render_attribute( 'wrapper', 'class', [$this->get_fields( 'content_width' ), $this->get_fields( 'content_alignment' )] );               
            } else {
                $this->add_render_attribute( 'wrapper', 'class', $this->get_fields( 'image_alignment' ) ); 
            }
            
        } 

        
        // Add content
        public function render() {
            
            $fields = $this->get_fields();
            
            $cells = '';
            
            $image = $this->get_fields( 'image' );
            
            $columns = '';
            
            if( ! empty($image ) ) {
                
                $video = $this->get_fields( 'video' );
                $video_link = '';
                if( ! empty( $video ) ) {
                    $video_icon = '<span><i class="screen-reader-text">play video</i></span>';
                    $video_link = sprintf( '<div class="play-video"><a data-fancybox href="%s">%s</a></div>', $video, $video_icon );
                }
                
                $columns = ' large-auto';
                $cell_order = 'image-align-right' == $this->get_fields( 'image_alignment' ) ? ' large-order-2' : '';
                $cells .= sprintf( '<div class="cell%s%s"><div class="image-wrapper">%s%s</div></div>', $columns, $cell_order, $video_link, _s_get_acf_image( $image, 'large' ) );
            }
            
            $button = $this->get_fields( 'button' );
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '<p class="button-wrapper">%s</p>', _s_acf_button( $args ) );
            } else {
                $button = '';   
            }
            
            
            
            $cells .= sprintf( '<div class="cell%s"><div class="panel">%s%s</div></div>', $columns, $this->get_fields( 'text' ), $button  );
                                                
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x grid-margin-bottom">
                                %s
                                </div>
                            </div>',
                            $cells
                         );  
            
        }
        
    }
}
   
new Block_Section;
