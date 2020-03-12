<?php

/*
Hero Post
		
*/


if( ! class_exists( 'Hero_Post' ) ) {
    class Hero_Post extends Element_Section {
        
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'hero' );
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
            
            $background_image       = $this->get_fields( 'background_image' );
            $background_position_x  = strtolower( $this->get_fields( 'background_position_x' ) ) ?: 'center';
            $background_position_y  = strtolower( $this->get_fields( 'background_position_y' ) ) ?: 'center';
            $background_overlay     = $this->get_fields( 'background_overlay' );
            
            
            
            if( ! empty( $background_image ) ) {
                $background_image = _s_get_acf_image( $background_image, 'hero', true );
            } else  {
                $background_image = get_the_post_thumbnail_url( get_the_ID(), 'hero' );
                
                if( empty( $background_image ) ) {
                    $background_image = get_field( 'post_image_fallback', 'option' );
                    if( ! empty( $background_image ) ) {
                        $background_image = wp_get_attachment_image_src( $background_image, 'hero' );
                    }   
                }
            }
            
            $this->add_render_attribute( 'wrapper', 'class', 'has-background' );
            $this->add_render_attribute( 'wrapper', 'class', 'background-image' );
            $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-image: url(%s);', $background_image ) );
            $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-position: %s %s;', 
                                                                      $background_position_x, $background_position_y ) );
            
            if( true == $background_overlay ) {
                 $this->add_render_attribute( 'wrapper', 'class', 'background-overlay' ); 
            }
                                                                          
        }

        
        // Add content
        public function render() {
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h1' );
                        
            $description = empty( $this->get_fields( 'description' ) ) ? '' : _s_format_string( $this->get_fields( 'description' ), 'h4' );
            
            $subheading = $this->get_fields( 'subheading' );
            $subheading = _s_format_string( $subheading, 'h3' );
            
            $button = $this->get_fields( 'button' );
                      
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '<div class="button-container">%s</div>', _s_acf_button( $args ) );
            } else {
                $button = '';
            }
                        
            $video = $this->get_fields( 'video' );
            $video_link = '';
            if( ! empty( $video ) ) {
                $video_icon = '<span><i></i></span>';
                $video_link = sprintf( '<a data-fancybox class="play-video" arial-label="play video" href="%s">%s</a>', $video, $video_icon );
            }
    
            return sprintf( '<div class="hero-content"><div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell">%s%s%s%s%s</div>
                            </div></div></div>',
                            $heading,
                            $description,
                            $subheading,
                            $video_link,
                            $button
                            
                         );
        }
    }
}
   
new Hero_Post; 