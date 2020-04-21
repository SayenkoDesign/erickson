<?php

/*
Block - Hero
		
*/


if( ! class_exists( 'Hero_Block' ) ) {
    class Hero_Block extends Element_Block {
        
        private $video = false;
        
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'button', get_field( 'button' ) );
            $this->set_fields( 'video', get_field( 'video' ) );
            $this->set_fields( 'background_image', get_field( 'background_image' ) );
            $this->set_fields( 'slideshow', get_field( 'slideshow' ) );
            
            $settings = [
                'background_position_x' => get_field( 'background_position_x' ) ? strtolower( get_field( 'background_position_x' ) ) : 'center',
                'background_position_y' => get_field( 'background_position_y' ) ? strtolower( get_field( 'background_position_y' ) ) : 'center',
                'background_overlay'    => get_field( 'background_overlay' )
            ];
                        
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
        
            $background_image       = $this->get_fields( 'background_image' );
            
            $background_position_x  = $this->get_settings( 'background_position_x' );
            $background_position_y  = $this->get_settings( 'background_position_y' );
            $background_overlay     = $this->get_settings( 'background_overlay' );
            
            if( $this->get_fields( 'slideshow' ) ) {
            
                $this->add_render_attribute( 'wrapper', 'class', 'has-slideshow' );
            
            } else if( ! empty( $background_image ) ) {
                
                $background_image = _s_get_acf_image( $background_image, 'hero', true );
                $this->add_render_attribute( 'wrapper', 'class', 'has-background-image' );
                $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-image: url(%s);', $background_image ) );
                $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-position: %s %s;', 
                                                                          $background_position_x, $background_position_y ) );
                
                if( true == $background_overlay ) {
                     $this->add_render_attribute( 'wrapper', 'class', 'background-overlay' ); 
                }
                
            } else {
                
                $this->add_render_attribute( 'wrapper', 'class', 'has-background-color' );
                
            }
                                                            
        }
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h1' );
            
            $description = empty( $this->get_fields( 'description' ) ) ? '' : _s_format_string( $this->get_fields( 'description' ), 'h4' );
            
            $button = $this->get_fields( 'button' );
                      
            if( ! empty( $button['button']['link'] ) ) {
                                
                $args = [
                    'link' => $button['button']['link'],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '<div>%s</div>', _s_acf_button( $args ) );
            } else {
                $button = '';
            }
                        
            $video = $this->get_fields( 'video' );
            $video_link = '';
            if( ! empty( $video ) ) {
                $video_icon = '<span><i aria-label="play video"></i></span>';
                $video_link = sprintf( '<a data-fancybox class="play-video" href="%s">%s</a>', $video, $video_icon );
            }
            
            // Slideshow
            $slideshow = '';
            $slides = $this->get_fields( 'slideshow' );
            
            if( ! empty( $slides ) ) {
                $size = 'hero';
            
                if( wp_is_mobile() ) {
                    $size = 'large';
                }
                
                $images = '';
                foreach ( $slides as $slide ) {
                    $images .= sprintf( '<div class="slick-slide"><img data-lazy="%s" /></div>', _s_get_acf_image( $slide, $size, true ) );   
                }
                
                if( ! empty( $images ) ) {
                    $slideshow = sprintf( '<div class="slider"><div class="slick">%s</div></div>', $images );
                }
            }
            
                
            return sprintf( '%s<div class="hero-content">
                                <div class="grid-container"><div class="grid-x grid-padding-x align-bottom">
                                    <div class="cell">%s%s%s%s</div>
                                </div></div>
                            </div>',
                            $slideshow,
                            $heading,
                            $description,
                            $button,
                            $video_link
                         );
        }
    }
}
   
new Hero_Block( $data ); 