<?php

/*
About - Hero
		
*/


if( ! class_exists( 'About_Hero' ) ) {
    class About_Hero extends Element_Section {
        
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
            
            $hours      = get_field( 'hours', 'option' );
            $phone      = get_field( 'phone', 'option' );
            
            $out = '';
            
            if( ! empty( $phone ) ) {
                $out .= sprintf( '<li class="phone"><a href="%s">%s</a></li>', _s_format_telephone_url( $phone ), $phone );
            }
            
            if( ! empty( $hours ) ) {
                $out .= sprintf( '<li class="hours"><span>%s</span></li>', $hours );
            }
            
            if( ! empty( $out ) ) {
                $out = sprintf( '<div class="content"><ul class="hours-phone-directions">%s</ul></div>', $out );
            }
                
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell large-8 large-offset-1"><div class="hero-content">%s%s</div></div>
                            </div></div>',
                            $heading,
                            $out
                         );
        }
    }
}
   
new About_Hero; 