<?php
// Block: Content

if( ! class_exists( 'Content_Block' ) ) {
    class Content_Block extends Element_Block {
        
        static public $section_count;
                
        public function __construct( $data ) {
            parent::__construct( $data );
                                    
            
            $this->set_fields( 'image', get_field( 'image' ) );
            $this->set_fields( 'video', get_field( 'video' ) );
            $this->set_fields( 'image_alignment', strtolower( get_field( 'image_alignment' ) ) );
            $this->set_fields( 'content_width', strtolower( get_field( 'content_width' ) ) );
            $this->set_fields( 'content_alignment', strtolower( get_field( 'content_alignment' ) ) );
            $this->set_fields( 'text', get_field( 'text' ) );
            $this->set_fields( 'button', get_field( 'button' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */

            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
            
            $content_width = $this->get_fields( 'content_width' ) ? 'content-width-' . $this->get_fields( 'content_width' ) : '';
            $content_alignment = $this->get_fields( 'content_alignment' ) ? 'content-align-' . $this->get_fields( 'content_alignment' ) : '';
            $image_alignment = $this->get_fields( 'image_alignment' ) ? 'image-align-' . $this->get_fields( 'image_alignment' ) : '';
     
            if( empty( $this->get_fields( 'image' ) ) ) {                                                              
                $this->add_render_attribute( 'wrapper', 'class', [$content_width, $content_alignment] );               
            } else {
                $this->add_render_attribute( 'wrapper', 'class', $image_alignment ); 
            }
            
        } 

        
        // Add content
        public function render() {
                        
            $cells = '';
            
            $image = $this->get_fields( 'image' );
            
            $columns = '';
            
            if( ! empty($image ) ) {
                
                $video = $this->get_fields( 'video' );
                $video_link = '';
                if( ! empty( $video ) ) {
                    $video_icon = '<span><i></i></span>';
                    $video_link = sprintf( '<a data-fancybox class="play-video" aria-label="play video" href="%s">%s</a>', $video, $video_icon );
                }
                
                $columns = ' large-auto';
                $cell_order = 'image-align-right' == $this->get_fields( 'image_alignment' ) ? ' large-order-2' : '';
                $cells .= sprintf( '<div class="cell%s%s"><div class="image-wrapper">%s%s</div></div>', $columns, $cell_order, $video_link, _s_get_acf_image( $image, 'large' ) );
            }
            
            $button = $this->get_fields( 'button' );
                                    
            if( ! empty( $button['button']['link'] ) ) {
                                
                $args = [
                    'link' => $button['button']['link'],
                    'echo' => false,
                    'classes' => ! empty( $button['button']['style'] ) ? strtolower( $button['button']['style'] ) : '',
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
   
new Content_Block( $data );
