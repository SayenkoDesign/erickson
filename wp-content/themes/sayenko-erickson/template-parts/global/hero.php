<?php

/*
Global - Hero
		
*/


if( ! class_exists( 'Global_Hero' ) ) {
    class Global_Hero extends Element_Section {
        
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'hero' );
                                               
            $this->set_fields( 'heading', $fields['heading']  );
            $this->set_fields( 'subheading', $fields['subheading'] );
            $this->set_fields( 'description', $fields['description'] );
            $this->set_fields( 'button', $fields['button'] );
            $this->set_fields( 'video', $fields['video'] );
            $this->set_fields( 'background_image', $fields['background_image'] );
            
            $settings = [
                'background_position_x' => $fields['background_position_x'] ? $fields['background_position_x'] : 'center',
                'background_position_y' => $fields['background_position_y'] ? $fields['background_position_y'] : 'center',
                'background_overlay'    => $fields['background_overlay']
            ];
                        
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
                     $this->get_name() . '-hero'
                ]
            );
            
            $background_image       = $this->get_fields( 'background_image' );
            
            $background_position_x  = strtolower( $this->get_settings( 'background_position_x' ) );
            $background_position_y  = strtolower( $this->get_settings( 'background_position_y' ) );
            $background_overlay     = $this->get_settings( 'background_overlay' );
            
            if( ! empty( $background_image ) ) {
                
                $background_image = _s_get_acf_image( $background_image, 'hero', true );
                $this->add_render_attribute( 'wrapper', 'class', 'has-background-image' );
                $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-image: url(%s);', $background_image ) );
                $this->add_render_attribute( 'wrapper', 'style', sprintf( 'background-position: %s %s;', 
                                                                          $background_position_x, $background_position_y ) );
                
                if( true == $background_overlay ) {
                     $this->add_render_attribute( 'wrapper', 'class', 'has-background-overlay' ); 
                }
                
            } else {
                $this->add_render_attribute( 'wrapper', 'class', 'has-background-color' );
            }
                                                                          
        }

        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            
            $heading = _s_format_string( $heading, 'h1' );
            
            $description = $this->get_fields( 'description' );
            
            $subheading = _s_format_string( $this->get_fields( 'subheading' ), 'h3' );
            
            $button = $this->get_fields( 'button' );
                                  
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
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
                
            return sprintf( '<div class="hero-content">
                                <div class="grid-x grid-padding-x align-middle">
                                    <div class="cell">%s%s%s%s%s</div>
                                </div>
                            </div>',
                            $heading,
                            $description,
                            $subheading,
                            $button,
                            $video_link                            
                         );
        }
    }
}
   
new Global_Hero; 